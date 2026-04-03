import { useRef, useState, useCallback } from 'react';
import useCart from '../../hooks/useCart.js';
import ShopButton from './ShopButton.jsx';
import { formatPrice, discountPercent } from '../../utils/formatPrice.js';
import { BADGE_COLORS } from '../../utils/constants.js';

const FALLBACK_PRODUCT_IMAGE = '/placeholder.svg';

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="star">{i < full ? '★' : i === full && half ? '✦' : '☆'}</span>
      ))}
    </span>
  );
};

const Badge = ({ label }) => {
  if (!label) return null;
  const style = BADGE_COLORS[label] || { bg: '#ff4d2e', text: '#fff' };
  return <span className="badge" style={{ background: style.bg, color: style.text }}>{label}</span>;
};

const spawnParticle = (btnRef) => {
  if (!btnRef?.current) return;
  const rect = btnRef.current.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'float-particle';
  el.style.left = `${rect.left + rect.width / 2 - 6}px`;
  el.style.top = `${rect.top + rect.height / 2 - 6}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
};

const ProductCard = ({ product, delay = 0 }) => {
  const { addItem, isWishlisted, toggleWishlist } = useCart();
  const btnRef = useRef(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnSuccess, setBtnSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image || FALLBACK_PRODUCT_IMAGE);
  const wished = isWishlisted(product.id);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    if (btnLoading || btnSuccess) return;
    spawnParticle(btnRef);
    setBtnLoading(true);
    setTimeout(() => {
      addItem(product);
      setBtnLoading(false);
      setBtnSuccess(true);
      setShowToast(true);
      setTimeout(() => setBtnSuccess(false), 1500);
      setTimeout(() => setShowToast(false), 3200);
    }, 600);
  }, [btnLoading, btnSuccess, addItem, product]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleImageError = () => {
    setImageSrc(FALLBACK_PRODUCT_IMAGE);
  };

  const discount = discountPercent(product.originalPrice, product.price);

  return (
    <>
      <article className="product-card animate-fadeUp" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }}>
        <Badge label={product.badge} />
        <button className="wishlist-btn" onClick={handleWishlist} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} style={{ color: wished ? 'hsl(var(--accent))' : '#aaa' }}>
          <span className={wished ? 'animate-heartbeat' : ''} style={{ fontSize: 17, lineHeight: 1, display: 'block' }}>{wished ? '♥' : '♡'}</span>
        </button>
        <div className="img-wrap">
          <img src={imageSrc} alt={product.name} loading="lazy" onError={handleImageError} style={{ height: 220 }} />
        </div>
        <div className="p-4">
          <p className="text-muted-foreground font-semibold uppercase tracking-wider mb-1" style={{ fontSize: 11, letterSpacing: '0.06em' }}>{product.category}</p>
          <h3 className="font-display font-semibold leading-snug mb-2" style={{ fontSize: 15 }}>{product.name}</h3>
          <div className="flex items-center gap-1.5 mb-3">
            <Stars rating={product.rating} />
            <span className="text-muted-foreground" style={{ fontSize: 12 }}>({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-display font-bold text-lg text-ink">{formatPrice(product.price)}</span>
            <span className="text-muted-foreground text-sm line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-xs font-bold" style={{ color: 'var(--success)', background: 'rgba(0,200,150,0.1)', padding: '2px 7px', borderRadius: 99 }}>-{discount}%</span>
          </div>
          <ShopButton ref={btnRef} variant="primary" size="md" loading={btnLoading} success={btnSuccess} className="w-full" onClick={handleAddToCart} style={{ background: btnSuccess ? 'var(--success)' : undefined }}>
            Add to Cart
          </ShopButton>
        </div>
      </article>
      {showToast && (
        <div className="shop-toast" role="alert">
          <img src={imageSrc} alt="" onError={handleImageError} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 2 }}>Added to cart</div>
            <div className="font-semibold" style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
          </div>
          <span style={{ fontSize: 20 }}>🛒</span>
        </div>
      )}
    </>
  );
};

export default ProductCard;

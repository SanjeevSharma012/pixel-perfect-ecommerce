import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState, useCallback } from 'react';
import useCart from '../../hooks/useCart';
import ShopButton from './ShopButton';
import { formatPrice, discountPercent } from '../../utils/formatPrice';
import { BADGE_COLORS } from '../../utils/constants';
const FALLBACK_PRODUCT_IMAGE = '/placeholder.svg';
const Stars = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (_jsx("span", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }, (_, i) => (_jsx("span", { className: "star", children: i < full ? '★' : i === full && half ? '✦' : '☆' }, i))) }));
};
const Badge = ({ label }) => {
    if (!label)
        return null;
    const style = BADGE_COLORS[label] || { bg: '#ff4d2e', text: '#fff' };
    return _jsx("span", { className: "badge", style: { background: style.bg, color: style.text }, children: label });
};
const spawnParticle = (btnRef) => {
    if (!btnRef?.current)
        return;
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
        if (btnLoading || btnSuccess)
            return;
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
    return (_jsxs(_Fragment, { children: [_jsxs("article", { className: "product-card animate-fadeUp", style: { animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }, children: [_jsx(Badge, { label: product.badge }), _jsx("button", { className: "wishlist-btn", onClick: handleWishlist, "aria-label": wished ? 'Remove from wishlist' : 'Add to wishlist', style: { color: wished ? 'hsl(var(--accent))' : '#aaa' }, children: _jsx("span", { className: wished ? 'animate-heartbeat' : '', style: { fontSize: 17, lineHeight: 1, display: 'block' }, children: wished ? '♥' : '♡' }) }), _jsx("div", { className: "img-wrap", children: _jsx("img", { src: imageSrc, alt: product.name, loading: "lazy", onError: handleImageError, style: { height: 220 } }) }), _jsxs("div", { className: "p-4", children: [_jsx("p", { className: "text-muted-foreground font-semibold uppercase tracking-wider mb-1", style: { fontSize: 11, letterSpacing: '0.06em' }, children: product.category }), _jsx("h3", { className: "font-display font-semibold leading-snug mb-2", style: { fontSize: 15 }, children: product.name }), _jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [_jsx(Stars, { rating: product.rating }), _jsxs("span", { className: "text-muted-foreground", style: { fontSize: 12 }, children: ["(", product.reviews.toLocaleString(), ")"] })] }), _jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("span", { className: "font-display font-bold text-lg text-ink", children: formatPrice(product.price) }), _jsx("span", { className: "text-muted-foreground text-sm line-through", children: formatPrice(product.originalPrice) }), _jsxs("span", { className: "text-xs font-bold", style: { color: 'var(--success)', background: 'rgba(0,200,150,0.1)', padding: '2px 7px', borderRadius: 99 }, children: ["-", discount, "%"] })] }), _jsx(ShopButton, { ref: btnRef, variant: "primary", size: "md", loading: btnLoading, success: btnSuccess, className: "w-full", onClick: handleAddToCart, style: { background: btnSuccess ? 'var(--success)' : undefined }, children: "Add to Cart" })] })] }), showToast && (_jsxs("div", { className: "shop-toast", role: "alert", children: [_jsx("img", { src: imageSrc, alt: "", onError: handleImageError, style: { width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 } }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("div", { style: { fontSize: 12, opacity: 0.65, marginBottom: 2 }, children: "Added to cart" }), _jsx("div", { className: "font-semibold", style: { fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: product.name })] }), _jsx("span", { style: { fontSize: 20 }, children: "\uD83D\uDED2" })] }))] }));
};
export default ProductCard;

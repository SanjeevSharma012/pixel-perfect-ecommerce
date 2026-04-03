import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import CartItem from '../components/shop/CartItem.jsx';
import PriceSummary from '../components/shop/PriceSummary.jsx';
import ShopButton from '../components/shop/ShopButton.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { SHIPPING_THRESHOLD } from '../utils/constants.js';

const Cart = () => {
  const { items, cartCount, cartSubtotal, clearCart, hasFreeShipping, freeShippingRemaining } = useCart();
  const navigate = useNavigate();
  const progressPct = Math.min(100, (cartSubtotal / SHIPPING_THRESHOLD) * 100);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }} className="animate-[fadeUp_0.4s_ease_forwards]">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl mb-1">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm">{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
        </div>
        <Link to="/" className="text-muted-foreground text-sm font-medium hover:text-foreground" style={{ transition: 'color 0.2s' }}>← Continue Shopping</Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🛒</div>
          <h2 className="font-display font-bold text-2xl mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
          <ShopButton variant="accent" size="lg" onClick={() => navigate('/')}>Start Shopping 🛍️</ShopButton>
        </div>
      ) : (
        <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 360px', alignItems: 'start' }}>
          <div style={{ background: 'white', borderRadius: 24, border: '1.5px solid hsl(var(--border))', overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', borderBottom: '1px solid hsl(var(--border))', background: hasFreeShipping ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}>
              <div className="flex items-center gap-2 mb-1.5" style={{ fontSize: 13 }}>
                <span>{hasFreeShipping ? '🎉' : '🚚'}</span>
                {hasFreeShipping ? <span style={{ color: '#166534' }}><strong>Free shipping</strong> unlocked!</span> : <span>Add <strong>{formatPrice(freeShippingRemaining)}</strong> more for free shipping</span>}
              </div>
              <div style={{ height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPct}%`, borderRadius: 99, background: hasFreeShipping ? 'var(--success)' : 'hsl(var(--accent))', transition: 'width 0.4s cubic-bezier(.22,1,.36,1)' }} />
              </div>
            </div>
            {items.map((item) => <CartItem key={item.id} item={item} />)}
            <div className="p-4">
              <ShopButton variant="outline" size="sm" onClick={clearCart}>🗑 Clear cart</ShopButton>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 24, padding: 24, border: '1.5px solid hsl(var(--border))', position: 'sticky', top: 84 }}>
            <h2 className="font-display font-bold text-lg mb-4">Order Summary</h2>
            <PriceSummary className="mb-5" />
            <ShopButton variant="accent" size="lg" className="w-full" style={{ borderRadius: 14 }} onClick={() => navigate('/checkout')}>Proceed to Checkout →</ShopButton>
            <div className="flex items-center justify-center gap-2 mt-4" style={{ fontSize: 12, color: 'var(--shop-muted)' }}>
              <span>🔒</span><span>Secure checkout</span><span>·</span>{['💳', '🏦', '📱'].map((e) => <span key={e}>{e}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

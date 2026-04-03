import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart.js';
import CartItem from './CartItem.jsx';
import PriceSummary from './PriceSummary.jsx';
import ShopButton from './ShopButton.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { SHIPPING_THRESHOLD } from '../../utils/constants.js';

const CartDrawer = () => {
  const { items, isOpen, cartCount, cartSubtotal, closeCart, clearCart, grandTotal, hasFreeShipping, freeShippingRemaining } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => { closeCart(); navigate('/checkout'); };
  const progressPct = Math.min(100, (cartSubtotal / SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1.5px solid hsl(var(--border))', flexShrink: 0 }}>
          <div>
            <h2 className="font-display font-bold text-xl">Your Cart</h2>
            <p className="text-muted-foreground" style={{ fontSize: 13 }}>{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={closeCart} aria-label="Close cart" className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, border: '1.5px solid hsl(var(--border))', background: 'white', cursor: 'pointer', fontSize: 15, transition: 'all 0.2s' }}>✕</button>
        </div>

        {items.length > 0 && (
          <div style={{ padding: '10px 20px 12px', borderBottom: '1px solid hsl(var(--border))', background: hasFreeShipping ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : 'linear-gradient(135deg,#fff7ed,#ffedd5)', flexShrink: 0 }}>
            <div className="flex items-center gap-2 mb-2" style={{ fontSize: 13 }}>
              <span>{hasFreeShipping ? '🎉' : '🚚'}</span>
              {hasFreeShipping ? <span style={{ color: '#166534' }}><strong>Free shipping</strong> unlocked!</span> : <span>Spend <strong>{formatPrice(freeShippingRemaining)}</strong> more for free shipping</span>}
            </div>
            <div style={{ height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, borderRadius: 99, background: hasFreeShipping ? 'var(--success)' : 'hsl(var(--accent))', transition: 'width 0.4s cubic-bezier(.22,1,.36,1)' }} />
            </div>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <h3 className="font-display font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm mb-6">Add some items to get started!</p>
              <ShopButton variant="primary" size="md" onClick={closeCart}>Continue Shopping</ShopButton>
            </div>
          ) : items.map((item) => <CartItem key={item.id} item={item} />)}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '1.5px solid hsl(var(--border))', padding: 20, background: 'white', flexShrink: 0 }}>
            <PriceSummary className="mb-4" />
            <ShopButton variant="accent" size="lg" className="w-full" style={{ borderRadius: 14 }} onClick={handleCheckout}>Checkout → {formatPrice(grandTotal)}</ShopButton>
            <ShopButton variant="outline" size="md" className="w-full mt-2" onClick={clearCart}>Clear Cart</ShopButton>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;

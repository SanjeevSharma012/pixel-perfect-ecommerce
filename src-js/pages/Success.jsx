import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShopButton from '../components/shop/ShopButton.jsx';

const Success = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const orderId = state?.paymentId || 'ORD-' + Date.now().toString(36).toUpperCase();
  const isCod = state?.cod;

  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh]" style={{ padding: 20 }}>
      <div style={{ textAlign: 'center', maxWidth: 500, background: 'white', borderRadius: 32, padding: '60px 40px', border: '1.5px solid hsl(var(--border))', boxShadow: '0 20px 80px rgba(0,0,0,0.08)', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
        <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: show ? 'successPop 0.6s cubic-bezier(.175,.885,.32,1.275) forwards' : 'none' }}>
          <span style={{ fontSize: 40, color: 'white', lineHeight: 1 }}>✓</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl mb-3">{isCod ? 'Order Confirmed!' : 'Payment Successful!'}</h1>
        <p className="text-muted-foreground mb-2" style={{ lineHeight: 1.65 }}>{isCod ? 'Your order has been placed. Pay cash when it arrives.' : 'Your payment was processed successfully!'}</p>
        <p className="font-mono font-bold text-sm mb-6" style={{ color: 'var(--shop-muted)', background: '#f8f8f8', padding: '8px 16px', borderRadius: 99, display: 'inline-block' }}>Order ID: {orderId}</p>
        <div className="grid grid-cols-3 gap-2 mb-8" style={{ background: '#f8f8f8', borderRadius: 16, padding: '16px 12px' }}>
          {[{ icon: '📦', label: 'Packed today' }, { icon: '🚚', label: 'Ships in 2 days' }, { icon: '🏠', label: 'Delivered in 5–7' }].map(({ icon, label }) => (
            <div key={label} style={{ textAlign: 'center' }}><div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div><div style={{ fontSize: 11, color: 'var(--shop-muted)', fontWeight: 500 }}>{label}</div></div>
          ))}
        </div>
        <ShopButton variant="accent" size="lg" className="w-full" style={{ borderRadius: 14 }} onClick={() => navigate('/')}>Continue Shopping 🛍️</ShopButton>
      </div>
    </div>
  );
};

export default Success;

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShopButton from '../components/shop/ShopButton.jsx';

const Failed = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const reason = state?.reason || 'Payment was cancelled or could not be processed.';

  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh]" style={{ padding: 20 }}>
      <div style={{ textAlign: 'center', maxWidth: 480, background: 'white', borderRadius: 32, padding: '60px 40px', border: '1.5px solid hsl(var(--border))', boxShadow: '0 20px 80px rgba(0,0,0,0.08)', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
        <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'hsl(var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: show ? 'successPop 0.6s cubic-bezier(.175,.885,.32,1.275) forwards' : 'none' }}>
          <span style={{ fontSize: 40, color: 'white', lineHeight: 1 }}>✕</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl mb-3">Payment Failed</h1>
        <p className="text-muted-foreground mb-6" style={{ lineHeight: 1.65 }}>{reason}</p>
        <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 14, padding: '14px 16px', marginBottom: 24, fontSize: 13, color: '#b91c1c', textAlign: 'left' }}>
          <strong>Common reasons:</strong>
          <ul style={{ marginTop: 6, paddingLeft: 16, lineHeight: 1.8 }}>
            <li>Insufficient funds</li><li>Payment cancelled</li><li>Network error</li><li>Card declined by bank</li>
          </ul>
        </div>
        <ShopButton variant="accent" size="lg" className="w-full" style={{ borderRadius: 14 }} onClick={() => navigate('/checkout')}>Try Again</ShopButton>
        <ShopButton variant="outline" size="md" className="w-full mt-2" onClick={() => navigate('/cart')}>Back to Cart</ShopButton>
      </div>
    </div>
  );
};

export default Failed;

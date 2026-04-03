import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShopButton from '../components/shop/ShopButton';
const Success = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [show, setShow] = useState(false);
    useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);
    return (_jsx("div", { className: "flex items-center justify-center min-h-[80vh]", style: { padding: 20 }, children: _jsxs("div", { style: { textAlign: 'center', maxWidth: 500, background: 'white', borderRadius: 32, padding: '60px 40px', border: '1.5px solid hsl(var(--border))', boxShadow: '0 20px 80px rgba(0,0,0,0.08)', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }, children: [_jsx("div", { style: { width: 88, height: 88, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: show ? 'successPop 0.6s cubic-bezier(.175,.885,.32,1.275) forwards' : 'none' }, children: _jsx("span", { style: { fontSize: 40, color: 'white', lineHeight: 1 }, children: "\u2713" }) }), _jsx("h1", { className: "font-display font-extrabold text-3xl mb-3", children: "Thank you for shopping" }), _jsx("p", { className: "text-muted-foreground mb-8", style: { lineHeight: 1.65 }, children: "Your order has been placed successfully!" }), _jsx("div", { className: "grid grid-cols-3 gap-2 mb-8", style: { background: '#f8f8f8', borderRadius: 16, padding: '16px 12px' }, children: [{ icon: '📦', label: 'Packed today' }, { icon: '🚚', label: 'Ships in 2 days' }, { icon: '🏠', label: 'Delivered in 5–7' }].map(({ icon, label }) => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: 28, marginBottom: 6 }, children: icon }), _jsx("div", { style: { fontSize: 11, color: 'var(--shop-muted)', fontWeight: 500 }, children: label })] }, label))) }), _jsx(ShopButton, { variant: "accent", size: "lg", className: "w-full", style: { borderRadius: 14 }, onClick: () => navigate('/'), children: "Continue Shopping 🛍️" })] }) }));
};
export default Success;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShopButton from '../components/shop/ShopButton';
const Failed = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [show, setShow] = useState(false);
    const reason = state?.reason || 'Payment was cancelled or could not be processed.';
    useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);
    return (_jsx("div", { className: "flex items-center justify-center min-h-[80vh]", style: { padding: 20 }, children: _jsxs("div", { style: { textAlign: 'center', maxWidth: 480, background: 'white', borderRadius: 32, padding: '60px 40px', border: '1.5px solid hsl(var(--border))', boxShadow: '0 20px 80px rgba(0,0,0,0.08)', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }, children: [_jsx("div", { style: { width: 88, height: 88, borderRadius: '50%', background: 'hsl(var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: show ? 'successPop 0.6s cubic-bezier(.175,.885,.32,1.275) forwards' : 'none' }, children: _jsx("span", { style: { fontSize: 40, color: 'white', lineHeight: 1 }, children: "\u2715" }) }), _jsx("h1", { className: "font-display font-extrabold text-3xl mb-3", children: "Payment Failed" }), _jsx("p", { className: "text-muted-foreground mb-6", style: { lineHeight: 1.65 }, children: reason }), _jsxs("div", { style: { background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 14, padding: '14px 16px', marginBottom: 24, fontSize: 13, color: '#b91c1c', textAlign: 'left' }, children: [_jsx("strong", { children: "Common reasons:" }), _jsxs("ul", { style: { marginTop: 6, paddingLeft: 16, lineHeight: 1.8 }, children: [_jsx("li", { children: "Insufficient funds" }), _jsx("li", { children: "Payment cancelled" }), _jsx("li", { children: "Network error" }), _jsx("li", { children: "Card declined by bank" })] })] }), _jsx(ShopButton, { variant: "accent", size: "lg", className: "w-full", style: { borderRadius: 14 }, onClick: () => navigate('/checkout'), children: "Try Again" }), _jsx(ShopButton, { variant: "outline", size: "md", className: "w-full mt-2", onClick: () => navigate('/cart'), children: "Back to Cart" })] }) }));
};
export default Failed;

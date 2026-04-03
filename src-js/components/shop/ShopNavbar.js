import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
const ShopNavbar = ({ search, onSearch }) => {
    const { cartCount, wishlist, toggleCart } = useCart();
    const [bounce, setBounce] = useState(false);
    const [prevCount, setPrevCount] = useState(cartCount);
    const navigate = useNavigate();
    useEffect(() => {
        if (cartCount > prevCount) {
            setBounce(true);
            setTimeout(() => setBounce(false), 600);
        }
        setPrevCount(cartCount);
    }, [cartCount]);
    return (_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "flex items-center justify-between gap-4 px-5", style: { maxWidth: 1280, margin: '0 auto', height: 64 }, children: [_jsx(Link, { to: "/", className: "shrink-0 flex items-center gap-2", children: _jsx("span", { className: "text-2xl font-bold text-primary", style: { fontFamily: 'Syne, sans-serif' }, children: "ShopSmart" }) }), _jsxs("div", { className: "relative flex-1", style: { maxWidth: 420 }, children: [_jsx("span", { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground", style: { fontSize: 16, pointerEvents: 'none' }, children: "\uD83D\uDD0D" }), _jsx("input", { type: "text", placeholder: "Search products...", value: search, onChange: (e) => onSearch(e.target.value), className: "form-input pl-10", style: { paddingLeft: 42 } })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [_jsxs("button", { title: "Wishlist", onClick: () => navigate('/'), className: "relative flex items-center justify-center", style: { width: 42, height: 42, borderRadius: 12, background: 'white', border: '1.5px solid hsl(var(--border))', cursor: 'pointer', fontSize: 18, transition: 'border-color 0.2s' }, children: ["\u2661", wishlist.length > 0 && (_jsx("span", { className: "absolute -top-1.5 -right-1.5 flex items-center justify-center font-bold", style: { width: 18, height: 18, borderRadius: '50%', background: 'hsl(var(--accent))', color: 'white', fontSize: 10 }, children: wishlist.length }))] }), _jsxs("button", { onClick: toggleCart, className: `flex items-center gap-2 font-semibold text-sm ${bounce ? 'animate-cartBounce' : ''}`, style: { background: 'var(--ink)', color: 'white', border: 'none', borderRadius: 12, padding: '0 18px', height: 42, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', position: 'relative', transition: 'background 0.2s' }, children: [_jsx("span", { style: { fontSize: 18 }, children: "\uD83D\uDED2" }), _jsx("span", { className: "hidden sm:inline", children: "Cart" }), cartCount > 0 && (_jsx("span", { className: "font-bold text-xs", style: { background: 'hsl(var(--accent))', borderRadius: 99, padding: '2px 8px', minWidth: 22, textAlign: 'center' }, children: cartCount }))] })] })] }) }));
};
export default ShopNavbar;

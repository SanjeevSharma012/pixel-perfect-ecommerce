import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
const CartItem = ({ item }) => {
    const { removeItem, updateQty } = useCart();
    const [removing, setRemoving] = useState(false);
    const handleRemove = () => {
        setRemoving(true);
        setTimeout(() => removeItem(item.id), 280);
    };
    return (_jsxs("div", { className: "flex gap-3 p-4 border-b border-border", style: { transition: 'opacity 0.28s ease, transform 0.28s ease', opacity: removing ? 0 : 1, transform: removing ? 'translateX(32px)' : 'translateX(0)', animation: 'fadeUp 0.3s ease forwards' }, children: [_jsx("img", { src: item.image, alt: item.name, style: { width: 72, height: 72, objectFit: 'cover', borderRadius: 12, flexShrink: 0 } }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-muted-foreground font-semibold uppercase", style: { fontSize: 10, letterSpacing: '0.06em', marginBottom: 3 }, children: item.category }), _jsx("h4", { className: "font-display font-semibold leading-snug mb-2", style: { fontSize: 13 }, children: item.name }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { className: "qty-btn", onClick: () => updateQty(item.id, item.qty - 1), "aria-label": "Decrease quantity", children: "\u2212" }), _jsx("span", { className: "font-bold text-sm", style: { minWidth: 24, textAlign: 'center' }, children: item.qty }), _jsx("button", { className: "qty-btn", onClick: () => updateQty(item.id, item.qty + 1), "aria-label": "Increase quantity", children: "+" })] }), _jsx("span", { className: "font-display font-bold text-sm", children: formatPrice(item.price * item.qty) })] })] }), _jsx("button", { onClick: handleRemove, "aria-label": "Remove item", className: "self-start", style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--shop-muted)', padding: '4px 6px', borderRadius: 6, transition: 'color 0.2s, background 0.2s', lineHeight: 1 }, children: "\u2715" })] }));
};
export default CartItem;

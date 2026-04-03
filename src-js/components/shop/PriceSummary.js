import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
const PriceSummary = ({ compact = false, className = '' }) => {
    const { cartSubtotal, shipping, tax, grandTotal, hasFreeShipping } = useCart();
    const rows = [
        { label: 'Subtotal', value: formatPrice(cartSubtotal) },
        { label: 'Shipping', value: hasFreeShipping ? 'FREE' : formatPrice(shipping), highlight: hasFreeShipping },
        { label: 'Tax (8%)', value: formatPrice(tax) },
    ];
    return (_jsxs("div", { className: className, children: [rows.map(({ label, value, highlight }) => (_jsxs("div", { className: "flex justify-between", style: { marginBottom: 8, fontSize: compact ? 13 : 14, color: 'var(--shop-muted)' }, children: [_jsx("span", { children: label }), _jsx("span", { style: { fontWeight: 500, color: highlight ? 'var(--success)' : 'var(--ink)' }, children: value })] }, label))), _jsxs("div", { className: "flex justify-between", style: { borderTop: '1px solid hsl(var(--border))', paddingTop: 10, marginTop: 4 }, children: [_jsx("span", { className: "font-display font-bold", style: { fontSize: compact ? 15 : 16 }, children: "Total" }), _jsx("span", { className: "font-display font-extrabold", style: { fontSize: compact ? 17 : 19, color: 'hsl(var(--accent))' }, children: formatPrice(grandTotal) })] })] }));
};
export default PriceSummary;

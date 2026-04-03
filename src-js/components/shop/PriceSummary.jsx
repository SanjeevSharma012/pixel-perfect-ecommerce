import useCart from '../../hooks/useCart.js';
import { formatPrice } from '../../utils/formatPrice.js';

const PriceSummary = ({ compact = false, className = '' }) => {
  const { cartSubtotal, shipping, tax, grandTotal, hasFreeShipping } = useCart();

  const rows = [
    { label: 'Subtotal', value: formatPrice(cartSubtotal) },
    { label: 'Shipping', value: hasFreeShipping ? 'FREE' : formatPrice(shipping), highlight: hasFreeShipping },
    { label: 'Tax (8%)', value: formatPrice(tax) },
  ];

  return (
    <div className={className}>
      {rows.map(({ label, value, highlight }) => (
        <div key={label} className="flex justify-between" style={{ marginBottom: 8, fontSize: compact ? 13 : 14, color: 'var(--shop-muted)' }}>
          <span>{label}</span>
          <span style={{ fontWeight: 500, color: highlight ? 'var(--success)' : 'var(--ink)' }}>{value}</span>
        </div>
      ))}
      <div className="flex justify-between" style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: 10, marginTop: 4 }}>
        <span className="font-display font-bold" style={{ fontSize: compact ? 15 : 16 }}>Total</span>
        <span className="font-display font-extrabold" style={{ fontSize: compact ? 17 : 19, color: 'hsl(var(--accent))' }}>{formatPrice(grandTotal)}</span>
      </div>
    </div>
  );
};

export default PriceSummary;

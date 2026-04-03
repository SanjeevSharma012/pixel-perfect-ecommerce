import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import PriceSummary from '../components/shop/PriceSummary.jsx';
import ShopButton from '../components/shop/ShopButton.jsx';
import { initiateRazorpayPayment } from '../services/razorpay.js';
import { createOrder } from '../services/api.js';
import { formatPrice } from '../utils/formatPrice.js';
import { CHECKOUT_STEPS, INDIAN_STATES } from '../utils/constants.js';

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-10">
    {CHECKOUT_STEPS.map((label, i) => {
      const idx = i + 1;
      const done = idx < current;
      const active = idx === current;
      return (
        <div key={label}>
          <div className="flex items-center gap-2">
            <div className={`step-dot ${done ? 'step-dot-done' : active ? 'step-dot-active' : 'step-dot-pending'}`}>{done ? '✓' : idx}</div>
            <span style={{ fontSize: 13, fontWeight: 500, color: active ? 'var(--ink)' : 'var(--shop-muted)' }}>{label}</span>
          </div>
          {i < CHECKOUT_STEPS.length - 1 && <div style={{ flex: '0 0 40px', height: 2, background: done ? 'var(--success)' : 'hsl(var(--border))', borderRadius: 99, transition: 'background 0.3s' }} />}
        </div>
      );
    })}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--shop-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { items, grandTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'India', paymentMethod: 'razorpay' });

  if (items.length === 0) { navigate('/'); return null; }

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (step === 1) {
      if (!form.firstName.trim()) errs.firstName = 'Required';
      if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
      if (!form.phone.trim()) errs.phone = 'Required';
      if (!form.address.trim()) errs.address = 'Required';
      if (!form.city.trim()) errs.city = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < 3) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else handlePlaceOrder();
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      if (form.paymentMethod === 'razorpay') {
        initiateRazorpayPayment({
          amount: grandTotal, customer: form, items,
          onSuccess: async (response) => {
            try { await createOrder({ items, total: grandTotal, customer: form, paymentId: response.razorpay_payment_id }); } catch {}
            clearCart(); navigate('/success', { state: { paymentId: response.razorpay_payment_id } });
          },
          onFailure: (err) => { setSubmitting(false); navigate('/failed', { state: { reason: err.message } }); },
        });
      } else {
        await new Promise(r => setTimeout(r, 1500));
        try { await createOrder({ items, total: grandTotal, customer: form, paymentMethod: 'cod' }); } catch {}
        clearCart(); navigate('/success', { state: { cod: true } });
      }
    } catch (err) { setSubmitting(false); navigate('/failed', { state: { reason: err.message } }); }
  };

  const inputError = (field) => errors[field] ? <p style={{ fontSize: 11, color: 'hsl(var(--accent))', marginTop: 4 }}>{errors[field]}</p> : null;

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '40px 20px' }} className="animate-[fadeUp_0.4s_ease_forwards]">
      <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/cart')} className="flex items-center gap-2 mb-8 text-muted-foreground text-sm font-medium" style={{ background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}>
        ← {step > 1 ? 'Back' : 'Back to cart'}
      </button>
      <h1 className="font-display font-extrabold text-3xl mb-8">Checkout</h1>
      <StepIndicator current={step} />

      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 340px', alignItems: 'start' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '32px', border: '1.5px solid hsl(var(--border))' }} key={step}>
          {step === 1 && (
            <>
              <h2 className="font-display font-bold text-xl mb-6">Delivery Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field label="First Name"><input className="form-input" value={form.firstName} onChange={set('firstName')} placeholder="John" />{inputError('firstName')}</Field>
                <Field label="Last Name"><input className="form-input" value={form.lastName} onChange={set('lastName')} placeholder="Doe" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field label="Email"><input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />{inputError('email')}</Field>
                <Field label="Phone"><input className="form-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" />{inputError('phone')}</Field>
              </div>
              <Field label="Street Address"><input className="form-input mb-4" value={form.address} onChange={set('address')} placeholder="123 Main Street, Apt 4B" />{inputError('address')}</Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="City"><input className="form-input" value={form.city} onChange={set('city')} placeholder="Mumbai" />{inputError('city')}</Field>
                <Field label="State">
                  <select className="form-input" value={form.state} onChange={set('state')}>
                    <option value="">Select</option>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="PIN Code"><input className="form-input" value={form.zip} onChange={set('zip')} placeholder="400001" maxLength={6} /></Field>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display font-bold text-xl mb-2">Payment Method</h2>
              <p className="text-muted-foreground text-sm mb-6 flex items-center gap-1.5"><span>🔒</span> Your payment information is encrypted & secure</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[{ id: 'razorpay', label: 'Razorpay', icon: '💳', desc: 'UPI, Cards, Wallets, NetBanking' }, { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' }].map(({ id, label, icon, desc }) => (
                  <button key={id} onClick={() => setForm(f => ({ ...f, paymentMethod: id }))}
                    style={{ padding: 16, borderRadius: 16, border: `2px solid ${form.paymentMethod === id ? 'var(--ink)' : 'hsl(var(--border))'}`, background: form.paymentMethod === id ? '#f8f8f8' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                    <div className="font-semibold text-sm mb-1">{label}</div>
                    <div className="text-muted-foreground" style={{ fontSize: 11 }}>{desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display font-bold text-xl mb-6">Review Order</h2>
              <div style={{ background: '#f8f8f8', borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <h3 className="font-semibold text-sm mb-3">Delivery Address</h3>
                <p className="text-sm" style={{ lineHeight: 1.7 }}>{form.firstName} {form.lastName}<br />{form.address}<br />{form.city}, {form.state} {form.zip}<br />{form.email} · {form.phone}</p>
              </div>
              <div style={{ background: '#f8f8f8', borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <h3 className="font-semibold text-sm mb-3">Payment</h3>
                <p className="text-sm">{form.paymentMethod === 'razorpay' ? '💳 Razorpay (UPI/Cards/Wallets)' : '💵 Cash on Delivery'}</p>
              </div>
              <div style={{ background: '#f8f8f8', borderRadius: 16, padding: 20 }}>
                <h3 className="font-semibold text-sm mb-3">Items ({items.length})</h3>
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 mb-2">
                    <img src={item.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                    <div className="flex-1 text-sm">{item.name} × {item.qty}</div>
                    <div className="font-semibold text-sm">{formatPrice(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid hsl(var(--border))' }}>
            {step > 1 ? <ShopButton variant="outline" size="md" onClick={() => setStep(s => s - 1)}>← Back</ShopButton> : <div />}
            <ShopButton variant="accent" size="lg" loading={submitting} onClick={handleNext} style={{ borderRadius: 14, minWidth: 180 }}>
              {step === 3 ? (form.paymentMethod === 'razorpay' ? `Pay ${formatPrice(grandTotal)}` : 'Place Order') : 'Continue →'}
            </ShopButton>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: 24, border: '1.5px solid hsl(var(--border))', position: 'sticky', top: 84 }}>
          <h2 className="font-display font-bold text-lg mb-4">Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 mb-3">
              <img src={item.image} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-muted-foreground" style={{ fontSize: 12 }}>Qty: {item.qty}</p>
              </div>
              <span className="font-semibold text-sm">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <PriceSummary compact className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

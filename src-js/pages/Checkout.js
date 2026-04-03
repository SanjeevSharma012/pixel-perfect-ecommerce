import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import PriceSummary from '../components/shop/PriceSummary';
import ShopButton from '../components/shop/ShopButton';
import { initiateRazorpayPayment } from '../services/razorpay';
import { createOrder } from '../services/api';
import { formatPrice } from '../utils/formatPrice';
import { CHECKOUT_STEPS, INDIAN_STATES } from '../utils/constants';
const StepIndicator = ({ current }) => (_jsx("div", { className: "flex items-center justify-center gap-2 mb-10", children: CHECKOUT_STEPS.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `step-dot ${done ? 'step-dot-done' : active ? 'step-dot-active' : 'step-dot-pending'}`, children: done ? '✓' : idx }), _jsx("span", { style: { fontSize: 13, fontWeight: 500, color: active ? 'var(--ink)' : 'var(--shop-muted)' }, children: label })] }), i < CHECKOUT_STEPS.length - 1 && _jsx("div", { style: { flex: '0 0 40px', height: 2, background: done ? 'var(--success)' : 'hsl(var(--border))', borderRadius: 99, transition: 'background 0.3s' } })] }, label));
    }) }));
const Field = ({ label, children }) => (_jsxs("div", { children: [_jsx("label", { style: { display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--shop-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }, children: label }), children] }));
const Checkout = () => {
    const navigate = useNavigate();
    const { items, grandTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'India', paymentMethod: 'razorpay' });
    if (items.length === 0) {
        navigate('/');
        return null;
    }
    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
    const validate = () => {
        const errs = {};
        if (step === 1) {
            if (!form.firstName.trim())
                errs.firstName = 'Required';
            if (!form.email.trim() || !form.email.includes('@'))
                errs.email = 'Valid email required';
            if (!form.phone.trim())
                errs.phone = 'Required';
            if (!form.address.trim())
                errs.address = 'Required';
            if (!form.city.trim())
                errs.city = 'Required';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    const handleNext = () => {
        if (!validate())
            return;
        if (step < 3) {
            setStep(s => s + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else
            handlePlaceOrder();
    };
    const handlePlaceOrder = async () => {
        setSubmitting(true);
        try {
            if (form.paymentMethod === 'razorpay') {
                initiateRazorpayPayment({
                    amount: grandTotal, customer: form, items,
                    onSuccess: async (response) => {
                        try {
                            await createOrder({ items, total: grandTotal, customer: form, paymentId: response.razorpay_payment_id });
                        }
                        catch { }
                        clearCart();
                        navigate('/success', { state: { paymentId: response.razorpay_payment_id } });
                    },
                    onFailure: (err) => { setSubmitting(false); navigate('/failed', { state: { reason: err.message } }); },
                });
            }
            else {
                await new Promise(r => setTimeout(r, 1500));
                try {
                    await createOrder({ items, total: grandTotal, customer: form, paymentMethod: 'cod' });
                }
                catch { }
                clearCart();
                navigate('/success', { state: { cod: true } });
            }
        }
        catch (err) {
            setSubmitting(false);
            navigate('/failed', { state: { reason: err.message } });
        }
    };
    const inputError = (field) => errors[field] ? _jsx("p", { style: { fontSize: 11, color: 'hsl(var(--accent))', marginTop: 4 }, children: errors[field] }) : null;
    return (_jsxs("div", { style: { maxWidth: 980, margin: '0 auto', padding: '40px 20px' }, className: "animate-[fadeUp_0.4s_ease_forwards]", children: [_jsxs("button", { onClick: () => step > 1 ? setStep(s => s - 1) : navigate('/cart'), className: "flex items-center gap-2 mb-8 text-muted-foreground text-sm font-medium", style: { background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }, children: ["\u2190 ", step > 1 ? 'Back' : 'Back to cart'] }), _jsx("h1", { className: "font-display font-extrabold text-3xl mb-8", children: "Checkout" }), _jsx(StepIndicator, { current: step }), _jsxs("div", { className: "grid gap-6", style: { gridTemplateColumns: '1fr 340px', alignItems: 'start' }, children: [_jsxs("div", { style: { background: 'white', borderRadius: 24, padding: '32px', border: '1.5px solid hsl(var(--border))' }, children: [step === 1 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "font-display font-bold text-xl mb-6", children: "Delivery Details" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs(Field, { label: "First Name", children: [_jsx("input", { className: "form-input", value: form.firstName, onChange: set('firstName'), placeholder: "John" }), inputError('firstName')] }), _jsx(Field, { label: "Last Name", children: _jsx("input", { className: "form-input", value: form.lastName, onChange: set('lastName'), placeholder: "Doe" }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs(Field, { label: "Email", children: [_jsx("input", { className: "form-input", type: "email", value: form.email, onChange: set('email'), placeholder: "john@example.com" }), inputError('email')] }), _jsxs(Field, { label: "Phone", children: [_jsx("input", { className: "form-input", type: "tel", value: form.phone, onChange: set('phone'), placeholder: "+91 98765 43210" }), inputError('phone')] })] }), _jsxs(Field, { label: "Street Address", children: [_jsx("input", { className: "form-input mb-4", value: form.address, onChange: set('address'), placeholder: "123 Main Street, Apt 4B" }), inputError('address')] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs(Field, { label: "City", children: [_jsx("input", { className: "form-input", value: form.city, onChange: set('city'), placeholder: "Mumbai" }), inputError('city')] }), _jsx(Field, { label: "State", children: _jsxs("select", { className: "form-input", value: form.state, onChange: set('state'), children: [_jsx("option", { value: "", children: "Select" }), INDIAN_STATES.map(s => _jsx("option", { children: s }, s))] }) }), _jsx(Field, { label: "PIN Code", children: _jsx("input", { className: "form-input", value: form.zip, onChange: set('zip'), placeholder: "400001", maxLength: 6 }) })] })] })), step === 2 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "font-display font-bold text-xl mb-2", children: "Payment Method" }), _jsxs("p", { className: "text-muted-foreground text-sm mb-6 flex items-center gap-1.5", children: [_jsx("span", { children: "\uD83D\uDD12" }), " Your payment information is encrypted & secure"] }), _jsx("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [{ id: 'razorpay', label: 'Razorpay', icon: '💳', desc: 'UPI, Cards, Wallets, NetBanking' }, { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' }].map(({ id, label, icon, desc }) => (_jsxs("button", { onClick: () => setForm(f => ({ ...f, paymentMethod: id })), style: { padding: 16, borderRadius: 16, border: `2px solid ${form.paymentMethod === id ? 'var(--ink)' : 'hsl(var(--border))'}`, background: form.paymentMethod === id ? '#f8f8f8' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }, children: [_jsx("div", { style: { fontSize: 28, marginBottom: 8 }, children: icon }), _jsx("div", { className: "font-semibold text-sm mb-1", children: label }), _jsx("div", { className: "text-muted-foreground", style: { fontSize: 11 }, children: desc })] }, id))) })] })), step === 3 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "font-display font-bold text-xl mb-6", children: "Review Order" }), _jsxs("div", { style: { background: '#f8f8f8', borderRadius: 16, padding: 20, marginBottom: 20 }, children: [_jsx("h3", { className: "font-semibold text-sm mb-3", children: "Delivery Address" }), _jsxs("p", { className: "text-sm", style: { lineHeight: 1.7 }, children: [form.firstName, " ", form.lastName, _jsx("br", {}), form.address, _jsx("br", {}), form.city, ", ", form.state, " ", form.zip, _jsx("br", {}), form.email, " \u00B7 ", form.phone] })] }), _jsxs("div", { style: { background: '#f8f8f8', borderRadius: 16, padding: 20, marginBottom: 20 }, children: [_jsx("h3", { className: "font-semibold text-sm mb-3", children: "Payment" }), _jsx("p", { className: "text-sm", children: form.paymentMethod === 'razorpay' ? '💳 Razorpay (UPI/Cards/Wallets)' : '💵 Cash on Delivery' })] }), _jsxs("div", { style: { background: '#f8f8f8', borderRadius: 16, padding: 20 }, children: [_jsxs("h3", { className: "font-semibold text-sm mb-3", children: ["Items (", items.length, ")"] }), items.map(item => (_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("img", { src: item.image, alt: "", style: { width: 40, height: 40, borderRadius: 8, objectFit: 'cover' } }), _jsxs("div", { className: "flex-1 text-sm", children: [item.name, " \u00D7 ", item.qty] }), _jsx("div", { className: "font-semibold text-sm", children: formatPrice(item.price * item.qty) })] }, item.id)))] })] })), _jsxs("div", { className: "flex items-center justify-between mt-8 pt-6", style: { borderTop: '1px solid hsl(var(--border))' }, children: [step > 1 ? _jsx(ShopButton, { variant: "outline", size: "md", onClick: () => setStep(s => s - 1), children: "\u2190 Back" }) : _jsx("div", {}), _jsx(ShopButton, { variant: "accent", size: "lg", loading: submitting, onClick: handleNext, style: { borderRadius: 14, minWidth: 180 }, children: step === 3 ? (form.paymentMethod === 'razorpay' ? `Pay ${formatPrice(grandTotal)}` : 'Place Order') : 'Continue →' })] })] }, step), _jsxs("div", { style: { background: 'white', borderRadius: 24, padding: 24, border: '1.5px solid hsl(var(--border))', position: 'sticky', top: 84 }, children: [_jsx("h2", { className: "font-display font-bold text-lg mb-4", children: "Order Summary" }), items.map(item => (_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("img", { src: item.image, alt: "", style: { width: 48, height: 48, borderRadius: 10, objectFit: 'cover' } }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium truncate", children: item.name }), _jsxs("p", { className: "text-muted-foreground", style: { fontSize: 12 }, children: ["Qty: ", item.qty] })] }), _jsx("span", { className: "font-semibold text-sm", children: formatPrice(item.price * item.qty) })] }, item.id))), _jsx(PriceSummary, { compact: true, className: "mt-4" })] })] })] }));
};
export default Checkout;

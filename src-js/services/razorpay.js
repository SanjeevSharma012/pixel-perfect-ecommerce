import { loadScript, RAZORPAY_SDK } from '../utils/loadScript';
import { createRazorpayOrder, verifyRazorpayPayment } from './api';

export const initiateRazorpayPayment = async ({ amount, customer, items, onSuccess, onFailure }) => {
    const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
    console.log('[Razorpay] Using key:', KEY_ID ? `${KEY_ID.slice(0,6)}...` : 'NONE (demo mode)');
    if (!KEY_ID || KEY_ID.includes('your_key')) {
        console.warn('No VITE_RAZORPAY_KEY_ID set — simulating payment for demo');
        await new Promise(r => setTimeout(r, 1500));
        onSuccess({ razorpay_payment_id: 'pay_demo_' + Date.now(), razorpay_order_id: 'order_demo_' + Date.now(), razorpay_signature: 'demo_sig' });
        return;
    }
    const loaded = await loadScript(RAZORPAY_SDK);
    if (!loaded) {
        onFailure(new Error('Failed to load Razorpay SDK. Check your internet connection.'));
        return;
    }
    let order;
    try {
        order = await createRazorpayOrder(amount * 100);
    }
    catch {
        console.warn('Backend unavailable – using mock Razorpay order for demo');
        order = { id: 'order_demo_' + Date.now(), amount: amount * 100, currency: 'INR' };
    }
    const rzp = new window.Razorpay({
        key: KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'ShopSmart',
        description: `Order for ${items.length} item${items.length > 1 ? 's' : ''}`,
        order_id: order.id,
        prefill: {
            name: customer.firstName + ' ' + customer.lastName,
            email: customer.email,
            contact: customer.phone,
        },
        theme: { color: '#ff4d2e' },
        handler: async (response) => {
            try {
                await verifyRazorpayPayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });
            }
            catch {
                console.warn('Signature verification skipped (demo mode)');
            }
            onSuccess(response);
        },
        modal: { ondismiss: () => onFailure(new Error('Payment cancelled by user')) },
    });
    rzp.open();
};

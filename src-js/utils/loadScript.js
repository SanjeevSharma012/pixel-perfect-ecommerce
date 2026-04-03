export const loadScript = (src) => new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true);
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
});
export const RAZORPAY_SDK = 'https://checkout.razorpay.com/v1/checkout.js';

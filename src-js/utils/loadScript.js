<<<<<<< HEAD:src-js/utils/loadScript.js
export const loadScript = (src) => new Promise((resolve) => {
=======
export const loadScript = (src) =>
  new Promise((resolve) => {
>>>>>>> 1eed3bb41956043c2cd813d08cf28aeeaa2efc64:src/utils/loadScript.js
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

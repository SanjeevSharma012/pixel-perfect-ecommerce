import { useCartContext } from '../context/CartContext';
import { SHIPPING_COST, SHIPPING_THRESHOLD, TAX_RATE } from '../utils/constants';

const useCart = () => {
    const ctx = useCartContext();
    const shipping = ctx.cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = ctx.cartSubtotal * TAX_RATE;
    const grandTotal = ctx.cartSubtotal + shipping + tax;
    const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - ctx.cartSubtotal);
    const hasFreeShipping = ctx.cartSubtotal >= SHIPPING_THRESHOLD;
    return {
        ...ctx,
        shipping,
        tax,
        grandTotal,
        freeShippingRemaining,
        hasFreeShipping,
    };
};
export default useCart;

<<<<<<< HEAD:src-js/hooks/useCart.js
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
=======
import { useCartContext } from '../context/CartContext.jsx';
import { SHIPPING_COST, SHIPPING_THRESHOLD, TAX_RATE } from '../utils/constants.js';

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

>>>>>>> 1eed3bb41956043c2cd813d08cf28aeeaa2efc64:src/hooks/useCart.js
export default useCart;

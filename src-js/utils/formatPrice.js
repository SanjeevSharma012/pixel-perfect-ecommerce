export const formatPrice = (amount, currency = 'INR') => {
<<<<<<< HEAD:src-js/utils/formatPrice.js
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
};
export const discountPercent = (original, sale) => Math.round(((original - sale) / original) * 100);
=======
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const discountPercent = (original, sale) =>
  Math.round(((original - sale) / original) * 100);
>>>>>>> 1eed3bb41956043c2cd813d08cf28aeeaa2efc64:src/utils/formatPrice.js

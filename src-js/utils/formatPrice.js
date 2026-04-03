export const formatPrice = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
};

export const discountPercent = (original, sale) => Math.round(((original - sale) / original) * 100);

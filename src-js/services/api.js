import axios from 'axios';
import products from '../data/products.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true; // Default to mock for demo

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Mock API functions
const mockApi = {
    fetchProducts: (params = {}) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredProducts = [...products];

                if (params.category && params.category !== 'All') {
                    filteredProducts = filteredProducts.filter(p => p.category === params.category);
                }

                if (params.search) {
                    const searchTerm = params.search.toLowerCase();
                    filteredProducts = filteredProducts.filter(p =>
                        p.name.toLowerCase().includes(searchTerm) ||
                        p.description.toLowerCase().includes(searchTerm) ||
                        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                    );
                }

                resolve(filteredProducts);
            }, 300); // Simulate network delay
        });
    },

    fetchProductById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const product = products.find(p => p.id === id);
                if (product) {
                    resolve(product);
                } else {
                    reject(new Error('Product not found'));
                }
            }, 200);
        });
    },

    createOrder: (payload) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const order = {
                    id: 'order_' + Date.now(),
                    ...payload,
                    status: 'confirmed',
                    createdAt: new Date().toISOString()
                };
                resolve(order);
            }, 500);
        });
    },

    fetchOrder: (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id,
                    status: 'confirmed',
                    items: [],
                    total: 0
                });
            }, 300);
        });
    },

    createRazorpayOrder: (amount) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 'order_' + Date.now(),
                    amount: amount * 100, // Razorpay expects amount in paisa
                    currency: 'INR'
                });
            }, 400);
        });
    },

    verifyRazorpayPayment: (payload) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    paymentId: payload.razorpay_payment_id,
                    orderId: payload.razorpay_order_id
                });
            }, 300);
        });
    }
};

// API functions with fallback to mock data
export const fetchProducts = (params = {}) => {
    if (USE_MOCK_DATA) {
        return mockApi.fetchProducts(params);
    }
    return api.get('/products', { params }).then(r => r.data).catch(() => mockApi.fetchProducts(params));
};

export const fetchProductById = (id) => {
    if (USE_MOCK_DATA) {
        return mockApi.fetchProductById(id);
    }
    return api.get(`/products/${id}`).then(r => r.data).catch(() => mockApi.fetchProductById(id));
};

export const createOrder = (payload) => {
    if (USE_MOCK_DATA) {
        return mockApi.createOrder(payload);
    }
    return api.post('/orders', payload).then(r => r.data).catch(() => mockApi.createOrder(payload));
};

export const fetchOrder = (id) => {
    if (USE_MOCK_DATA) {
        return mockApi.fetchOrder(id);
    }
    return api.get(`/orders/${id}`).then(r => r.data).catch(() => mockApi.fetchOrder(id));
};

export const createRazorpayOrder = (amount) => {
    if (USE_MOCK_DATA) {
        return mockApi.createRazorpayOrder(amount);
    }
    return api.post('/payment/create-order', { amount }).then(r => r.data).catch(() => mockApi.createRazorpayOrder(amount));
};

export const verifyRazorpayPayment = (payload) => {
    if (USE_MOCK_DATA) {
        return mockApi.verifyRazorpayPayment(payload);
    }
    return api.post('/payment/verify', payload).then(r => r.data).catch(() => mockApi.verifyRazorpayPayment(payload));
};

export default api;

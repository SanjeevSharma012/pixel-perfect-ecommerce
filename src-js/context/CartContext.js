import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useCallback } from 'react';
const initialState = {
    items: [],
    isOpen: false,
    wishlist: [],
};
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find(i => i.id === action.payload.id);
            return {
                ...state,
                items: existing
                    ? state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
                    : [...state.items, { ...action.payload, qty: 1 }],
            };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(i => i.id !== action.payload) };
        case 'UPDATE_QTY': {
            const { id, qty } = action.payload;
            return {
                ...state,
                items: qty <= 0
                    ? state.items.filter(i => i.id !== id)
                    : state.items.map(i => i.id === id ? { ...i, qty } : i),
            };
        }
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'OPEN_CART':
            return { ...state, isOpen: true };
        case 'CLOSE_CART':
            return { ...state, isOpen: false };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        case 'TOGGLE_WISHLIST': {
            const idx = state.wishlist.findIndex(i => i.id === action.payload.id);
            return {
                ...state,
                wishlist: idx >= 0
                    ? state.wishlist.filter(i => i.id !== action.payload.id)
                    : [...state.wishlist, action.payload],
            };
        }
        default:
            return state;
    }
}
const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const addItem = useCallback((product) => dispatch({ type: 'ADD_ITEM', payload: product }), []);
    const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);
    const updateQty = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } }), []);
    const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
    const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
    const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);
    const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
    const toggleWishlist = useCallback((product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product }), []);
    const cartCount = state.items.reduce((s, i) => s + i.qty, 0);
    const cartSubtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    const isWishlisted = (id) => state.wishlist.some(w => w.id === id);
    return (_jsx(CartContext.Provider, { value: { ...state, cartCount, cartSubtotal, isWishlisted, addItem, removeItem, updateQty, clearCart, openCart, closeCart, toggleCart, toggleWishlist }, children: children }));
};
export const useCartContext = () => {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error('useCartContext must be used within CartProvider');
    return ctx;
};
export default CartContext;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import ShopNavbar from './components/shop/ShopNavbar';
import ShopFooter from './components/shop/ShopFooter';
import CartDrawer from './components/shop/CartDrawer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Failed from './pages/Failed';
const App = () => {
    const [search, setSearch] = useState('');
    return (_jsx(BrowserRouter, { future: { v7_startTransition: true, v7_relativeSplatPath: true }, children: _jsxs(CartProvider, { children: [_jsx(ShopNavbar, { search: search, onSearch: setSearch }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { search: search }) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) }), _jsx(Route, { path: "/success", element: _jsx(Success, {}) }), _jsx(Route, { path: "/failed", element: _jsx(Failed, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }), _jsx(CartDrawer, {}), _jsx(ShopFooter, {}), _jsx(Toaster, { position: "bottom-right", toastOptions: {
                        style: {
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: 14,
                            borderRadius: 14,
                            background: '#0a0a0f',
                            color: '#fff',
                        },
                    } })] }) }));
};
export default App;

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext.jsx';
import ShopNavbar from './components/shop/ShopNavbar.jsx';
import ShopFooter from './components/shop/ShopFooter.jsx';
import CartDrawer from './components/shop/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Success from './pages/Success.jsx';
import Failed from './pages/Failed.jsx';

const App = () => {
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <CartProvider>
        <ShopNavbar search={search} onSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CartDrawer />
        <ShopFooter />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              borderRadius: 14,
              background: '#0a0a0f',
              color: '#fff',
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;

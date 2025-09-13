import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from './components/ui/toaster';

import Homepage from './pages/Homepage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AllCategoriesPage from './pages/AllCategoriesPage';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import MessagesPage from './pages/MesagesPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <MessageProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/categories" element={<AllCategoriesPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </MessageProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem('orders');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (products) => {
    const items = Array.isArray(products) ? products : [products];

    const newOrder = {
      id: Date.now(),
      items: products,
      total: products.reduce((sum, p) => sum + p.price * p.qty, 0),
      createdAt: new Date().toISOString(),
      status: '已支付',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const value = { orders, addOrder };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}

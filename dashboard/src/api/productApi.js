export const fetchProductList = async () => {
  const res = await fetch('https://dummyjson.com/products');
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();

  return data;
};

export const updateProduct = async (id, updatedData) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updatedData.name,
        price: updatedData.price,
        stock: updatedData.stock,
        category: updatedData.category,
        description: updatedData.description,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error updating product:', err);
    throw err;
  }
};

export const fetchProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();

  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();

  return data;
};

export const fetchOrderList = async () => {
  try {
    const res = await fetch('https://dummyjson.com/carts');
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return {
      orders: data.carts.map((c) => ({
        id: c.id,
        products: c.products.map((p) => ({
          id: p.id,
          name: p.title,
          quantity: p.quantity,
          price: p.price,
        })),
        totalPrice: c.total,
        status: 'Pending',
        orderDate: new Date().toISOString(),
      })),
    };
  } catch (err) {
    console.error(err);
    return { orders: [] };
  }
};

export const fetchTopSellingProduct = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();

    const sorted = data.products.sort((a, b) => b.rating - a.rating);

    const topProduct = sorted[0];

    return {
      id: topProduct.id,
      name: topProduct.title,
      rating: topProduct.rating,
      stock: topProduct.stock,
      img: topProduct.thumbnail,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchLowStockProduct = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();

    const sorted = data.products.sort((a, b) => a.stock - b.stock);

    const LowProduct = sorted[0];

    return {
      id: LowProduct.id,
      name: LowProduct.title,
      rating: LowProduct.rating,
      stock: LowProduct.stock,
      img: LowProduct.thumbnail,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

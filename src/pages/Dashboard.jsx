import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/product';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      fetchProducts(); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/add-product')}>
          ➕ Add Product
        </button>

        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          🚪 Logout
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && <p>No products found</p>}

     
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: '1px solid black',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}
        >
          <h3>{product.name}</h3>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>

        
          <button
            onClick={() => navigate(`/edit-product/${product._id}`)}
          >
        Edit
          </button>

          <button
            onClick={() => handleDelete(product._id)}
            style={{ marginLeft: '10px', color: 'red' }}
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
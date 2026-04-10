import React, { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../services/product';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setForm(res.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProduct(id, {
        ...form,
        price: Number(form.price) 
      });

      setLoading(false);
      navigate('/dashboard');
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Product</h1>

      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
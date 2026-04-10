import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';  
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/add-product' element={<AddProduct />} />
  <Route path='/edit-product/:id' element={<UpdateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
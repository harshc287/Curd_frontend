import React, { useState} from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { registerUser } from '../services/auth';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleRegister = async (e) => {
    e.preventDefault();

    try {
        if (!form.name || !form.email || !form.password) { // ✅ FIXED
            alert('Please fill all the fields');
            return;
        }

        setLoading(true);

        const res = await registerUser(form);

        localStorage.setItem('token', res.token);

        setLoading(false);
        navigate('/');
    } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
    }
};

    return (
        <div>
            <h1>Register</h1>

            {error && <p style={{ color: 'red' }}>Something went wrong</p>}
            {loading && <p>Loading...</p>}

            <form onSubmit={handleRegister} className="container">
                <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">Register</button>
                        <p className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
            </form>
        </div>
    );
};

export default Register;
import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('/auth/login', inputs);
      await login(inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" name="username" placeholder="username" onChange={handleChange} />
        <input required type="password" name="password" placeholder="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>Error occured !</p>}
        <span>
          Do not have an account ? <Link to="/Register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

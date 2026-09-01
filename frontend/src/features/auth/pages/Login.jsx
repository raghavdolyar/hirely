import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import '../auth.form.scss';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../../../components/Loader';

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      await handleLogin({ email, password });
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      if (msg.includes('invalid email or password')) {
        const wantsToRegister = window.confirm('Invalid credentials. If you don\'t have an account, would you like to register?');
        if (wantsToRegister) {
          navigate('/register');
        }
      } else {
        alert(msg);
      }
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={evt => {
                setEmail(evt.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={evt => {
                setPassword(evt.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button className="button primary-button" disabled={loading}>
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <Link to={'/register'}>Register</Link>{' '}
        </p>
      </div>
    </main>
  );
};

export default Login;

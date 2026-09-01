import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../../../components/Loader';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      await handleRegister({ username, email, password });
      navigate('/');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(210, 13, 59, 0.1)',
            color: '#ff2a73',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(210, 13, 59, 0.3)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={e => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={e => {
                setEmail(e.target.value);
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
              onChange={e => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button className="button primary-button" disabled={loading}>
            {loading ? <Loader /> : 'Register'}
          </button>
        </form>

        <p>
          Already have an account? <Link to={'/login'}>Login</Link>{' '}
        </p>
      </div>
    </main>
  );
};

export default Register;

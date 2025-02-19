import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log('Making API call to:', 'http://localhost:3001/auth/register');
        const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });
      console.log('Registration successful:', response.data); // Debug log
      navigate('/login');
    } catch (err: any) {
      console.error('Registration error:', err); // Debug log
      console.error('Error response:', err.response); // Debug log
      setError(
        err.response?.data?.message || 
        'Registration failed. Please check if the server is running.'
      );
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid px-4">
          <span className="navbar-brand">
            <i className="bi bi-check2-square me-2"></i>
            Task Manager
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 container-fluid px-4 py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Create Account</h2>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                    <i className="bi bi-person-plus me-2"></i>
                    Register
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="btn btn-link text-decoration-none"
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Already have an account? Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
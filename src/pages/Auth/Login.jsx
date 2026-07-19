import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/vendor/css/pages/page-auth.css';

import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await authService.login(form);
      login(response.data.data);
      navigate('/dashboard');

    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card px-sm-6 px-0">
            <div className="card-body">
              <h4 className="mb-1">
                Welcome to AI Applicant Support Portal!
              </h4>

              <p className="mb-6">
                Educational Outreach | IIT Bombay
              </p>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={ handleSubmit } >
                <div className="mb-6">
                  <label className="form-label">
                    Email
                  </label>

                  <input type="email" className="form-control" name="email"
                    value={ form.email }
                    onChange={ handleChange }
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-6">
                  <label className="form-label">
                    Password
                  </label>

                  <input type="password" className="form-control" name="password"
                    value={ form.password }
                    onChange={ handleChange }
                    placeholder="Password"
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? 'Logging in...'
                    : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
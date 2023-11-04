import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid Email Address')
        .required('Email Address is Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must have one uppercase, one lowercase, one number, and one special character'
        )
        .required('Password is Required'),
    }),
    onSubmit: (values) => {
      dispatch({ type: 'LOGIN_START' });
      dispatch({ type: 'LOGIN_SUCCESS', payload: values });
      navigate('/');
    },
  });

  return (
    <div className="hackathon-login-container">
      <div className="hackathon-login-box">
        <h1 className="title">TripBloc Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-field">
            <div className="input-field">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <Link to="/" className="skip-option">
            Skip without login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

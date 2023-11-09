import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { IDKitWidget } from '@worldcoin/idkit';
import { DynamicWidget } from '@dynamic-labs/sdk-react';
import {
  useWeb3Modal,
  useWeb3ModalSigner,
  useWeb3ModalState,
} from '@web3modal/ethers5/react';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const { open } = useWeb3Modal();
  const { selectedNetworkId } = useWeb3ModalState();
  const selectNetwork = () => {
    open();
    console.log('selectedNetworkId', selectedNetworkId);
  };

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
        {/* <h1 className="title">TripBloc Login</h1>
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
        </form> */}
        {/* <IDKitWidget
          app_id="wid_staging_9f3a190dcfd6bcd9a27f6f88bc31793e" // obtained from the Developer Portal
          action="vote_1" // this is your action name from the Developer Portal
          signal="user_value" // any arbitrary value the user is committing to, e.g. a vote
          onSuccess={() => console.log('success')}
          credential_types={['orb', 'phone']} // the credentials you want to accept
          enableTelemetry
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
        <button onClick={selectNetwork}>Wallet Connect</button>
        <DynamicWidget /> */}
      </div>
    </div>
  );
};

export default Login;

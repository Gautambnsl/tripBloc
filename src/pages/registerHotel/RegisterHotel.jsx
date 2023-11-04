import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./regiterHotel.css";

const RegisterHotel = () => {
  const formik = useFormik({
    initialValues: {
      hotelName: '',
      hotelDistance: '',
      hotelDescription: '',
      hotelCheapestPrice: '',
      hotelAddress: '',
      hotelContactNumber: '',
      numberOfRooms: '',
    },
    validationSchema: Yup.object({
      hotelName: Yup.string().required('Hotel name is required'),
      hotelDistance: Yup.string().required('Hotel distance is required'),
      hotelDescription: Yup.string().required('Hotel description is required'),
      hotelCheapestPrice: Yup.number()
        .min(0, 'Price cannot be negative')
        .positive('Price must be a positive number')
        .required('Price is required'),
      hotelAddress: Yup.string().required('Hotel address is required'),
      hotelContactNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Contact number must be only digits')
        .min(10, 'Contact number must be at least 10 digits')
        .required('Contact number is required'),
      numberOfRooms: Yup.number()
        .min(0, 'Number of rooms cannot be negative')
        .positive('Number of rooms must be a positive number')
        .required('Number of rooms is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1 className="title">Register Your Hotel</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              placeholder="Hotel Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hotelName}
            />
            {formik.touched.hotelName && formik.errors.hotelName ? (
              <div className="error-message">{formik.errors.hotelName}</div>
            ) : null}
          </div>

          <div className="input-field">
            <input
              type="text"
              id="hotelDistance"
              name="hotelDistance"
              placeholder="Hotel Distance (e.g., 10km from city center)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hotelDistance}
            />
            {formik.touched.hotelDistance && formik.errors.hotelDistance ? (
              <div className="error-message">{formik.errors.hotelDistance}</div>
            ) : null}
          </div>

          <div className="input-field">
            <input
              type="text"
              id="hotelDescription"
              name="hotelDescription"
              placeholder="Hotel Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hotelDescription}
            />
            {formik.touched.hotelDescription &&
            formik.errors.hotelDescription ? (
              <div className="error-message">
                {formik.errors.hotelDescription}
              </div>
            ) : null}
          </div>

          <div className="input-field">
            <input
              type="number"
              id="hotelCheapestPrice"
              name="hotelCheapestPrice"
              placeholder="Price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hotelCheapestPrice}
            />
            {formik.touched.hotelCheapestPrice &&
            formik.errors.hotelCheapestPrice ? (
              <div className="error-message">
                {formik.errors.hotelCheapestPrice}
              </div>
            ) : null}
          </div>

          <div className="input-field">
            <input
              type="number"
              id="numberOfRooms"
              name="numberOfRooms"
              placeholder="No. of Rooms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.numberOfRooms}
            />
            {formik.touched.numberOfRooms && formik.errors.numberOfRooms ? (
              <div className="error-message">{formik.errors.numberOfRooms}</div>
            ) : null}
          </div>

          <div className="input-field">
            <input
              type="text"
              id="hotelAddress"
              name="hotelAddress"
              placeholder="Hotel Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hotelAddress}
            />
            {formik.touched.hotelAddress && formik.errors.hotelAddress ? (
              <div className="error-message">{formik.errors.hotelAddress}</div>
            ) : null}
          </div>

          <div className="input-field">
            <input
              type="number"
              id="hotelContactNumber"
              name="hotelContactNumber"
              placeholder="Contact Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hotelContactNumber}
            />
            {formik.touched.hotelContactNumber &&
            formik.errors.hotelContactNumber ? (
              <div className="error-message">
                {formik.errors.hotelContactNumber}
              </div>
            ) : null}
          </div>

          {/* <button
              type="submit"
              style={{
                padding: '10px',
                marginTop: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Register Hotel
            </button> */}
          <button type="submit" className="register-btn">
            Register Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterHotel;

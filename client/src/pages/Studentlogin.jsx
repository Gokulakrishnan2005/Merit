import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';

export default function Studentlogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Using id directly
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/listing/studentlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate(`/studentdetails`); 
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="mb-3 text-4xl font-bold text-blue-800">Welcome back</span>
          <span className="font-light text-blue-600 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <span className="mb-2 text-md text-blue-700">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-blue-300 rounded-md placeholder:font-light placeholder:text-blue-500"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md text-blue-700">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-blue-300 rounded-md placeholder:font-light placeholder:text-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end w-full py-2">
              <button className="font-bold text-md text-blue-600">Forgot password</button>
            </div>
            <button
              type="submit"
              disabled={loading}

              className="w-full bg-blue-600 text-white p-2 rounded-lg mb-6 hover:text-blue-600 hover:bg-white hover:font-bold hover:border hover:border-blue-300"
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>
          </form>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Right side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
            alt="Login illustration"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* Text on image */}
          <div className="absolute hidden bottom-10 right-6 left-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-blue-900 text-xl">
              Don't have an account? Ask your HOD or higher officials.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

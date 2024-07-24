import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // if (!data.success) {
      //   dispatch(signInFailure(data.message));
      //   return;
      // }
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/studentcreation');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">Welcome back! Please enter your details</span>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex justify-end w-full py-2">
              <button type="button" className="font-bold text-md">Forgot password</button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded-lg mb-6 hover:text-black hover:bg-white hover:font-bold hover:border hover:border-gray-300"
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {/* <OAuth /> */}
          {/* <div className="text-center text-gray-400">
            Don't have an account?
            <Link to='/signup'>
              <span className="font-bold text-black hover:text-blue-600"> Sign up</span>
            </Link>
          </div> */}
        </div>
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/600409626/photo/login-interface.jpg?s=612x612&w=0&k=20&c=4Hy74p1j1yQm9qhKWAcnzkOMnjjnnJ6PKbYf6u-XNhQ="
            alt="Login illustration"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 left-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              We've been using Untitle to kickstart every new project and can't imagine working without it.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

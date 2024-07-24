import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import OAuth from '../components/OAuth';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id.toLowerCase()]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (!data.success) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/studentcreation');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
      }
      console.log(formData);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                {/* left side */}
                <div className="flex flex-col justify-center p-6 md:p-10">
                    <span className="mb-3 text-4xl font-bold">Create Your account</span>
                    <span className="font-light text-gray-400 mb-8">
                        Welcome back! Please enter your details
                    </span>
                    <form onSubmit={handleSubmit}>
                        <div className="py-2">
                            <span className="mb-2 text-md">Username</span>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-2">
                            <span className="mb-2 text-md">Email</span>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-2">
                            <span className="mb-2 text-md">Password</span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            />
                        </div>
                        <button disabled={loading}
                            className="w-full bg-blue-600 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-blue-600 hover:border hover:border-gray-300"
                        >
                            <FaUserPlus className="w-6 h-6 inline mr-2" />
                            {loading ? 'Loading...' : 'Sign up'}
                        </button>
                    </form>

                    {error && <p className="text-red-500">{error}</p>}
                    {/* <OAuth /> */}

                    <div className="text-center text-gray-400">
                        Do you have any account?
                        <span className="font-bold text-black cursor-pointer hover:text-blue-600">
                            <Link to='/login'> Sign In </Link>
                        </span>
                    </div>
                </div>
                {/* right side */}
                <div className="relative">
                    <img
                        src="https://media.istockphoto.com/id/600409626/photo/login-interface.jpg?s=612x612&w=0&k=20&c=4Hy74p1j1yQm9qhKWAcnzkOMnjjnnJ6PKbYf6u-XNhQ="
                        alt="Login illustration"
                        className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                    />
                    {/* text on image */}
                    <div className="absolute hidden bottom-10 right-6 left-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                        <span className="text-white text-sm ">
                        " Join our vibrant college community today and unlock endless opportunities for growth and success. Sign up now to embark on an exciting educational journey with us! "
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

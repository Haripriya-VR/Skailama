import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../constants/constant';
import axios from 'axios';


function UserModal({ handleClose }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        if (isSubmitting && formData) {
            const submitData = async () => {
                try {
                    const response = await axios.post(`${BACKEND_BASE_URL}/login`, formData, {
                        withCredentials: true
                    });
                    const userId = response?.data?.User?._id;
                    console.log('Response:', userId);
                    if (response.data.success) {
                        console.log("response.data.success", response.data.success);
                        localStorage.setItem('user', userId);

                        handleClose(false);
                        // navigate('/');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setError('Failed to create project. Please try again.');
                } finally {
                    setIsSubmitting(false);
                    setFormData(null);
                }
            };

            submitData();
        }
    }, [isSubmitting, formData, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = emailRegex.test(email);
        const passwordPattern = /^[^\s]{6,}$/;
        const validPassword = passwordPattern.test(password);

        if (!userName) {
            setError("Username can't be empty.");
            return;
        }

        if (!validEmail) {
            setError("Invalid email address.");
            return;
        }

        if (!validPassword) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setError('');
        setFormData({ userName, email, password });
        setIsSubmitting(true);
    };

    return (
        <div className=''>
            <div className="flex items-center justify-between mb-7">
                <h1 className="text-xl font-bold text-gray-900">User Login</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col max-w-5xl">
                <label htmlFor="userName" className="mb-3 text-sm text-slate-700 font-medium">
                    Name:
                </label>
                <div className="relative w-full">
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        id="userName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        placeholder="Enter Username"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
                )}
                <label htmlFor="Email" className="mb-3 text-sm text-slate-700 font-medium">
                    Email:
                </label>
                <div className="relative w-full">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        id="Email"
                        name='email'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        placeholder="Enter email"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
                )}
                <label htmlFor="password" className="mb-3 text-sm text-slate-700 font-medium">
                    Password:
                </label>
                <div className="relative w-full">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        id="password"
                        name='password'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        placeholder="Enter password"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
                )}

                <div className="flex items-center justify-end p-4 mt-5 rounded-b">
                    <button
                        type="submit"
                        className="text-white bg-blue-500 text-lg font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserModal;

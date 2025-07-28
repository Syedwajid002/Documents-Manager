import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Loginbg from '../Assets/Loginbg.png';
import logo from '../Assets/logo.png';

const useAuthStore = () => ({
    login: (user: any, token: string) => {
        console.log("AuthStore: User logged in:", user.email);
        localStorage.setItem('userToken', token);

    }
});
interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}

interface ErrorResponse {
    message: string;

}

const loginUserAPI = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const API_URL = 'http://localhost:5000/api/auth/login';

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        // If the response is not OK (e.g., 400, 401, 500), throw an error
        // The 'data' object should contain the 'message' from your backend
        throw { message: data.message || 'Login failed. Please try again.' } as ErrorResponse;
    }

    return data as LoginResponse;
};

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation
    const { login } = useAuthStore(); // Your auth store hook

    // Initialize useMutation for the login request
    const loginMutation = useMutation<LoginResponse, ErrorResponse, { email: string; password: string }>({
        mutationFn: loginUserAPI, // The function that makes the API call
        onSuccess: (data) => {
            // Handle successful login
            console.log('Login successful:', data);
            login(data.user, data.token); // Call your auth store's login function

            // Navigate based on user role or a default path
            if (data.user.role === 'admin') {
                localStorage.setItem("role", "admin")
                navigate('/adminportal'); // Assuming you have an /admin route
            } else {
                localStorage.setItem("role", "user")
                navigate('/folders'); // Navigate to your files page
            }
        },
        onError: (error) => {
            // Handle login failure
            console.error('Login error:', error.message);
            // The Alert component below will display error.message
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        loginMutation.mutate({ email, password }); // Trigger the login mutation
    };

    return (
        <div className='flex bg-[#131313] min-h-screen'>
            <div className='w-1/2'>
                <img src={Loginbg} alt="Login Background" className='w-full h-full object-cover' />
            </div>
            <div className='min-h-screen flex justify-center items-center w-1/2'>
                <div className='bg-[#292929] flex justify-center items-center border border-gray-600 rounded-2xl p-8' >
                    <form onSubmit={handleSubmit} className='flex flex-col w-80'> {/* Added w-80 for form width */}
                        <img src={logo} alt="Logo" className='h-16 w-auto mx-auto mb-4' /> {/* Added styling for logo */}
                        <p className='text-white text-2xl font-bold mt-2 text-center' >Welcome Back</p>
                        <p className='text-sm text-slate-400 mb-4 text-center'>Please enter your login credentials to continue</p>

                        {/* Display error message if login fails */}
                        {loginMutation.isError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {loginMutation.error?.message || 'Login failed. Please try again.'}
                            </Alert>
                        )}

                        <label htmlFor="email-input" className='text-gray-300 mb-1'>Email</label>
                        <input
                            id="email-input" // Added id for label
                            type="email"
                            placeholder='Login ID'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-white border rounded-lg border-gray-400 bg-[#292929] p-2 mt-1 mb-4 focus:outline-none focus:ring-1 focus:ring-red-600'
                            required
                        />

                        <label htmlFor="password-input" className='text-gray-300 mb-1'>Password</label>
                        <input
                            id="password-input" // Added id for label
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-white border rounded-lg border-gray-400 bg-[#292929] p-2 mt-1 mb-6 focus:outline-none focus:ring-1 focus:ring-red-600'
                            required
                        />

                        <button
                            type="submit"
                            className='bg-red-600 text-white p-3 border-0 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed'
                            disabled={loginMutation.isPending} // Disable button while loading
                        >
                            {loginMutation.isPending ? 'Logging In...' : 'Login'}
                        </button>

                        <p className='text-xs text-slate-500 mt-4 text-center'>
                            Admin: admin@demo.com / admin123 <br />
                            User: user@demo.com / user123
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import HomePage from './HomePage';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username and password match the hardcoded credentials
    if (username === 'admin' && password === 'password') {
      // Redirect to the home page or perform any other actions
      console.log('Login successful');
      setLogin(true)
      
    } else {
      // Show an error message
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <>
    { login ? <HomePage/> :
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-96">
        <h1 className="text-3xl font-semibold mb-6">Login</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
   } </>
  );
};

export default LoginPage; 

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("===== LOGIN BUTTON CLICKED =====");
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);

    try {

      const response = await axios.post(
        'http://localhost:8080/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("===== RESPONSE FROM SERVER =====");
      console.log(response.data);

      const data = response.data;

      if (data.status === true) {

        console.log("LOGIN SUCCESS");

        setStatus("Login successful");

        localStorage.setItem(
          'username',
          formData.username
        );

        await sleep(1000);

        navigate("/dashboard");

      } else {

        console.log("LOGIN FAILED");

        setStatus("Incorrect username or password");
      }

    } catch (error) {

      console.log("===== ERROR =====");

      if (error.response) {
        console.log("Response Error:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else {
        console.log("Error:", error.message);
      }

      setStatus("Server Error");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/resources/login-page.jpg')"
      }}
    >
      <div className="flex justify-center items-center min-h-screen bg-opacity-0">

        <div className="bg-white p-8 rounded-lg bg-opacity-50 backdrop-blur-md w-96">

          <h1 className="text-3xl text-center mb-6">
            Login to ExtraCircular Activities
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full p-3 bg-green-200 text-black border border-gray-300 rounded-md hover:text-white transition-all hover:bg-blue-950"
              >
                Login
              </button>
            </div>

          </form>

          <div className="text-center mt-4">

            <span className="text-red-600">
              {status}
            </span>

            <br />

            <a
              href="/register"
              className="text-blue-500 hover:underline"
            >
              No Account? - Sign Up
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;


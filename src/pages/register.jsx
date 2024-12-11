import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [status, setStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    sex: '',
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    clubActivity: true,
    img: null,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          img: new Uint8Array(reader.result), // making a byte from imaged 
        }));
      };
      reader.readAsArrayBuffer(file); 

      // gettinf theb imae from kasns
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        img: Array.from(formData.img || []),
      };

      // Log the image bytes to confirm
      console.log("Image bytes:", submitData.img);

      const response = await axios.post('http://localhost:8080/register', submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Success:', response.data); 
      alert('Registration Successful');
      navigate("/login")
      
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error during registration');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center pt-10" style={{ backgroundImage: "url('/resources/login-page.jpg')" }}>
      <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-50 backdrop-blur-md">
        <h1 className="text-3xl text-center mb-6">Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input type="text" id="fname" name="fname" value={formData.fname} onChange={handleChange} required placeholder="First Name" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <input type="text" id="lname" name="lname" value={formData.lname} onChange={handleChange} required placeholder="Last Name" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required placeholder="Age" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <div className="flex gap-4 mb-5">
                <span className="text-gray-700">Sex:</span>
                <label className="inline-flex items-center text-gray-700">Male <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleChange} className="form-radio text-green-500" required /></label>
                <label className="inline-flex items-center text-gray-700">Female <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleChange} className="form-radio text-green-500" required /></label>
              </div>
              <div className="flex flex-col items-center p-4">
                {selectedImage && <img src={selectedImage} alt="Selected" className="w-32 h-32 rounded-lg object-cover mb-4" />}
                <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border w-40 border-gray-300 rounded-lg" />
              </div>
            </div>
            <div>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required placeholder="Username" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <input type="password" id="passwordConf" name="passwordConf" value={formData.passwordConf} onChange={handleChange} required placeholder="Retype Password" className="w-full px-3 py-2 mb-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <label className="inline-flex items-center text-gray-700">Join Our Club & Activities <input type="checkbox" name="clubActivity" checked={formData.clubActivity} onChange={handleChange} className="form-checkbox text-green-500" /></label>
              <button type="submit" className="w-full py-3 mt-5 bg-green-500 text-white font-semibold rounded-md cursor-pointer hover:bg-green-600 transition-all">Submit</button>
              <a href="/login" className='text-blue-500'>Already have a Account?Login</a>
              <a className="text-red-600">{status}</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

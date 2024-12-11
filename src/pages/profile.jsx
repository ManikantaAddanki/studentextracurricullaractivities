import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    age: '',
    sex: '',
    password: '',
    img: ''
  });
  const [club, setClub] = useState({
    name: '',
    size: '',
    achievements: '',
    growth: '',
    description: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getprofile/${localStorage.getItem("username")}`);
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedProfile(profile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClubChange = (e) => {
    const { name, value } = e.target;
    setClub({ ...club, [name]: value });
  };

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/addclub', club);
      setClub({ name: '', size: '', achievements: '', growth: '', description: '' });
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  const imgSrc = `data:image/jpeg;base64,${profile.img}`;


  

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/resources/login-page.jpg')" }}
    >


      <div className="flex items-start w-3/4 space-x-6">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center mb-6"
      >
        ⬅ Back to Dashboard
      </button>
        {/* Profile Card */}
        <div className="w-1/2 p-6 bg-white bg-opacity-50 backdrop-blur-md rounded-lg">
          <div className="flex items-center space-x-6 mb-4">
            <img src={imgSrc} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {isEditing ? (
                  <input
                    type="text"
                    name="fname"
                    value={updatedProfile.fname}
                    onChange={handleInputChange}
                    className="text-3xl font-semibold text-gray-800"
                  />
                ) : (
                  `${profile.fname} ${profile.lname}`
                )}
              </h1>
              <p className="text-xl text-gray-600">{profile.username}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                  className="text-gray-600"
                />
              ) : (
                <p className="text-gray-600">{profile.email}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-700">Age</p>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={updatedProfile.age}
                  onChange={handleInputChange}
                  className="text-gray-600"
                />
              ) : (
                <p className="text-gray-600">{profile.age}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-700">Gender</p>
              {isEditing ? (
                <input
                  type="text"
                  name="sex"
                  value={updatedProfile.sex}
                  onChange={handleInputChange}
                  className="text-gray-600"
                />
              ) : (
                <p className="text-gray-600">{profile.sex}</p>
              )}
            </div>
            <div>
            <p className="font-semibold text-gray-700">club</p>
            <p className="font-semibold text-gray-700">{profile.club}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Password</p>
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={updatedProfile.password}
                  onChange={handleInputChange}
                  className="text-gray-600"
                />
              ) : (
                <p className="text-gray-600">••••••••</p>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-4 flex space-x-4">
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                Save Changes
              </button>
              <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Create Club Card */}
        <div className="w-1/2 p-6 bg-white bg-opacity-50 backdrop-blur-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a Club</h2>
          <form onSubmit={handleClubSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={club.name}
              onChange={handleClubChange}
              placeholder="Club Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="size"
              value={club.size}
              onChange={handleClubChange}
              placeholder="Size"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="achievements"
              value={club.achievements}
              onChange={handleClubChange}
              placeholder="Achievements"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="growth"
              value={club.growth}
              onChange={handleClubChange}
              placeholder="Growth"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              value={club.description}
              onChange={handleClubChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">
              Add Club
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

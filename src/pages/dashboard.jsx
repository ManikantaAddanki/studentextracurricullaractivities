import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate(); 
  if (!(localStorage.getItem("username"))){
    navigate("/login")
    
  }


  const activities = [
    { 
      title: 'Dance', 
      imageUrl: '/resources/dance.jpg',
      redirectUrl: 'https://www.dance.org'
    },
    { 
      title: 'Music', 
      imageUrl: '/resources/music.jpg', 
      redirectUrl: 'https://www.music.com'
    },
    { 
      title: 'Football', 
      imageUrl: '/resources/football.jpg',
      redirectUrl: 'https://www.football.com'
    },
    { 
      title: 'Yoga', 
      imageUrl: '/resources/yoga.jpg',
      redirectUrl: 'https://www.yoga.com'
    },
    { 
      title: 'Cooking', 
      imageUrl: '/resources/cooking.jpg', 
      redirectUrl: 'https://www.cooking.com'
    },
    { 
      title: 'Art', 
      imageUrl: '/resources/art.jpg', 
      redirectUrl: 'https://www.art.com'
    },
    { 
      title: 'Photography', 
      imageUrl: '/resources/photography.jpg', 
      redirectUrl: 'https://www.photography.com'
    },
    { 
      title: 'Writing', 
      imageUrl: '/resources/writing.jpg', 
      redirectUrl: 'https://www.writing.com'
    },
    { 
      title: 'Fitness', 
      imageUrl: '/resources/fitness.jpg', 
      redirectUrl: 'https://www.fitness.com'
    },
    { 
      title: 'Technology', 
      imageUrl: '/resources/technology.jpg', 
      redirectUrl: 'https://www.technology.com'
    },
  ];

  // Handle click  just dont eit -atlas
  const handleCardClick = (url) => {
    window.location.href = url;
  };

  // Handle logout 
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate('/login');
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <nav className="flex space-x-6">
          <a href="/activities" className="hover:text-gray-300">ACTIVITIES</a>
          <a href="/clubs" className="hover:text-gray-300">CLUBS</a>
          <a href="/sports" className="hover:text-gray-300">SPORTS CLUBS</a>
        </nav>
        <div className="flex items-center space-x-6">
          <a href="/myprofile" className="hover:text-gray-300">My Profile</a>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}>Logout
          </button>
        </div>
      </header>

     
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Explore Activities</h2>
        <div className="grid grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleCardClick(activity.redirectUrl)}
            >
              <img src={activity.imageUrl} alt={activity.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-center">{activity.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

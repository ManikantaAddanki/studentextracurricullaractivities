import React from 'react';
import { useNavigate } from 'react-router-dom';

import football from './resources/football.jpg';
import cricket from './resources/cricket.jpg';
import yoga from './resources/yoga.jpg';
import swimming from './resources/swimming.png';
import tennis from './resources/tennis.png';
import tabletennis from './resources/tabletennis.png';
import volleyball from './resources/volleyball.png';
import hockey from './resources/hockey.png';
import gymnastics from './resources/gymnastics.png';

const Dashboard = () => {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  if (!username) {
    navigate("/login");
  }

  const activities = [
    {
      title: "Football",
      imageUrl: football,
      route: "/activity/football"
    },
    {
      title: "Cricket",
      imageUrl: cricket,
      route: "/activity/cricket"
    },
    {
      title: "Yoga",
      imageUrl: yoga,
      route: "/activity/yoga"
    },
    {
      title: "Swimming",
      imageUrl: swimming,
      route: "/activity/swimming"
    },
    {
      title: "Tennis",
      imageUrl: tennis,
      route: "/activity/tennis"
    },
    {
      title: "Table Tennis",
      imageUrl: tabletennis,
      route: "/activity/tabletennis"
    },
    {
      title: "Volleyball",
      imageUrl: volleyball,
      route: "/activity/volleyball"
    },
    {
      title: "Hockey",
      imageUrl: hockey,
      route: "/activity/hockey"
    },
    {
      title: "Gymnastics",
      imageUrl: gymnastics,
      route: "/activity/gymnastics"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <div className="text-2xl font-bold">
          Student Extra Curricular Activities
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/myprofile")}
            className="bg-green-500 px-4 py-2 rounded"
          >
            My Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

      </header>

      <div className="p-8">

        <h2 className="text-4xl font-bold mb-8 text-center">
          Explore Activities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {activities.map((activity, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(activity.route)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >

              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold text-center">
                  {activity.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
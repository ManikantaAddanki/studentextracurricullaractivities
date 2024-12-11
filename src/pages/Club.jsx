
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClubsOverviewPage = () => {
  const [clubsData, setClubsData] = useState([]);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();

  // Fetch data from server - atlas 
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getclubs');
        setClubsData(response.data);
      } catch (error) {
        console.error('Error fetching club data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);
// dont change below code for manipulating the datasv
  const joinClub = async (clubName) => {
    try {
      const response = await axios.post(`http://localhost:8080/joinclub/${localStorage.getItem("username")}/${clubName}`);
      if (response.data.status) {
        alert("Joined club. Go to profile to view.");
      } else {
        alert("Cannot join the specified club.");
      }
    } catch (error) {
      console.error('Error joining club:', error);
      alert("Error occurred while attempting to join the club.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center mb-6"
      >
        ⬅ Back to Dashboard
      </button>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Clubs Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubsData.map((club, index) => (
          <ClubCard key={index} {...club} joinClub={joinClub} />
        ))}
      </div>
    </div>
  );
};

const ClubCard = ({ name, performance, teamSize, achievements, growth, description, joinClub }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl hover:border border-green-700 transition-shadow duration-200 hover:bg-green-50">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
    <p className="text-gray-600 mb-1">
      <strong>Performance:</strong> {performance}
    </p>
    <p className="text-gray-600 mb-1">
      <strong>Team Size:</strong> {teamSize} members
    </p>
    <p className="text-gray-600 mb-1">
      <strong>Achievements:</strong> {achievements}
    </p>
    <p className="text-gray-600 mb-1">
      <strong>Growth:</strong> {growth} increase
    </p>
    <p className="text-gray-700 italic mt-4">{description}</p>
    <button 
      onClick={() => joinClub(name)} 
      className="bg-red-100 rounded m-1 p-1 border border-gray-400 shadow-md hover:bg-green-300 font-semibold text-lg flex items-center mb-6"
    >
      Join Club
    </button>
  </div>
);

export default ClubsOverviewPage;

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ActivitiesPage() {
  const navigate = useNavigate();

  const [studentData] = useState({
    name: localStorage.getItem("username"),
    age: 17,
    gender: "Male",
    activities: [
      { name: "Math Club", participation: 85, score: 92 },
      { name: "Science Fair", participation: 90, score: 88 },
      { name: "Sports", participation: 75, score: 79 },
    ],
  });

  if (!(localStorage.getItem("username"))){
    navigate("/login")
    
  }

  const Header = ({ name, age, gender }) => (
    <div className="header bg-blue-500 text-white p-4 rounded-md">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
    </div>
  );


  const ActivityStats = ({ activities }) => (
    <div className="activity-stats">
      {activities.map((activity, index) => (
        <div key={index} className="activity bg-gray-100 p-4 rounded-md mb-2">
          <h3>{activity.name}</h3>
          <p>Participation: {activity.participation}%</p>
          <p>Score: {activity.score}</p>
        </div>
      ))}
    </div>
  );

  const Chart = ({ activities }) => {
    const data = {
      labels: activities.map((a) => a.name),
      datasets: [
        {
          label: 'Participation %',
          data: activities.map((a) => a.participation),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Score',
          data: activities.map((a) => a.score),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    };

    return <Bar data={data} />;
  };

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center mb-6"
      >
        ⬅ Back to Dashboard
      </button>
      <Header name={studentData.name} age={studentData.age} gender={studentData.gender} />
      <h2 className="text-2xl font-semibold mt-6">Activities Statistics</h2>
      <ActivityStats activities={studentData.activities} />
      <h2 className="text-2xl font-semibold mt-6">Demographics Chart</h2>
      <Chart activities={studentData.activities} />
    </div>
  );
}

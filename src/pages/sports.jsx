// SportsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const clubs = [
  { name: 'Basketball Club', image: 'resources/basketball.png', link: 'https://www.nba.com' },
  { name: 'Soccer Club', image: 'resources/soccer.png', link: 'https://www.fifa.com' },
  { name: 'Tennis Club', image: 'resources/tennis.png', link: 'https://www.atptour.com' },
  { name: 'Cricket Club', image: 'resources/cricket.png', link: 'https://www.icc-cricket.com' },
  { name: 'Badminton Club', image: 'resources/badminton.png', link: 'https://www.bwfbadminton.com' },
  { name: 'Swimming Club', image: 'resources/swimming.png', link: 'https://www.fina.org' },
  { name: 'Volleyball Club', image: 'resources/volleyball.png', link: 'https://www.fivb.com' },
  { name: 'Table Tennis Club', image: 'resources/tabletennis.png', link: 'https://www.ittf.com' },
  { name: 'Hockey Club', image: 'resources/hockey.png', link: 'https://www.iihf.com' },
  { name: 'Chess Club', image: 'resources/chess.png', link: 'https://www.chess.com' },
  { name: 'Gymnastics Club', image: 'resources/gymnastics.png', link: 'https://www.gymnastics.sport' },
];

const SportsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center mb-6"
      >
        ⬅ Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Sports Clubs</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {clubs.map((club, index) => (
          <ClubCard key={index} name={club.name} image={club.image} link={club.link} />
        ))}
      </div>
    </div>
  );
};

const ClubCard = ({ name, image, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="club-logo ">
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 p-4 flex flex-col items-center text-center ">
      <img src={image} alt={`${name} Logo`} className="h-full w-full mb-4 " />
      <p className="text-gray-700 font-semibold">{name}</p>
    </div>
  </a>
);

export default SportsPage;

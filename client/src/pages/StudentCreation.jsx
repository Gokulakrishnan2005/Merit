import React, { useState, useEffect } from 'react';
import { FaFileDownload, FaUserPlus, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentCreation() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listing/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleStudentClick = (_id) => {
    navigate(`/student/${_id}`);
  };

  // Filter the listings based on the search query
  const filteredListings = listings.filter(item => {
    const name = item.name?.toLowerCase() || '';
    const course = item.course?.toLowerCase() || '';
    const address = item.address?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    return name.includes(query) || course.includes(query) || address.includes(query);
  });

  return (
    <div className='mt-20 flex flex-col items-center'>
      {/* Centered Search Input */}
      <div className="flex items-center justify-center w-full mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='p-2 pl-10 border border-gray-300 rounded w-full hover:border-blue-400 transition-colors'
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {/* Search Input */}

        {/* First Box */}
        <div className='flex flex-col items-center w-80 h-40 bg-gradient-to-r from-white to-gray-200 m-2 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-col'>
            <div className='flex flex-col text-black items-center justify-center w-40 h-32 hover:text-blue-600 transition-colors'>
              <Link to={"/studentlisting"}>
                <FaUserPlus className='w-20 h-20' />
              </Link>
            </div>
            <div className='flex items-center justify-center'>
              <p className='font-semibold'>Add a new student</p>
            </div>
          </div>
        </div>

        {/* Second Box */}
        <div className='flex flex-col items-center w-80 h-40 bg-gradient-to-r from-white to-gray-200 m-2 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-col'>
            <div className='flex flex-col text-black items-center justify-center w-40 h-32 hover:text-blue-600 transition-colors'>
              <Link to={"/documents"}>
                <FaFileDownload className='w-20 h-20' />
              </Link>
            </div>
            <div className='flex items-center justify-center'>
              <p className='font-semibold'>View Documents</p>
            </div>
          </div>
        </div>

        {/* List of fetched students */}
        {filteredListings.map((item) => (
          <div
            key={item._id}
            className='flex flex-row items-center w-80 h-40 bg-white m-2 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'
            onClick={() => handleStudentClick(item._id)}
          >
            <div className='w-1/3 p-2 overflow-hidden'>
              <img 
                src={item.imageUrls || 'https://www.w3schools.com/w3images/avatar2.png'} 
                alt={`${item.name} image`} 
                className='w-36 h-28 rounded-xl object-cover' 
              />
            </div>

            <div className='w-2/3 p-2'>
              <p className='font-semibold text-gray-800'>Name: {item.name}</p>
              <p className='text-gray-600'>Course: {item.course}</p>
              <p className='text-gray-600'>Address: {item.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



import React, { useState, useEffect } from 'react';
import { MdDescription } from 'react-icons/md'; 

export default function StudentCreation() {
  const [listings, setListing] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/documents/getdocuments'); 
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className='mt-20'>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {/* List of fetched students */}
        {listings.map((item) => (
          <a
            key={item._id} // Moved key prop here
            href={item.url}
            download
            className=''
          >
            <div
              className='flex flex-row items-center w-80 h-40 bg-white m-2 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'
              onClick={() => handleStudentClick(item._id)}
            >
              <div className='flex flex-col items-center w-80 h-40 bg-gradient-to-r from-white to-gray-200 m-2 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'>
                <div className='flex flex-col'>
                  <div className='flex flex-col text-black items-center justify-center w-40 h-32 hover:text-blue-600 transition-colors'>
                    <MdDescription className='w-20 h-20' />
                  </div>
                  <div className='flex items-center justify-center'>
                    <p className='font-semibold'>{item.name}</p> 
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

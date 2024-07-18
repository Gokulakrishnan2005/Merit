import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

import dark_arrow from '../assets/dark-arrow.png';

export default function Hero() {

  return (
    <div className="w-full min-h-screen hero-background text-white flex items-center justify-center">
      <div className="text-center max-w-3xl">
      <h1 className="text-2xl font-semibold md:text-3xl sm:text-3xl">Education for a Brighter Future</h1>
        <p className="max-w-2xl mx-auto my-4 md:text-base md:my-6 sm:text-sm">Our Innovative Curriculum Empowers Students with the Knowledge, Skills, and Experiences to Thrive in a Rapidly Changing World!</p>
        <Link to='/studentlogin'>
        <button className="btn bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center" >
          Explore more 
          <img src={dark_arrow} alt="" className="ml-2"/>
        </button>
        </Link>
      </div>
    </div>
  );
};
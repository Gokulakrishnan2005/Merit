import React from 'react';
import '../index.css';
import program_1 from '../assets/program-1.png';
import program_2 from '../assets/program-2.png';
import program_3 from '../assets/program-3.png';
import program_icon_1 from '../assets/program-icon-1.png';
import program_icon_2 from '../assets/program-icon-2.png';
import program_icon_3 from '../assets/program-icon-3.png';

const Programs = () => {
  return (
    <div className="container">
    <div className="w-11/12 mx-auto my-20 gap-10 flex items-center justify-between flex-wrap lg:flex-nowrap">
      <div className="relative flex-basis-31 w-full lg:w-auto mb-5 lg:mb-0">
        <img src={program_1} alt="" className="w-full rounded-lg" />
        <div className="absolute inset-0 bg-[rgba(0,15,152,0.3)] flex flex-col items-center justify-center text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
          <img src={program_icon_1} alt="" className="w-15 mb-2" />
          <p>Graduation Degree</p>
        </div>
      </div>
      <div className="relative flex-basis-31 w-full lg:w-auto mb-5 lg:mb-0">
        <img src={program_2} alt="" className="w-full rounded-lg" />
        <div className="absolute inset-0 bg-[rgba(0,15,152,0.3)] flex flex-col items-center justify-center text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
          <img src={program_icon_2} alt="" className="w-15 mb-2" />
          <p>Masters Degree</p>
        </div>
      </div>
      <div className="relative flex-basis-31 w-full lg:w-auto mb-5 lg:mb-0">
        <img src={program_3} alt="" className="w-full rounded-lg" />
        <div className="absolute inset-0 bg-[rgba(0,15,152,0.3)] flex flex-col items-center justify-center text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
          <img src={program_icon_3} alt="" className="w-15 mb-2" />
          <p>Post Graduation</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Programs;

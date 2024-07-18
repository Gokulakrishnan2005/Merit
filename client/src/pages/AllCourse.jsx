import React from 'react'

export default function AllCourse() {
  return (
    <div>
        <div className='flex mt-20 flex-col items-center w-80 h-40 bg-gradient-to-r from-white to-gray-200 m-2 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-col'>
            <div className='flex flex-col text-black items-center justify-center w-80 rounded-xl h-32 hover:text-blue-600 transition-colors'>
              
                 <img src="https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" className='w-full h-full rounded-xl object-cover' /> 
              
            </div>
            <div className='flex items-center justify-center'>
              <p className='font-semibold from-white to-gray-200'>Add a new student</p>
            </div>
          </div>
        </div>
    </div>
  )
}

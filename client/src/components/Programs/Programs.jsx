import React from 'react'
import './Programs.css'
// import program_1 from '../../assets/program-1.png'
// import program_1 from 'https://firebasestorage.googleapis.com/v0/b/my-first-project-6eebf.appspot.com/o/school.jpg?alt=media&token=0fcbbadf-abc5-4e57-9bee-1dcf01d942e8'
import program_2 from '../../assets/program-2.png'
import program_3 from '../../assets/program-3.png'
import program_icon_1 from '../../assets/program-icon-1.png'
import program_icon_2 from '../../assets/program-icon-2.png'
import program_icon_3 from '../../assets/program-icon-3.png'

const Programs = () => {
  return (
    <div className='programs'>
      <div className="program">
        <img src="https://firebasestorage.googleapis.com/v0/b/my-first-project-6eebf.appspot.com/o/school.jpg?alt=media&token=0fcbbadf-abc5-4e57-9bee-1dcf01d942e8" alt="" />
        <div className="caption">
            <img src={program_icon_1} alt="" />
            <p>Higher School </p>
        </div>
      </div>
      <div className="program">
        <img src="https://firebasestorage.googleapis.com/v0/b/my-first-project-6eebf.appspot.com/o/college.jpg?alt=media&token=2ad202d7-85af-4602-8d8f-11a86d69847c" alt="" />
        <div className="caption">
            <img src={program_icon_2} alt="" />
            <p>UG Degree</p>
        </div>
      </div>
      <div className="program">
        <img src="https://firebasestorage.googleapis.com/v0/b/my-first-project-6eebf.appspot.com/o/polytechinic.jpg?alt=media&token=d4251eb3-d33e-4a63-949c-7738aba1bd90" alt="" />
        <div className="caption">
            <img src={program_icon_3} alt="" />
            <p>Polytechnic Graduation</p>
        </div>
      </div>
    </div>
  )
}

export default Programs

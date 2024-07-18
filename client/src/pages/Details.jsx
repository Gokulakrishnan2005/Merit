import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CircleBar from './CircleBar';

export default function Details() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const userScore = [3,4,5];
  const totalQuestions = [10,90,100];
  const subject = ['Cgpa', 'Attence', 'High'];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/listing/student/${id}`);
        const data = await res.json();
        console.log('API Response:', data);

        if (data) {
          setStudent(data); // This sets the student object in state
          console.log('Fetched Student:', data);
        } else {
          setError('Failed to fetch student details.');
          console.log('Error:', 'Failed to fetch student details.');
        }
      } catch (error) {
        setError('An error occurred while fetching student details.');
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/listing/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          alert('Student deleted successfully.');
          navigate('/studentcreation'); // Redirect to student creation page or any other appropriate page
        } else {
          alert('Failed to delete student.');
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('An error occurred while deleting the student.');
      }
    }
  };

  if (loading) {
    return <div>Loading student details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='container mx-auto mt-10 p-4 flex justify-center items-center min-h-screen'>
      {student ? (
        <div className='bg-blue-300 p-4 rounded-lg shadow-lg w-full max-w-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'>
          <div className="flex flex-col lg:flex-row items-center">
            <img
              src={student.imageUrls || 'https://www.w3schools.com/w3images/avatar2.png'}
              alt={`${student.name} image`}
              className="w-40 h-40 rounded-lg object-cover mb-4 lg:mb-0 lg:mr-8 shadow-lg"
            />
            <div className='flex-grow p-2 text-gray-800'>
              <h2 className='text-2xl font-bold mb-4'>{student.name}</h2>
              <p><strong>Address:</strong> {student.address}</p>
              <p><strong>Phone Number:</strong> <a href={`tel:${student.phoneNumber}`}>{student.phoneNumber}</a></p>
              <p><strong>Birthdate:</strong> {new Date(student.birthDate).toLocaleDateString()}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
              <p><strong>Course:</strong> {student.course}</p>
            </div>
          </div>
          <section className="quiz-section">
            <h2 className="text-2xl font-bold mb-4"> Performence </h2>
              <div className="result-box flex lg:flex-row flex-col">
                <CircleBar userScore={student.cgpa} totalQuestions={totalQuestions[0]} subject={subject[0]} />
                <CircleBar userScore={student.attence} totalQuestions={totalQuestions[1]} subject={subject[1]} />
                <CircleBar userScore={student.high} totalQuestions={totalQuestions[2]} subject={subject[2]} />
              </div>
            </section>
          <div className='flex justify-end space-x-4 mt-4'>
            <button
              onClick={handleDelete}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
            >
              Delete
            </button>
            <Link to={`/update/${student._id}`} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              Update
            </Link>
          </div>
        </div>
      ) : (
        <p>No student details available.</p>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase.js'; // Update this path as necessary
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    idNumber: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'male',
    address: '',
    course: '',
    imageUrls: '',
    cgpa: 0,
    attence: 0,
    high: 0
  });

  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const res = await fetch(`/api/listing/student/${id}`);
          const data = await res.json();
          if (data) {
            setFormData(data);
          }
        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      };

      fetchStudent();
    }
  }, [id]);

  const handleFileUpload = (file) => {
    setUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('File upload error:', error);
        setFileUploadError(true);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: downloadURL,
          }));
          setUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleIncrement = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: prevFormData[field] + 1
    }));
  };

  const handleDecrement = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: prevFormData[field] > 0 ? prevFormData[field] - 1 : 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (file) {
        await handleFileUpload(file);
      }

      const response = await fetch(`/api/listing/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/studentcreation');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="flex mt-10 items-center justify-center min-h-screen p-5 pt-10 bg-blue-100">
      <div className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <header className="text-3xl font-bold text-center text-gray-800">
          Update Student
        </header>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mt-4 space-x-6">
            <label htmlFor="image" className="relative cursor-pointer">
              <img
                src={formData.imageUrls || 'https://www.w3schools.com/w3images/avatar2.png'}
                alt="Profile"
                className=" w-40 h-40 rounded-lg object-cover mb-4 lg:mb-0 lg:mr-8 shadow-lg"
              />
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
                ref={fileRef}
              />
            </label>
            {uploading && filePerc > 0 && filePerc < 100 && (
              <div className="w-full mt-2">
                <div className="relative pt-1">
                  <div className="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                    <div
                      style={{ width: `${filePerc}%` }}
                      className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
      <label htmlFor="password" className="font-semibold text-gray-700">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg pr-10"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 rounded-lg"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
            <div className="flex flex-col">
              <label htmlFor="idNumber" className="font-semibold text-gray-700">
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthDate" className="font-semibold text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="font-semibold text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="font-semibold text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="course" className="font-semibold text-gray-700">
                Course
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
              </div>

            <div className="flex flex-wrap">
              {/* CGPA Input */}
              <div className="flex flex-col mr-4">
                <label htmlFor="cgpa" className="font-semibold text-gray-700">
                  CGPA
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Attendance Input */}
              <div className="flex flex-col mr-4">
                <label htmlFor="attence" className="font-semibold text-gray-700">
                  Attendance
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="attence"
                    name="attence"
                    value={formData.attence}
                    onChange={handleChange}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Height Input */}
              <div className="flex flex-col">
                <label htmlFor="high" className="font-semibold text-gray-700">
                  Height
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="high"
                    name="high"
                    value={formData.high}
                    onChange={handleChange}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>


          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            disabled={uploading}
          >
            {uploading ? 'Submitting...' : 'Update Student'}
          </button>
        </form>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect} from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase.js"; // Update this path as necessary
import { useNavigate } from "react-router-dom";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    idNumber: "",
    phoneNumber: "",
    birthDate: "",
    gender: "male",
    address: "",
    course: "",
    imageUrls: "", 
    cgpa: 0,
    attence: 0,
    high: 0
  });

  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("File upload error:", error);
        setFileUploadError(true);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: downloadURL, // Changed to a single string URL
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (file) {
        await handleFileUpload(file);
      }

      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Optionally reset form state after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
          idNumber: "",
          phoneNumber: "",
          birthDate: "",
          gender: "male",
          address: "",
          course: "",
          imageUrls: "", // Reset to empty string
        });
        setFile(null);
        navigate('/studentcreation') 
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  console.log(formData);

  return (
    <section className="flex items-center justify-center min-h-screen p-5 pt-10 bg-blue-100">
      <div className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <header className="text-3xl font-bold text-center text-gray-800">
          Registration Form
        </header>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="w-full mt-6">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              ref={fileRef}
              accept="application/image"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex items-center space-x-4">
              <img
                src={file ? URL.createObjectURL(file) : "https://www.w3schools.com/w3css/img_avatar.png"}
                alt="Preview"
                className="w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer hover:opacity-80"
                onClick={() => fileRef.current.click()}
              />
              <button
                type="button"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                onClick={() => fileRef.current.click()}
              >
                Change Image
              </button>
            </div>
            {uploading && (
              <div className="mt-2 text-sm text-gray-600">
                Uploading image: {filePerc}%
              </div>
            )}
            {fileUploadError && (
              <div className="mt-2 text-sm text-red-600">
                Error uploading image. Please try again.
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">ID Number</label>
            <input
              type="text"
              name="idNumber"
              placeholder="Enter ID number"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Gender</h3>
            <div className="flex items-center mt-2 space-x-8">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="check-male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="check-male" className="ml-2 text-gray-700 cursor-pointer">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="check-female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="check-female" className="ml-2 text-gray-700 cursor-pointer">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="check-other-male"
                  name="gender"
                  value="other-male"
                  checked={formData.gender === "other-male"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="check-other-male" className="ml-2 text-gray-700 cursor-pointer">
                  Other Male
                </label>
              </div>
            </div>
          </div>

            <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Course</h3>
            <div className="flex items-center mt-2 space-x-8">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="check1"
                  name="course"
                  value="B.A"
                  checked={formData.course === "B.A"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="check-male" className="ml-2 text-gray-700 cursor-pointer">
                  B.A
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="check2"
                  name="course"
                  value="B.Sc"
                  checked={formData.course === "B.Sc"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="check-female" className="ml-2 text-gray-700 cursor-pointer">
                  B.Sc
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="check3"
                  name="course"
                  value="B.Com"
                  checked={formData.course === "B.Com"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="check-other" className="ml-2 text-gray-700 cursor-pointer">
                  B.Com
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end mt-6">
            
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Submitting..." : "Submit"}
            </button>
           
          </div>
        </form>
      </div>
    </section>
  );
}


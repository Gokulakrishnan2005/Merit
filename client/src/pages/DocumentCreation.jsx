import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

export default function Documents() {
  const [file, setFile] = useState(null);
  const Navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfName, setPdfName] = useState(null); // State to hold PDF file name
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    subject: 'computer science',
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPdfName(selectedFile.name); // Set the PDF file name
      setFormData({ ...formData, name: selectedFile.name }); // Update formData with PDF name
    } else {
      setUploadError('Please upload a PDF file.');
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `pdfs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError(error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setUploadSuccess(true);

        // Update formData with the download URL
        const updatedFormData = { ...formData, url };

        // Send form data to the backend
        fetch('/api/documents/document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('PDF details saved:', data);
            Navigate('/documents');
          })
          .catch((error) => {
            console.error('Error saving PDF details:', error);
          });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (file) {
        await handleUpload();
      }
    } catch (error) {
      setUploadError('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mt-20 mx-auto shadow-md rounded-lg bg-gray-50">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Upload PDF
      </button>
      {uploadProgress > 0 && (
        <div className="relative w-full h-4 mt-4 bg-gray-200 rounded overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 rounded transition-all duration-500 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-white text-xs">{Math.round(uploadProgress)}%</span>
          </div>
        </div>
      )}
      {uploadSuccess && (
        <p className="text-green-500 mt-4">Upload successful!</p>
      )}
      {uploadError && (
        <p className="text-red-500 mt-4">Error: {uploadError}</p>
      )}
      <div className="mt-6 flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-white">
        <p className="font-bold text-lg mb-2">{pdfName}</p> {/* Display PDF file name */}
        {downloadURL && (
          <a
            href={downloadURL}
            download
            className=""
          >
            <img
              src="download-icon.png"
              alt="Download"
              className="w-6 h-6 mr-2"
            />
            download
          </a>
        )}
      </div>
    </div>
  );
}

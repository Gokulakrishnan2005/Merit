import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admission from './pages/Admission';
import StudentCreation from './pages/StudentCreation';
import Header from './components/Header';
import Signup from './pages/signup';
import PrivateRoute from './components/PrivateRoute';
import StudentListing from './pages/studentListing';
import Details from './pages/Details';
import StudentLogin from './pages/Studentlogin';
import StudentCheck from './components/StudentCheck';
import StudentDetails from './pages/StudentDetails';
import Documents from './pages/Documents';
import DocumentCreation from './pages/DocumentCreation';
import PublicDocuments from './pages/PublicDocuments';
import UpdateListing from './pages/UpdateListing';
import AllCourse from './pages/AllCourse';
import Course from './pages/Course';
import Applog from './App2';


const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Applog />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/publicdocuments" element={<PublicDocuments />} />
        <Route path="/allcourse" element={<AllCourse />} />
        <Route path="/course" element={<Course />} />
        <Route element={<PrivateRoute />}>
          <Route path="/studentcreation" element={<StudentCreation />} />
          <Route path="/studentlisting" element={<StudentListing />} />
          <Route path="/documentcreation" element={<DocumentCreation />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/student/:id" element={<Details />} />
          <Route path="/update/:id" element={<UpdateListing />} />
        </Route>
        <Route element={<StudentCheck />}>
          <Route path="/studentdetails" element={<StudentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';

// export default function StudentCheck() {
//     const {CurrentUser} = useSelector(state => state.user);
  
//     return CurrentUser ? <Outlet /> : <Navigate to="/studentlogin" />;
//   }

import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const StudentCheck = () => {
  const { CurrentUser } = useSelector((state) => state.user);

  return CurrentUser && CurrentUser.role == 'student' ? (
    <Outlet />
  ) : (
    <Navigate to="/studentlogin" />
  );
};

export default StudentCheck;

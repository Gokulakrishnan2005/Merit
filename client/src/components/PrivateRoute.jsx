// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';

// export default function PrivateRoute() {
//   const {CurrentUser} = useSelector(state => state.user);

//   return CurrentUser ? <Outlet /> : <Navigate to="/login" />;
// }


import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { CurrentUser } = useSelector((state) => state.user);

  return CurrentUser && CurrentUser.role === 'teacher' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;



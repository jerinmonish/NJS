import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn, decryptUserDataLocalStorage } from "../utils/helper";
import NotFound from "../frontend/components/NotFound";

const AdminRoutes = ({ component: Component, ...rest }) => {
  const udData = useSelector(state => state.userApi);

  const locData = JSON.parse(decryptUserDataLocalStorage());
  // return udData?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  if (udData?.isAuthenticated || locData?.token) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
  /*const udData = useSelector(state => state.userLogin);
  // const uddDate = (JSON.parse(udData?.userDetails)) ? JSON.parse(udData?.userDetails) : JSON.parse(localStorage.getItem('udata'));
  const uddDate = JSON.parse(decryptUserDataLocalStorage());
  if (uddDate?.data?.user_role === "ADMIN") {
    return <Routes><Route {...rest} render={(props) => ((isLoggedIn() || udData?.isAuthenticated) ? <Component {...props} /> : <Navigate to="/login" />)} /></Routes>;
  } else {
    <Routes><Route component={NotFound} /></Routes>
  }*/
};

export default AdminRoutes;
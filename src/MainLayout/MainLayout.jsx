import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { AuthContext } from "../Providers/AuthProviders";
import Loading from "../Components/Loading";

const MainLayout = () => {
  const {loading} = useContext(AuthContext)
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="flex flex-col min-h-screen font-custom">
      <div className="">
        <Header></Header>
      </div>
      <div className="flex-grow px-2 pb-4 mt-16 min-h-[1000px]">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;

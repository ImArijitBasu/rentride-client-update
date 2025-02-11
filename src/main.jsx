import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import ErrorPage from "./MainLayout/ErrorPage.jsx";
import AuthProviders from "./Providers/AuthProviders.jsx";
import AvailableCars from "./Pages/AvailableCars.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import MyCars from "./Pages/MyCars.jsx";
import AddCar from "./Pages/AddCar.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import Login from "./Pages/Auths/Login.jsx";
import SignUp from "./Pages/Auths/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import CarDetails from "./Components/CarDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-cars",
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: "/available-cars/:id",
        element: <CarDetails></CarDetails>,
        loader : ({params}) => fetch(`https://rentride-ecru.vercel.app/car/${params.id}`)
      },
      {
        path:"/my-cars",
        element:<PrivateRoute><MyCars></MyCars></PrivateRoute>
      },
      {
        path:"/add-car",
        element: <PrivateRoute><AddCar></AddCar></PrivateRoute>
      },
      {
        path:"/my-bookings",
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      }
    
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
      <Toaster/>
    </AuthProviders>
  </StrictMode>
);

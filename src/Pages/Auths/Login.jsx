import Lottie from "lottie-react";
import React, { useContext } from "react";
import loginLottie from "../../Lottie/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user, loading, signInUser, googleSignIn, setUser } =
    useContext(AuthContext);
  const handleSignIn = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;

    signInUser(email, password)
      .then((result) => {
        Swal.fire("logged in successfully");
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          Swal.fire("Authentication Failed", error.code);
        }
      });
  };
  const handleGoogle = () => {
    googleSignIn().then((result) => {
      navigate("/");
      Swal.fire(`Successfully logged in as ${result?.user?.displayName}`);
    });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col-reverse lg:flex-row">
        <div className="text-center lg:text-left max-w-[500px]">
          <Lottie animationData={loginLottie} />
        </div>
        <div className="card bg-base-100 w-56 md:w-full  max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div onClick={handleGoogle} className="btn text-3xl m-3 bg-blue-900"><FcGoogle /></div>
          <div className=" bg-yellow-500 text-center text-white py-3 font-bold">
            New User ? <Link className=" text-blue-900" to={'/register'}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

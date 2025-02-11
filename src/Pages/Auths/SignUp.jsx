import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Lottie from 'lottie-react';
import loginLottie from "../../Lottie/login.json"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
const SignUp = () => {
    const navigate = useNavigate();
    const [error , setError] = useState();
    const {user,
        signUpUser,
        manageProfile,} = useContext(AuthContext);
    const handleSignUp = (e) => {
        e.preventDefault();
        setError("");
        const name = e.target.name.value;
        const image = e.target.image.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (password.length < 6) {
          toast.error("Password must contain at least 6 characters");
          return;
        }
        if (!/[a-z]/.test(password)) {
          toast.error("Password must contain at least one lowercase letter");
          return;
        }
        if (!/[A-Z]/.test(password)) {
          toast.error("Password must contain at least one uppercase letter");
          return;
        }
        signUpUser(email , password)
        .then((res)=>{
            Swal.fire('successful');
            navigate('/')
            return manageProfile(name , image);
        })
        
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col-reverse lg:flex-row">
          <div className="text-center lg:text-left max-w-[500px]">
            <Lottie animationData={loginLottie} />
          </div>
          <div className="card bg-base-100 w-56 md:w-full  max-w-sm shrink-0 shadow-2xl">
            <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
            <form onSubmit={handleSignUp} className="card-body p-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo url"
                  className="input input-bordered"
                  name="image"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignUp;
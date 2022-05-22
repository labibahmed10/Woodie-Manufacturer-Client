import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import image from "../images/banner6.webp";
import SocialSIgnIn from "./SocialSIgnIn";
import Spinner from "../Spinner/Spinner";

const LogIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <section style={{ backgroundImage: `url(${image})` }} className=" px-5 bg-cover bg-no-repeat h-screen">
      <div>
        <div class="card shadow-xl max-w-md bg-base-100 mx-auto lg:mt-32 my-10">
          <div class="card-body">
            <img className="lg:w-48 w-24 mx-auto" src={logo} alt="" />
            <h1 className="text-center text-2xl lg:text-3xl font-bold pb-3">Login With</h1>

            {/* social login page here */}
            <SocialSIgnIn></SocialSIgnIn>

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
              <div class="form-control">
                <input
                  type="text"
                  placeholder="email"
                  class="input input-bordered"
                  {...register("email", { required: true })}
                />

                {errors.email?.type === "required" && (
                  <span className="text-red-500 text-sm mt-1">Please provide your email</span>
                )}
              </div>
              <div class="form-control">
                <input
                  type="text"
                  placeholder="password"
                  class="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500 text-sm mt-1">Please provide your password</span>
                )}

                <label class="label">
                  <Link to="/signup" class="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              {/* showed error message here */}
              {error && <span className="text-red-500 text-sm">{error?.message}</span>}

              <div class="form-control mt-4">
                <button class="btn btn-primary">Login</button>
              </div>

              <p className="text-center text-sm lg:text-lg">
                Don't have and account?{" "}
                <Link className="text-primary hover:underline" to="/signup">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;

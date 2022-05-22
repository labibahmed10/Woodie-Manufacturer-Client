import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

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
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <section className=" mt-32 px-5">
      <div>
        <div class="card shadow-xl max-w-md bg-base-100 mx-auto">
          <div class="card-body">
            <img className="w-48 mx-auto" src={logo} alt="" />
            <h1 className="text-center text-3xl font-bold pb-3">Login With</h1>

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
              <div class="form-control">
                <input
                  type="text"
                  placeholder="email"
                  class="input input-bordered"
                  {...register("email", { required: true })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="text-red-500">Please provide your email</span>
                  )}
                </label>
              </div>
              <div class="form-control">
                <input
                  type="text"
                  placeholder="password"
                  class="input input-bordered"
                  {...register("password", { required: true })}
                />

                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="text-red-500">Please provide your password</span>
                  )}
                </label>

                <label class="label">
                  <Link to="/signup" class="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div class="form-control mt-4">
                <button class="btn btn-primary">Login</button>
              </div>

              <p className="text-center">
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

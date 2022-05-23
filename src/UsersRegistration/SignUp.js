import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import image from "../images/banner4.webp";
import SocialSIgnIn from "./SocialSIgnIn";
import Spinner from "../Spinner/Spinner";
import UseToken from "../CustomHooks/UseToken";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: true,
  });
  const [updateProfile, updating, Uerror] = useUpdateProfile(auth);

  // custom hook has been made
  const [token] = UseToken(user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name } = data;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (loading || updating) {
    return <Spinner></Spinner>;
  }

  return (
    <section style={{ backgroundImage: `url(${image})` }} className="px-5 bg-cover bg-no-repeat h-screen">
      <div>
        <div class="lg:mt-32 my-10 card shadow-2xl max-w-md bg-base-100 mx-auto">
          <div class="card-body">
            <img className="lg:w-48 w-24 mx-auto" src={logo} alt="" />
            <h1 className="text-center text-2xl lg:text-3xl font-bold mb-3">Create an Account</h1>

            {/* social login page here */}
            <SocialSIgnIn></SocialSIgnIn>

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
              <div class="form-control">
                <input
                  type="text"
                  placeholder="Your Name"
                  class="input input-bordered"
                  {...register("name", { required: true })}
                />

                {errors.name?.type === "required" && (
                  <span className="text-red-500 text-sm mt-1">Please provide your name</span>
                )}
              </div>

              <div class="form-control">
                <input
                  type="email"
                  placeholder="email"
                  class="input input-bordered"
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />

                {errors.email?.type === "required" && (
                  <span className="text-red-500 text-sm mt-1">Please provide valid email</span>
                )}
                {errors.email?.type === "pattern" && <span className="text-red-500">Please include @ .</span>}
              </div>

              <div class="form-control">
                <input
                  type="text"
                  placeholder="password"
                  class="input input-bordered"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  })}
                />

                {errors.password?.type === "required" && (
                  <span className="text-red-500 text-sm mt-1">Please provide password</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 text-sm mt-1">
                    Password must contain a number and one capital letter
                  </span>
                )}
              </div>

              {/* showed error message here */}
              {error && <span className="text-red-500 text-sm">{error?.message}</span>}

              <div class="form-control my-4">
                <button class="btn btn-primary">Signup</button>
              </div>

              <p className="text-center text-sm lg:text-lg">
                Already have an account?{" "}
                <Link className="text-primary hover:underline" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

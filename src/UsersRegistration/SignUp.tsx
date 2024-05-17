import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import SocialSIgnIn from "./SocialSIgnIn";
import Spinner from "../Spinner/Spinner";
import UseToken from "../CustomHooks/UseToken";

interface DATA {
  email: string;
  password: string;
  name: string;
}

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: true,
  });
  const [updateProfile, updating, Uerror] = useUpdateProfile(auth);

  // custom hook has been made for token issue
  const [token] = UseToken(user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DATA>();

  const onSubmit = async (data: DATA) => {
    const { email, password, name } = data;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate, updateProfile]);

  if (loading || updating) {
    return <Spinner></Spinner>;
  }

  return (
    <section style={{ backgroundImage: `url('https://i.postimg.cc/V68pVgwz/banner6.webp')` }} className="px-5 bg-cover bg-no-repeat h-screen">
      <div>
        <div className="lg:mt-32 my-10 card shadow-2xl max-w-md bg-base-100 mx-auto">
          <div className="card-body">
            <img className="lg:w-48 w-24 mx-auto" src="https://i.postimg.cc/JhfM4jWF/logo.png" alt="" />
            <h1 className="text-center text-2xl lg:text-3xl font-bold mb-3">Create an Account</h1>

            {/* social login page here */}
            <SocialSIgnIn></SocialSIgnIn>

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
              <div className="form-control">
                <input type="text" placeholder="Your Name" className="input input-bordered" {...register("name", { required: true })} />

                {errors.name?.type === "required" && <span className="text-red-500 text-sm mt-1">Please provide your name</span>}
              </div>

              <div className="form-control">
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />

                {errors.email?.type === "required" && <span className="text-red-500 text-sm mt-1">Please provide valid email</span>}
                {errors.email?.type === "pattern" && <span className="text-red-500">Please include @ .</span>}
              </div>

              <div className="form-control">
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  })}
                />

                {errors.password?.type === "required" && <span className="text-red-500 text-sm mt-1">Please provide password</span>}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 text-sm mt-1">Password must 8 characters with a number and one capital letter</span>
                )}
              </div>

              {/* showed error message here */}
              {(error || Uerror) && <span className="text-red-500 text-sm">{error?.message}</span>}

              <div className="form-control my-4">
                <button className="btn btn-primary">Signup</button>
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

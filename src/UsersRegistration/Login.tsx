import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import SocialSIgnIn from "./SocialSIgnIn";
import Spinner from "../Spinner/Spinner";
import UseToken from "../CustomHooks/UseToken";
import { toast } from "react-toastify";

interface DATA {
  email: string;
  password: string;
}

const LogIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [userEmail, setUserEmail] = useState("");

  // custom hook has been made
  const [token] = UseToken(user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DATA>();

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const onSubmit = (data: DATA) => {
    const { email, password } = data;
    setUserEmail(email);
    signInWithEmailAndPassword(email, password);
  };

  if (loading || sending) {
    return <Spinner></Spinner>;
  }

  const sendPassResetEmail = async () => {
    const email = userEmail;
    if (!email) {
      return toast("Please Input Email", {
        autoClose: 2500,
      });
    }
    await sendPasswordResetEmail(email);
    toast("Check Your Email to Reset Password", {
      autoClose: 2000,
    });
  };

  return (
    <section
      style={{
        backgroundImage: `url('https://i.postimg.cc/W4rx8KQ9/banner4.webp')`,
      }}
      className=" px-5 bg-cover bg-no-repeat h-screen"
    >
      <div>
        <div className="card shadow-xl max-w-md bg-base-100 mx-auto lg:mt-32 my-10">
          <div className="card-body">
            <img className="lg:w-48 w-24 mx-auto" src="https://i.postimg.cc/JhfM4jWF/logo.png" alt="" />
            <h1 className="text-center text-2xl lg:text-3xl font-bold pb-3">Login With</h1>

            {/* social login page here */}
            <SocialSIgnIn></SocialSIgnIn>

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
              <div className="form-control">
                <input type="text" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                {errors.email?.type === "required" && <span className="text-red-500 text-sm mt-1">Please provide your email</span>}
              </div>

              <div className="form-control">
                <input type="text" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                {errors.password?.type === "required" && <span className="text-red-500 text-sm mt-1">Please provide your password</span>}
                <label className="label">
                  <button onClick={sendPassResetEmail} className="label-text-alt link link-hover">
                    Forgot password?
                  </button>
                </label>
              </div>
              {/* showed error message here */}
              {error && <span className="text-red-500 text-sm">{error?.message}</span>}

              <div className="form-control mt-4">
                <button className="btn btn-primary">Login</button>
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

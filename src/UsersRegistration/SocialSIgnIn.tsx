import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import UseToken from "../CustomHooks/UseToken";
import auth from "../firebase.init";
import Spinner from "../Spinner/Spinner";

const SocialSIgnIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // custom hook has been made
  const [token] = UseToken(user);

  console.log(token);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div className="pt-3">
        <button
          onClick={() => signInWithGoogle()}
          className="flex justify-center items-center gap-2 border border-black w-full py-2 rounded-2xl mb-4"
        >
          <img
            className="w-8"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt=""
          />
          Continue With Google
        </button>
      </div>

      <div className="divider">OR</div>
    </div>
  );
};

export default SocialSIgnIn;

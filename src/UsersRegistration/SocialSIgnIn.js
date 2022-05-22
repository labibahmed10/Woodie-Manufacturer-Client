import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Spinner from "../Spinner/Spinner";

const SocialSIgnIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div class="pt-3">
        <button
          onClick={() => signInWithGoogle()}
          class="flex justify-center items-center gap-2 border border-black w-full py-2 rounded-2xl mb-4"
        >
          <img
            className="w-8"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt=""
          />
          Continue With Google
        </button>
      </div>

      <div class="divider">OR</div>
    </div>
  );
};

export default SocialSIgnIn;

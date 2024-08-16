import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notAllowedMessage, setNotAllowedMessage] = useState(""); // State for storing the not-allowed message

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      // Check if the user is an admin
      if (data.isAdmin) {
        dispatch(signInSuccess(data));
        navigate("/comments");
      } else {
        setNotAllowedMessage(
          "You are not allowed to see this page. This page is only for admin users."
        );
        dispatch(signInFailure("Unauthorized access"));
      }
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full"
      >
        Continue with Google
      </button>
      {notAllowedMessage && (
        <p className="text-red-500 mt-5">{notAllowedMessage}</p>
      )}
    </div>
  );
}

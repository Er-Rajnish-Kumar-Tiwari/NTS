import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {collection,addDoc,Timestamp} from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        //Added
        /* Invalid implementation:-
         await createUserWithEmailAndPassword(auth, email, pass);
         */
        const users = await createUserWithEmailAndPassword(auth, email, pass);
        const user = {
          uid: users.user.uid,
          email: users.user.email,
          time : Timestamp.now()
      }
      const userRef = collection(db, "users")
              await addDoc(userRef, user);
              alert("Account created!");
              setEmail("");
              setPass("");
        // alert("Account created!");
        //Till here
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
      }
      navigate("/");
     } 
     /* Discarded Catch
     catch (err) {
      alert(err.message);
    }*/

    //Updated Catch:
    catch (err) {
      console.error("Authentication error:", err);
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        alert("Account not found. Please create an account first.");
        setIsSignup(true); 
      } else if (err.code === 'auth/wrong-password') {
        alert("Incorrect password. Please try again.");
      } else if (err.code === 'auth/email-already-in-use') {
        alert("Account already exists. Please login instead.");
        setIsSignup(false); 
      } else if (err.code === 'auth/weak-password') {
        alert("Password should be at least 6 characters long.");
      } else if (err.code === 'auth/invalid-email') {
        alert("Please enter a valid email address.");
      } else {
        alert("Error: " + err.message);
      }
    }
    //Ends Here
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      //Added
     const result= await signInWithPopup(auth, provider);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: Timestamp.now()
      };
      
      const userRef = collection(db, "users");
      await addDoc(userRef, user);
      //Till here
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-orange-600">
          {isSignup ? "Create an Account" : "Login to Kaamigo"}
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          type="email"
        />
        <input
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white px-4 py-2 w-full rounded hover:bg-orange-600"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm mt-4 text-blue-500 text-center cursor-pointer"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Create one"}
        </p>

        <div className="my-4 text-center text-sm text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border px-4 py-2 w-full rounded hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

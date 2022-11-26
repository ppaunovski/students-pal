import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateOnlineStatus = async (isOnline, email) => {
    await updateDoc(doc(db, "users", `${email}`), {
      isOnline: isOnline,
    });
    await setDoc(doc(db, "onlineUsers", `${email}`), {
      isOnline: true,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      updateOnlineStatus(true, emailRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to sign in!");
    }

    setLoading(false);
  }

  return (
    <section className="bg-[#ddd] relative w-screen h-screen grid justify-center items-center">
      <div className="bg-[#eee] sm:max-w-[500px] max-w-[400px] border-gray-300 border-solid border-2 p-5 m-5">
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="text-center mb-4 text-2xl font-semibold">Sign In</h2>

        <input
          className="border-solid border-2 border-gray-500 p-2 w-full mt-2 "
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        ></input>
        <input
          className="border-solid mb-2 border-2 border-gray-500 p-2 w-full mt-2"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        ></input>
        <Link className="text-blue-500" to="/forgot-password">
          Forgot password?
        </Link>

        <div className="mx-auto w-full mt-4 grid justify-center items-center">
          <button
            onClick={handleSubmit}
            className="mx-auto bg-[#522d80] px-4 py-2 rounded-lg  text-white mb-4"
          >
            Sign In
          </button>
          <p>
            Dont have an Account?{" "}
            <Link className="text-blue-500" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;

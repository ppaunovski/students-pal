import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        nameRef.current.value,
        surnameRef.current.value,
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch {
      setError("Failed to create an account!");
    }

    setLoading(false);
  }

  return (
    <section className="bg-[#ddd] relative w-screen h-screen grid justify-center items-center">
      <div className="bg-[#eee] sm:max-w-[500px] max-w-[400px] border-gray-300 border-solid border-2 p-5 m-5">
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="text-center mb-4 text-2xl font-semibold">Sign Up</h2>
        {/* Name Surname section */}
        <div className="flex justify-between w-full sm:flex-row flex-col">
          <input
            className="border-solid border-2 border-gray-500 p-2 mt-2 sm:mt-0 sm:w-[48%]"
            type="text"
            placeholder="Name"
            required
            ref={nameRef}
          ></input>
          <input
            className="border-solid border-2 border-gray-500 p-2 mt-2 sm:mt-0 sm:w-[48%] "
            type="text"
            placeholder="Surname"
            required
            ref={surnameRef}
          ></input>
        </div>
        <input
          className="border-solid border-2 border-gray-500 p-2 w-full mt-2 "
          type="text"
          placeholder="Username"
          ref={usernameRef}
        ></input>
        <input
          className="border-solid border-2 border-gray-500 p-2 w-full mt-2 "
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        ></input>
        <input
          className="border-solid border-2 border-gray-500 p-2 w-full mt-2"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        ></input>
        <input
          className="border-solid border-2 border-gray-500 p-2 w-full mt-2"
          type="password"
          placeholder="Confirm Password"
          ref={passwordConfirmRef}
          required
        ></input>
        <div className="mx-auto w-full grid justify-center items-center mt-4">
          <button
            onClick={handleSubmit}
            className="mx-auto bg-[#522d80] px-4 py-2 rounded-lg  text-white mb-4"
          >
            Register
          </button>
          <p>
            Already have an Account?{" "}
            <Link className="text-blue-500" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;

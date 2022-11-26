import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your indox for further information!");
    } catch {
      setError("Failed to reset password!");
    }

    setLoading(false);
  }

  // return (
  //   <>
  //     <div
  //       style={{
  //         display: "grid",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         width: "100vw",
  //         height: "100vh",
  //       }}
  //     >
  //       <Card style={{ width: "400px", margin: "0 auto" }}>
  //         <Card.Body>
  //           <h2 className="text-center mb-4">Reset Password</h2>
  //           {error && <Alert variant="danger">{error}</Alert>}
  //           {message && <Alert variant="success">{message}</Alert>}
  //           <Form onSubmit={handleSubmit}>
  //             <Form.Group id="email">
  //               <Form.Label>Email</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 ref={emailRef}
  //                 required
  //               ></Form.Control>
  //             </Form.Group>

  //             <Button disabled={loading} className="w-100 mt-3" type="submit">
  //               Reset Password
  //             </Button>
  //           </Form>
  //           <div className="w-100 text-center mt-3">
  //             <Link to="/login">Log In</Link>
  //           </div>
  //         </Card.Body>
  //         <Card.Footer>
  //           <div className="w-100 text-center">
  //             Need an account? <Link to="/signup">Sign Up</Link>
  //           </div>
  //         </Card.Footer>
  //       </Card>
  //     </div>
  //   </>
  // );
  return (
    <section className="bg-[#ddd] relative w-screen h-screen grid justify-center items-center">
      <div className="bg-[#eee] sm:min-w-[500px] min-w-[400px] border-gray-300 border-solid border-2 p-5 m-5">
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <h2 className="text-center mb-4 text-2xl font-semibold">
          Reset Password
        </h2>

        <input
          className="border-solid border-2 border-gray-500 p-2 w-full mt-2 "
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        ></input>

        <Link className="text-blue-500" to="/login">
          Cancel
        </Link>

        <div className="mx-auto w-full mt-4 grid justify-center items-center">
          <button
            onClick={handleSubmit}
            className="mx-auto bg-[#522d80] px-4 py-2 rounded-lg  text-white mb-4"
          >
            Reset Password
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

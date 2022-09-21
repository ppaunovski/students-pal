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
    <>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Card style={{ width: "400px", margin: "0 auto" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="w-100 text-center ">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Login;

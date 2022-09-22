import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadPic, setUploadPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loadingPP, setLoadingPP] = useState(false);
  const navigate = useNavigate();

  const userRef = doc(db, "users", `${currentUser.email}`);

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    const promises = [];
    setError("");
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const uploadProfilePic = async () => {
    setLoadingPP(true);
    if (uploadPic === null) return;

    const profilePicRef = ref(
      storage,
      `Profile pictures/${currentUser.email}/${currentUser.email}`
    );
    uploadBytes(profilePicRef, uploadPic).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfilePic(url);
        console.log("done");
        setLoadingPP(false);
      });
    });

    await updateDoc(userRef, {
      ppurl: profilePic,
    });
  };

  useEffect(() => {
    if (profilePic === null) return;
    const updateUser = async () => {
      await updateDoc(userRef, {
        ppurl: profilePic,
      });
    };
    updateUser();
  }, [profilePic]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 78px)",
        }}
      >
        <Card style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Profile picture</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setUploadPic(e.target.files[0]);
                  }}
                  type="file"
                  accept="image"
                ></Form.Control>
                <Button disabled={loadingPP} onClick={uploadProfilePic}>
                  Upload
                </Button>
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  //defaultValue={currentUser.email}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loading && loadingPP}
                className="w-100 mt-3"
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Link
              to={`/profile/${currentUser.email}`}
              state={{ profile: currentUser.email }}
            >
              <p style={{ textAlign: "center" }}>Cancel</p>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default UpdateProfile;

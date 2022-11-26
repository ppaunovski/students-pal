import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, setDoc } from "firebase/firestore";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const semesterRef = useRef();
  const ageRef = useRef();
  const nicknameRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

    const updateInfo = async () => {
      if (nameRef.current.value !== "") {
        await updateDoc(userRef, {
          name: nameRef.current.value,
        });
      }

      if (surnameRef.current.value !== "") {
        await updateDoc(userRef, {
          surname: surnameRef.current.value,
        });
      }

      if (ageRef.current.value !== "") {
        await updateDoc(userRef, {
          age: ageRef.current.value,
        });
      }

      if (semesterRef.current.value !== "") {
        await updateDoc(userRef, {
          semester: semesterRef.current.value,
        });
      }
    };

    updateInfo();

    Promise.all(promises)
      .then(() => {
        setSuccess("Successful update");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    uploadProfilePic();
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
      <div className="bg-[#ddd] h-screen">
        <Navbar />
        {/* <div
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
                  placeholder="Leave blank to keep the same"
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
      </div> */}

        <div className="h-[90vh] w-full grid justify-center items-center">
          <div className="w-[400px] sm:max-w-[500px]  bg-white">
            <h2 className="text-center p-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <div className="m-2 w-full h-14 flex items-center justify-center">
              <input
                className="w-5/6"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setUploadPic(e.target.files[0]);
                }}
              ></input>
            </div>
            <div className="mt-4 group relative w-full h-14 flex items-center justify-center">
              <label className="absolute -top-5 left-10 text-deepPurple">
                Email
              </label>
              <input
                label="Email"
                className="w-5/6 p-2 border-solid border-2 border-deepPurple"
                type="email"
                ref={emailRef}
                placeholder="Leave blank to keep the same"
              ></input>
            </div>
            <div className="mt-4 group relative w-full h-14 flex items-center justify-center">
              <label className="absolute -top-5 left-10 text-deepPurple">
                Password
              </label>
              <input
                className="w-5/6 p-2 border-solid border-2 border-deepPurple"
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></input>
            </div>
            <div className="mt-4 group relative w-full h-14 flex items-center justify-center">
              <label className="absolute -top-5 left-10 text-deepPurple">
                Password Confirmation
              </label>
              <input
                className="w-5/6 p-2 border-solid border-2 border-deepPurple"
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              ></input>
            </div>
            <div className="mt-4 group relative w-full h-14 flex justify-around">
              <div className="w-5/6 flex gap-3">
                <div className="w-full relative">
                  <label className="absolute -top-6 left-2 text-deepPurple">
                    Name
                  </label>
                  <input
                    className="w-full p-2 border-solid border-2 border-deepPurple"
                    type="text"
                    ref={nameRef}
                    placeholder="Leave blank to keep the same"
                  ></input>
                </div>
                <div className="w-full relative">
                  <label className="absolute -top-6 left-2 text-deepPurple">
                    Surname
                  </label>
                  <input
                    className="w-full p-2 border-solid border-2 border-deepPurple"
                    type="text"
                    ref={surnameRef}
                    placeholder="Leave blank to keep the same"
                  ></input>
                </div>
              </div>
            </div>
            <div className="mt-4 group relative w-full h-14 flex justify-around">
              <div className="w-5/6 flex gap-3">
                <div className="w-full relative">
                  <label className="absolute -top-6 left-2 text-deepPurple">
                    Age
                  </label>
                  <input type="number" min="18" max="100" ref={ageRef}></input>
                </div>
                <div className="w-full relative">
                  <label className="absolute -top-6 left-2 text-deepPurple">
                    Semester
                  </label>
                  <select ref={semesterRef}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                disabled={loading && loadingPP}
                //className="w-100 mt-3"
                className="mx-auto bg-[#522d80] px-4 py-2 rounded-lg  text-white mb-2 mt-0"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
            <div>
              <Link
                to={`/profile/${currentUser.email}`}
                state={{ profile: currentUser.email }}
              >
                <p style={{ textAlign: "center" }}>Cancel</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;

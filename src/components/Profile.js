import React, { useState, useEffect } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Avatar, Box } from "@mui/material";

export default function Profile() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState({});
  const [name, setName] = useState({});
  const [surname, setSurname] = useState({});
  const [age, setAge] = useState({});
  const [semester, setSemester] = useState({});
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const updateOnlineStatus = async (isOnline, email) => {
    await updateDoc(doc(db, "users", `${email}`), {
      isOnline: isOnline,
    });
    await deleteDoc(doc(db, "onlineUsers", `${email}`));
  };

  async function handleLogout() {
    setError("");

    try {
      const email = currentUser.email;
      await logout(currentUser.email);
      updateOnlineStatus(true, email);
      navigate("/login");
    } catch {
      setError("Failed to Log Out!");
    }
  }

  useEffect(() => {
    const getInfo = async () => {
      const info = await getDoc(doc(db, "users", `${id}`));

      setProfilePicture(info.data());
      setName(info.data());
      setSurname(info.data());
      setAge(info.data());
      setSemester(info.data());
    };

    getInfo();
  }, []);

  return (
    <div className="bg-[#ddd] h-screen">
      <Navbar></Navbar>
      {/* <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 78px)",
        }}
      >
        <Card
          style={{
            width: "400px",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <div style={{ display: "grid", justifyContent: "center" }}>
              <Avatar
                sx={{ height: "78px", width: "78px" }}
                src={profilePicture.ppurl}
              ></Avatar>
            </div>

            <strong>Email: </strong>
            {id}
            {currentUser.email === id ? (
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            ) : (
              <Link
                to={`/messenger/${currentUser.email}/${id}`}
                state={{ sender: currentUser.email, recipient: id }}
                className="btn btn-primary w-100 mt-3"
              >
                Message
              </Link>
            )}
          </Card.Body>
          <Card.Footer>
            {currentUser.email === id ? (
              <div style={{ textAlign: "center" }}>
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Card.Footer>
        </Card>
      </Box> */}
      <div className="h-[90vh] w-full grid justify-center items-center">
        <div className="w-[400px] sm:max-w-[500px]  bg-white">
          <h2 className="text-center p-4">Profile</h2>
          <div className="mx-auto rounded-full w-20 h-20 border-2 border-solid border-deepPurple flex items-center justify-center">
            <img className="rounded-full" src={profilePicture.ppurl}></img>
          </div>

          <div className="p-4">
            <strong>Name: </strong>
            {name.name}
            <br />
            <strong>Surname: </strong>
            {surname.surname}
            <br />
            <strong>Email: </strong>
            {id}
            <br />
            <strong>Age: </strong>
            {age.age}
            <br />
            <strong>Semester: </strong>
            {semester.semester}
            <br />
          </div>
          <div className="flex justify-center">
            {currentUser.email === id ? (
              <Link to="/update-profile">
                <button className="mx-auto bg-[#522d80] px-4 py-2 rounded-lg  text-white mb-4">
                  Update Profile
                </button>
              </Link>
            ) : (
              <Link to={`/messenger/${currentUser.email}/${id}`}>
                <button className="mx-auto bg-[#522d80] px-4 py-2 rounded-lg  text-white mb-4">
                  Message
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

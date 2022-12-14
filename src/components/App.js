import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import LoggedInRoute from "./LoggedInRoute";
import Profile from "./Profile";
import Forum from "./Forum";
import Semesters from "./Semesters";
import Semester from "./Semester";
import SubjectPage from "./SubjectPage";
import Chat from "./Chat";
import Messenger from "./Messenger";
import "../index.css";
import LandingPage from "./LandingPage";
function App() {
  return (
    <>
      <div>
        <Router basename={`/${process.env.PUBLIC_URL}`}>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  //<PrivateRoute>
                  <LandingPage />
                  //</PrivateRoute>
                }
              />
              <Route
                path="/forum"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile/:id/message"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />

              <Route
                path="/messenger/:id"
                element={
                  <PrivateRoute>
                    <Messenger />
                  </PrivateRoute>
                }
              />

              <Route
                path="/messenger/:id/:id"
                element={
                  <PrivateRoute>
                    <Messenger />
                  </PrivateRoute>
                }
              />

              <Route
                path="/forum"
                element={
                  <PrivateRoute>
                    <Forum />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters"
                element={
                  <PrivateRoute>
                    <Semesters />
                  </PrivateRoute>
                }
              />

              <Route
                path="/semesters/semester/:id"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />

              <Route
                path={"/semesters/semester/:id/subject/:id"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <LoggedInRoute>
                    <Signup />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <LoggedInRoute>
                    <Login />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <LoggedInRoute>
                    <ForgotPassword />
                  </LoggedInRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;

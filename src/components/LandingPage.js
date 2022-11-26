import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";

function LandingPage() {
  const { currentUser } = useAuth();
  return (
    <div className=" w-screen bg-[#ddd] sm:h-screen ">
      <header>{currentUser && <Navbar />}</header>
      <section className=" w-screen p-8 min-h-[300px] bg-[#522d80] text-gray-200 grid justify-center items-center">
        <div className="max-w-[70vw] ">
          <h1 className="text-3xl">Welcome to FINKI Student's Pal</h1>
          <h3 className="text-xl">
            Student's Pal is a web application made for excanging materials,
            experiance and knowldge between students.
          </h3>
          <br></br>
          <p className="text-md">Join us and be a FINKI Student's Pal!</p>
          <br></br>
          <div>
            {currentUser === null ? (
              <button className="px-3 py-2 bg-[#ffe135] font-semibold text-[#522d80] rounded-full">
                <Link
                  className="text-decoration-none text-[#522d80] "
                  to="/login"
                >
                  Join Us
                </Link>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <section className="grid justify-center items-center w-screen">
        <div className="max-w-[70vw] mt-4 mb-4 sm:max-w-[90vw] lg:max-w-[70vw] flex flex-col sm:flex-row justify-evenly gap-4">
          <Card>
            <CardHeader title="Sharing"></CardHeader>
            <CardContent>
              <p>
                We live by the principle of sharing. Share your knowledge,
                toughts, and feelings with the other students.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Helping"></CardHeader>
            <CardContent>
              <p>
                Post your inventive solutions and creative notes to help a
                fellow student, or post your impossible problem and let others
                help you solve it!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Friendship"></CardHeader>
            <CardContent>
              <p>
                Make new friends, chat with them, or shere some memes! We love
                to connect people!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

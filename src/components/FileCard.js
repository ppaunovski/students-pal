import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import VerticalOptionsButton from "./VerticalOptionsButton";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function FileCard({ file, subject }) {
  const { currentUser } = useAuth();
  return (
    <a href={file.url} target="_blank" className="no-underline text-white">
      <div className=" bg-white group relative w-56 h-64 m-2 rounded-md flex flex-col items-center">
        <div className="absolute z-10 w-full h-full opacity-[0%] bg-black transition-all duration-150 ease-in-out group-hover:opacity-[10%] group-target:opacity-[10%] group-focus:opacity-[10%] "></div>
        <div className="z-50  bg-lightPurple relative w-56 h-14 flex gap-2 px-2 items-center justify-between group">
          <div className="flex gap-2 max-w-56 overflow-hidden">
            <span className="text-white">
              {file.fileName.endsWith(".pdf") ? (
                <PictureAsPdfIcon />
              ) : file.fileName.endsWith(".mp4") ? (
                <VideoFileIcon />
              ) : (
                <InsertPhotoIcon />
              )}
            </span>
            <span className=" text-white text-ellipsis whitespace-nowrap  overflow-x-hidden">
              {file.fileName}
            </span>
          </div>
          <div>
            {currentUser.email === file.author ? (
              <VerticalOptionsButton
                key={file.fileId}
                calledFrom={"subjectFileCard"}
                file={file}
                subject={subject}
              />
            ) : (
              ""
            )}
          </div>
          <p className="absolute z-100 opacity-[0%] bg-gray-400 top-[-15px] left-0 p-1 transition duration-500 ease-in-out group-hover:opacity-100">
            {file.fileName}
          </p>
        </div>
        <div className=" z-0  overflow-hidden w-full m-2 h-3/4 grid justify-center items-center opacity-90 text-gray-500">
          {file.fileName.endsWith(".pdf") ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          ) : file.fileName.endsWith(".mp4") ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          ) : (
            <img
              src={file.url}
              className="z-0 object-contain w-full h-full"
            ></img>
          )}
        </div>
      </div>
    </a>
  );
}

export default FileCard;

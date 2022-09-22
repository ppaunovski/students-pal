import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
//import { Form, Button } from "react-bootstrap";
import { storage, db } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { setDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import SubjectFileCard from "./SubjectFileCard";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import VerticalOptionsButton from "./VerticalOptionsButton";
import { useAuth } from "../contexts/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import UploadFile from "./UploadFile";

function SubjectPage() {
  const { currentUser } = useAuth();

  const pathname = window.location.pathname;
  const subject = decodeURIComponent(pathname.slice(43));

  const [fileList, setFileList] = useState([]);

  const fileListRef = ref(storage, `${subject}/`);

  useEffect(() => {
    const getFileNames = async () => {
      const data = await getDocs(collection(db, `subjects/${subject}/files`));
      setFileList(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getFileNames();
  }, []);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Navbar />
      <h1 style={{ textAlign: "center", margin: "30px", padding: "5px" }}>
        {subject}
      </h1>
      <Box>
        <Box
          sx={{
            maxWidth: "500px",
            maxHeight: "60vh",
            margin: "0 auto",
            overflowY: "scroll",
          }}
        >
          <List>
            {fileList.map((file) => {
              return (
                <>
                  <ListItem
                    disablePadding
                    sx={{ justifyContent: "space-between" }}
                  >
                    <a
                      target="_blank"
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                      href={file.url}
                    >
                      <ListItemButton>
                        <SubjectFileCard key={file.fileId} file={file} />
                      </ListItemButton>
                    </a>
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
                  </ListItem>
                </>
              );
            })}
          </List>
        </Box>
        <Box sx={{ margin: "auto" }}>
          <UploadFile modal={false} subject={subject} />
        </Box>
      </Box>
    </Box>
  );
}

export default SubjectPage;

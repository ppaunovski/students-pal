import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import SubjectFileCard from "./SubjectFileCard";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import VerticalOptionsButton from "./VerticalOptionsButton";
import { useAuth } from "../contexts/AuthContext";
import UploadFile from "./UploadFile";

function SubjectPage() {
  const { currentUser } = useAuth();

  const removeLastSlash = (pathname) => {
    let i = 0;
    const lastSlash = 7;
    let slashCount = 0;
    for (i = 0; i < pathname.length; i++) {
      if (pathname[i] === "/") slashCount++;
    }
    if (slashCount === lastSlash) {
      return i - 1;
    }
    return i;
  };

  const pathname = window.location.pathname;
  const subject = decodeURIComponent(
    pathname.slice(43, removeLastSlash(pathname))
  );

  const [fileList, setFileList] = useState([]);

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

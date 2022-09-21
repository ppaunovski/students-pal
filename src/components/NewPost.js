import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
import {
  Avatar,
  Box,
  Button,
  Card,
  Fab,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { Stack, styled } from "@mui/system";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import AddIcon from "@mui/icons-material/Add";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

export default function NewPost({ setRefresh }) {
  const [post, setPost] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileId, setFileId] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${auth.currentUser.email}`));

      setProfilePicture(pp.data());
    };

    getPP();
  }, []);

  const createPost = async () => {
    if (file === null) {
      setFileId(`${v4()}`);
    } else {
      setFileId(`${file.name + v4()}`);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (file === null) {
      setFileUrl(`${v4()}`);
    } else {
      setHasImage(true);
      const fileRef = ref(storage, `${auth.currentUser.email}/${fileId}`);

      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setFileUrl(url);
        });
      });
    }
  }, [fileId]);

  useEffect(() => {
    const postIt = async () => {
      if (fileId) {
        await setDoc(doc(db, "posts", `${fileId}`), {
          author: auth.currentUser.email,
          authorID: auth.currentUser.uid,
          body: post,
          comments: 0,
          likes: 0,
          likeArray: [],
          postedAt: serverTimestamp(),
          hasImage: hasImage,
          imageUrl: fileUrl,
        });

        setRefresh(true);
      }
    };
    postIt();
    setPost("");
  }, [fileUrl]);

  return (
    <Box>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={350} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" color="gray" textAlign="center">
            Create Post
          </Typography>
          <UserBox>
            <Avatar src={profilePicture.ppurl} alt={auth.currentUser.email} />
            <Typography fontWeight={500} variant="span">
              {auth.currentUser.email}
            </Typography>
          </UserBox>
          <TextField
            id="standard-multiline-static"
            multiline
            rows={4}
            placeholder="What's on your mind?"
            variant="standard"
            fullWidth
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <PhotoOutlinedIcon />
            </IconButton>
            <span>{file === null ? "" : file.name}</span>
          </Stack>
          <Button onClick={createPost}>Post</Button>
        </Box>
      </StyledModal>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "30px",
          left: "0",
        }}
      >
        <div style={{ margin: "0 auto", width: "56px" }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={(e) => {
              setOpen(true);
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </Box>
    </Box>

    //-------------------------------
    // <>
    //   <Form>
    //     <Form.Group>
    //       <TextField
    //         value={post}
    //         placeholder="What's on your mind?"
    //         fullWidth
    //         variant="standard"
    //         multiline
    //         onChange={(event) => {
    //           setPost(event.target.value);
    //         }}
    //       ></TextField>
    //     </Form.Group>
    //     <Button className="mt-2" onClick={createPost}>
    //       Post
    //     </Button>
    //   </Form>
    // </>
  );
}

import {
  Modal,
  styled,
  Box,
  List,
  ListItem,
  IconButton,
  Fab,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import ClearIcon from "@mui/icons-material/Clear";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function UploadFile(props) {
  const [modal, setModal] = useState(props.modal);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const { currentUser } = useAuth();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ["image/*", "video/mp4", "application/pdf"],
    onDrop: (acceptedFiles) => {
      setFilesToUpload(filesToUpload.concat(acceptedFiles));
    },
  });

  const handleClick = () => {
    setModal(!modal);
  };

  const uploadFiles = async () => {
    setLoading(true);
    if (filesToUpload === null) {
      setLoading(false);
      return;
    }

    filesToUpload.map((file) => {
      const fileId = `${file.name + v4()}`;

      const fileRef = ref(storage, `${props.subject}/${fileId}`);

      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const addDocument = async () => {
            await setDoc(
              doc(db, "subjects", `${props.subject}`, "files", `${fileId}`),
              {
                url: url,
                fileName: file.name,
                fileId: fileId,
                author: currentUser.email,
              }
            );
            console.log("done");
            setLoading(false);
            window.location.reload();
          };

          addDocument();
        });
      });
    });
  };

  useEffect(() => {
    if (loading === false) {
      setModal(false);
    }
  }, [loading]);

  return (
    <Box onClick={handleClick} className="grid justify-center items-center">
      <button
        sx={{
          margin: "15px calc(50vw - 26px) ",
          background: "#ae87d0",
          color: "white",
        }}
        className="hover:bg-deepPurple transition-all duration-200 ease-in-out m-4   w-14 h-14 bg-lightPurple rounded-full"
        aria-label="add"
        onClick={handleClick}
      >
        <AddIcon className="text-white" />
      </button>

      <StyledModal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box
            className="bg-black/50 rounded-xl p-4"
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
              maxWidth: "400px",
              // backgroundColor: "#ddd",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "350px",
                backgroundColor: "whitesmoke",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDragActive ? (
                  <p>Drop the files here</p>
                ) : (
                  <>
                    <p>Drag and drop the files here, or click to select</p>
                    <FileUploadIcon sx={{ width: "56px", height: "56px" }} />
                  </>
                )}
              </div>
            </Card>
            <Box>
              <List className="text-white">
                {filesToUpload &&
                  filesToUpload.map((file) => {
                    return (
                      <ListItem key={file.name}>
                        {file.name}
                        <IconButton
                          onClick={() => {
                            setFilesToUpload(
                              filesToUpload.filter((f) => f.name !== file.name)
                            );
                          }}
                        >
                          <ClearIcon className="text-white" />
                        </IconButton>
                      </ListItem>
                    );
                  })}
              </List>
            </Box>
            <button
              disabled={loading}
              onClick={uploadFiles}
              className="uppercase disabled:bg-gray-500 disabled:text-gray-200 transition-all ease-in-out duration-200 mx-auto bg-deepPurple px-4 py-2 rounded-lg  text-white"
            >
              <span>{!loading && "Upload"}</span>
              {loading && <CircularProgress size="16px" color="secondary" />}
            </button>
            {/* <LoadingButton
              onClick={uploadFiles}
              loading={loading}
              variant="contained"
            >
              Upload
            </LoadingButton> */}
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
}

export default UploadFile;

import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  IconButton,
  Typography,
  styled,
  Box,
  Menu,
  MenuItem,
  alpha,
  Modal,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";

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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function VerticalOptionsButton({
  post,
  comments,
  postId,
  calledFrom,
  commentId,
  file,
  subject,
}) {
  const storage = getStorage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modal, setModal] = useState(false);

  const deleteComments = async () => {
    for (let i = 0; i <= comments.length; i++) {
      const id = comments.length + "";
      await deleteDoc(doc(db, "posts", postId, "comments", id));
    }
  };
  //
  const handleDeleteOfPost = async () => {
    if (comments.length !== 0) {
      await deleteComments();
    }
    await deleteDoc(doc(db, "posts", postId));
    window.location.reload();
  };

  const handleDeleteOfComment = async () => {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    window.location.reload();
  };

  const handleDeleteOfFile = async () => {
    const fileRef = ref(storage, `${subject}/${file.fileId}`);
    await deleteObject(fileRef);
    await deleteDoc(
      doc(db, "subjects", `${subject}`, "files", `${file.fileId}`)
    );
    window.location.reload();
  };

  const handleDeleteOfPostWithFile = async () => {
    if (comments.length !== 0) {
      await deleteComments();
    }
    const fileRef = ref(storage, post.filePath);
    await deleteObject(fileRef);
    await deleteDoc(doc(db, "posts", postId));
    window.location.reload();
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setModal(true);
          }}
        >
          Delete
        </MenuItem>
      </StyledMenu>
      <StyledModal
        open={modal}
        onClose={(e) => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={170}
          height={120}
          bgcolor="white"
          p={3}
          borderRadius={5}
          margin="auto"
        >
          <Typography variant="p" color="black" textAlign="center">
            Are you sure?
          </Typography>
          <Button
            color="success"
            disableElevation
            onClick={
              calledFrom === "post"
                ? handleDeleteOfPost
                : calledFrom === "comment"
                ? handleDeleteOfComment
                : calledFrom === "subjectFileCard"
                ? handleDeleteOfFile
                : calledFrom === "postWithFile"
                ? handleDeleteOfPostWithFile
                : ""
            }
            endIcon={<CheckIcon />}
          >
            Confirm
          </Button>
        </Box>
      </StyledModal>
    </Box>
  );
}

export default VerticalOptionsButton;

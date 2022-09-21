import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import VerticalOptionsButton from "./VerticalOptionsButton";

function SubjectFileCard(props) {
  return (
    <Box>
      <ListItemIcon
        sx={{
          gap: "10px",
          alignItems: "center",
        }}
      >
        {props.file.fileName.endsWith(".pdf") ? (
          <PictureAsPdfIcon />
        ) : props.file.fileName.endsWith(".mp4") ? (
          <VideoFileIcon />
        ) : (
          <InsertPhotoIcon />
        )}
        <ListItemText primary={props.file.fileName} />
      </ListItemIcon>
    </Box>
  );
}

export default SubjectFileCard;

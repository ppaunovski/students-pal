import { Box, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoFileIcon from "@mui/icons-material/VideoFile";

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

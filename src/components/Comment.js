import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  styled,
  Menu,
  alpha,
  Modal,
  MenuItem,
  Box,
  handleDeleteOfPost,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import CheckIcon from "@mui/icons-material/Check";
import VerticalOptionsButton from "./VerticalOptionsButton";

function Comment(props) {
  const { currentUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${props.comment.author}`));

      setProfilePicture(pp.data());
    };

    getPP();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          margin: "0 0 7.5px 0",
          justifyContent: "center",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/profile/${props.comment.author}`}
        >
          <Avatar
            alt={props.comment.author}
            src={profilePicture ? profilePicture.ppurl : ""}
          ></Avatar>
        </Link>

        <Card
          sx={{
            backgroundColor: "rgba(237,237,237,0.5)",
            width: "80%",
          }}
        >
          <CardHeader
            sx={{ margin: "0", padding: "5px" }}
            action={
              currentUser.email === props.comment.author ? (
                <div>
                  <VerticalOptionsButton
                    commentId={props.commentId}
                    calledFrom="comment"
                    postId={props.comment.postID}
                  />
                </div>
              ) : (
                ""
              )
            }
            title={
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${props.comment.author}`}
              >
                <Typography variant="body2" color="text.primary">
                  {props.comment.author}
                </Typography>
              </Link>
            }
          />
          <CardContent
            sx={{ margin: "0", padding: "0 10px", wordWrap: "break-word" }}
          >
            <Typography variant="body2" color="text.secondary">
              {props.comment.body}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions> */}
        </Card>
      </Box>
    </Box>
    // <Card sx={{ margin: "5px auto", backgroundColor: "lightgray" }}>
    //   <CardHeader
    //     avatar={
    //       <Avatar
    //         alt={props.comment.author}
    //         src={profilePicture ? profilePicture.ppurl : ""}
    //       ></Avatar>
    //     }
    //     action={
    //       currentUser.email === props.comment.author ? (
    //         <div>
    //           <VerticalOptionsButton
    //             commentId={props.commentId}
    //             calledFrom="comment"
    //             postId={props.comment.postID}
    //           />
    //         </div>
    //       ) : (
    //         ""
    //       )
    //     }
    //     title={
    //       <Link
    //         style={{ textDecoration: "none", color: "black" }}
    //         to={`/profile/${props.comment.author}`}
    //       >
    //         {props.comment.author}
    //       </Link>
    //     }
    //     subheader={
    //       <Moment fromNow>
    //         {props.comment.postedAt && props.comment.postedAt.toDate()}
    //       </Moment>
    //     }
    //   />

    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       {props.comment.body}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton aria-label="add to favorites">
    //       <FavoriteIcon />
    //     </IconButton>
    //   </CardActions>
    // </Card>
  );
}

export default Comment;

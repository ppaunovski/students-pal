import {
  getDoc,
  getDocs,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import { v4 } from "uuid";
import VerticalOptionsButton from "./VerticalOptionsButton";

export default function Post(props) {
  const [showComms, setShowComms] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [alreadyLikedPosts, setAlreadyLikedPosts] = useState([]);

  const commentsCollectionRef = collection(
    db,
    "posts",
    props.postId,
    "comments"
  );

  useEffect(() => {
    const getPost = async () => {
      const p = await getDoc(doc(db, "posts", props.postId));
      setLikeCount(p.data().likes);
    };
    getPost();
  }, [likeCount]);

  const getComments = async () => {
    const data = await getDocs(commentsCollectionRef);
    setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (comments.length === 0) {
      getComments();
    }
  }, [comments]);

  const createNewComment = async () => {
    const id = comments.length + "";
    await setDoc(doc(db, "posts", props.postId, "comments", id), {
      author: auth.currentUser.email,
      authorID: auth.currentUser.uid,
      body: newComment,
      postID: props.postId,
      postedAt: serverTimestamp(),
    });

    setNewComment("");
    await getComments();
  };

  const toggleLike = async (email) => {
    const post = await getDoc(doc(db, "posts", props.postId));
    const user = await getDoc(doc(db, "users", auth.currentUser.email));
    const likedPosts = user.data().likedPosts;
    const likeArray = post.data().likeArray;
    // If it has the email then post is already liked -> UNLIKE IT
    let newLikeArray = [];
    let newLikedPosts = [];
    if (likeArray.includes(email)) {
      // filtering the array and removing the like
      newLikeArray = likeArray.filter((like) => like !== email);

      setLikeCount(newLikeArray.length);
      newLikedPosts = likedPosts.filter((like) => like !== props.postId);
    } else {
      likeArray.push(email);
      newLikeArray = likeArray;
      setLikeCount(newLikeArray.length);
      likedPosts.push(props.postId);
      newLikedPosts = likedPosts;
    }
    setAlreadyLikedPosts(newLikedPosts);
    await updateDoc(doc(db, "posts", props.postId), {
      likeArray: newLikeArray,
      likes: newLikeArray.length,
    });
    await updateDoc(doc(db, "users", auth.currentUser.email), {
      likedPosts: newLikedPosts,
    });
  };

  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${props.post.author}`));
      const user = await getDoc(doc(db, "users", auth.currentUser.email));

      setProfilePicture(pp.data());
      setAlreadyLikedPosts(user.data().likedPosts);
    };

    getPP();
  }, []);

  return (
    <Card
      sx={{
        width: { sm: "40vw", xs: "70vw" },
        maxWidth: "550px",
        margin: "10px auto",
      }}
    >
      <CardHeader
        avatar={
          <Avatar alt={props.post.author} src={profilePicture.ppurl}></Avatar>
        }
        action={
          // TODO: ADD DELETE POST BY AUTHOR
          auth.currentUser.email === props.post.author ? (
            <div>
              <VerticalOptionsButton
                calledFrom={props.hasImage ? "post" : "postWithFile"}
                post={props.post}
                comments={comments}
                postId={props.postId}
              />
            </div>
          ) : (
            ""
          )
        }
        title={
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/profile/${props.post.author}`}
          >
            {props.post.author}
          </Link>
        }
        subheader={
          <Moment fromNow>
            {props.post.postedAt && props.post.postedAt.toDate()}
          </Moment>
        }
      />
      {/* TODO: if there is no img collapse */}
      {props.post.hasImage && (
        <CardMedia
          component="img"
          height="194"
          image={props.post.imageUrl}
          alt="image"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <span>{likeCount}</span>
        <IconButton
          aria-label="like"
          onClick={() => toggleLike(auth.currentUser.email)}
        >
          <FavoriteIcon
            sx={
              alreadyLikedPosts.includes(props.postId) === true
                ? { color: "red" }
                : {}
            }
          />
        </IconButton>
        <IconButton
          aria-label="comment"
          onClick={() => setShowComms(!showComms)}
        >
          <CommentOutlinedIcon />
        </IconButton>
      </CardActions>

      {showComms && (
        <Box>
          <CardActions
            disableSpacing
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Write your comment..."
              value={newComment}
              variant="filled"
              size="small"
              sx={{ width: "90%" }}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <IconButton aria-label="post" onClick={createNewComment}>
              <SendIcon />
            </IconButton>
          </CardActions>
          <Box sx={{ padding: "5px" }}>
            {comments.map((c) => {
              return <Comment key={v4()} comment={c} commentId={c.id} />;
            })}
          </Box>
        </Box>
      )}
    </Card>
  );
}

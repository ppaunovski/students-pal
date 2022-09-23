import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Moment from "react-moment";
import { Avatar, Box } from "@mui/material";

function Message({ message, sender, createdAt, senderPP, recipientPP }) {
  const { currentUser } = useAuth();

  let style_wrapper = {};
  let style = {};

  sender === currentUser.email
    ? (style = {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      })
    : (style = {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
      });

  sender === currentUser.email
    ? (style_wrapper = {
        backgroundColor: "#0B5ED7",
        padding: "0px 5px",
        color: "white",
        minWidth: "15vw",
        maxWidth: "50vw",
        borderRadius: "10px",
      })
    : (style_wrapper = {
        backgroundColor: "#BBB",
        padding: "0px 5px",
        minWidth: "15vw",
        maxWidth: "50vw",
        borderRadius: "10px",
      });

  return (
    <>
      <Box
        sx={{
          padding: "0 5px",
          margin: "5px 0",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {sender !== currentUser.email && <Avatar src={recipientPP} />}
        <div style={style}>
          <div className="msg_wrapper" style={style_wrapper}>
            <h6
              style={{
                padding: "2px",
                overflowX: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {sender}
            </h6>
            <p
              style={{
                padding: "0 10px",
                display: "inline-block",
                textAlign: "left",
                borderRadius: "5px",
                overflowWrap: "anywhere",
              }}
            >
              {message}
            </p>
            <br />
            <small
              style={{
                display: "inline-block",
                marginTop: "5px",
                opacity: "0.8",
                padding: "0 0 5px 5px",
              }}
            >
              <Moment fromNow>{createdAt && createdAt.toDate()}</Moment>
            </small>
          </div>
        </div>
        {sender === currentUser.email && <Avatar src={senderPP} />}
      </Box>
    </>
  );
}

export default Message;

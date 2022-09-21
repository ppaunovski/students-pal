import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Message from "./Message";
import Form from "react-bootstrap/Form";
import {
  getDoc,
  doc,
  addDoc,
  collection,
  setDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  QuerySnapshot,
  getDocs,
  startAfter,
  startAt,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { v4 } from "uuid";
import CustomizedMenus from "./CustomizedMenus";
//

function Chat({ sender, recipient, setReload }) {
  const [message, setMessage] = useState("");
  const [orderedMsgs, setOrderedMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [nextQuery, setNextQuery] = useState({});
  const [addedNewMess, setAddedNewMess] = useState(false);
  const [recipientPP, setRecipientPP] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [senderPP, setSenderPP] = useState({});
  const scroll = useRef();

  const { currentUser } = useAuth();

  const id =
    sender > recipient ? `${sender + recipient}` : `${recipient + sender}`;

  const messagesCollectionRef = collection(db, "messages", id, "chat");

  const getMess = async () => {
    setLoading(true);

    let q;
    if (isFirst || addedNewMess) {
      q = query(messagesCollectionRef, orderBy("createdAt", "desc"), limit(5));
      setIsFirst(false);
      setAddedNewMess(false);
    } else {
      q = nextQuery;
    }

    const documentSnapshots = await getDocs(q);
    documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      setOrderedMsgs((prev) => [...prev, { data: data }]);
    });

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    if (lastVisible) {
      setHasMore(true);
      setNextQuery(
        query(
          messagesCollectionRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(5)
        )
      );
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (refresh) {
      setOrderedMsgs([]);
      getMess();

      const getPP = async () => {
        const ppRecipient = await getDoc(doc(db, "users", `${recipient}`));
        setRecipientPP(ppRecipient.data());
        const ppSender = await getDoc(doc(db, "users", `${sender}`));
        setSenderPP(ppSender);
      };

      getPP();
      setRefresh(false);
    }
  }, [refresh]);

  const handleSend = async (e) => {
    e.preventDefault();

    await addDoc(messagesCollectionRef, {
      message: message,
      recipient: recipient,
      sender: sender,
      createdAt: serverTimestamp(),
    });
    await setDoc(doc(db, "users", `${currentUser.email}`, "chats", id), {
      chatter: currentUser.email === sender ? recipient : sender,
      chatterPP:
        currentUser.email === sender ? recipientPP.ppurl : senderPP.ppurl,
    });
    await setDoc(
      doc(
        db,
        "users",
        `${currentUser.email === sender ? recipient : sender}`,
        "chats",
        id
      ),
      {
        chatter: currentUser.email,
        chatterPP: senderPP.ppurl,
      }
    );
    setMessage("");
    setAddedNewMess(true);
    setRefresh(true);
  };

  const observer = useRef();
  const lastMessElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getMess();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Box flex={3} height={"100%"}>
      <Box
        sx={{
          backgroundColor: "gray",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            visibility: { xs: "visable", sm: "hidden" },
            paddingLeft: "15px",
          }}
        >
          <CustomizedMenus setReload={setReload} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <Avatar src={recipientPP.ppurl} />
          <h3>{recipient}</h3>
        </Box>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            visibility: "hidden",
          }}
        >
          XD
        </Box>
      </Box>

      {/* <Box
        sx={{
          overflow: "auto",
          backgroundColor: "lightgray",
          height: "71.5vh",
        }}
      >
        <Box
          padding={"5px"}
          // // sx={{ display: "flex", flexDirection: "column-reverse" }}
          sx={{}}
        > */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "end",
          overflowY: "scroll",
          height: "70.8vh",
          backgroundColor: "lightgray",
        }}
      >
        {orderedMsgs &&
          orderedMsgs.map((m, index) => {
            if (orderedMsgs.length === index + 1) {
              return (
                <>
                  <Message
                    key={m.data.id}
                    message={m.data.message}
                    sender={m.data.sender}
                    createdAt={m.data.createdAt}
                    recipientPP={recipientPP.ppurl}
                    senderPP={senderPP.ppurl}
                  />
                  <div ref={lastMessElementRef} key={v4()}></div>
                </>
              );
            } else {
              return (
                <Message
                  key={m.data.id}
                  message={m.data.message}
                  sender={m.data.sender}
                  createdAt={m.data.createdAt}
                  recipientPP={recipientPP.ppurl}
                  senderPP={senderPP.ppurl}
                />
              );
            }
          })}
        {/* </Box>
        </Box> */}
        <div
          ref={scroll}
          style={{ width: "10px", height: "2px", padding: "2px" }}
        ></div>
      </Box>
      <Box
        sx={{
          backgroundColor: "gray",
          height: "10vh",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "7px",
          }}
        >
          <TextField
            type="text"
            variant="standard"
            sx={{ width: "55vw" }}
            multiline
            placeholder="Enter message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          ></TextField>
          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;

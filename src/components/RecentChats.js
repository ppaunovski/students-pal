import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function RecentChats({ setRefresh }) {
  const { currentUser } = useAuth();
  const [activeChats, setActiveChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const getChats = async () => {
      const chats = await getDocs(
        collection(db, "users", `${currentUser.email}`, "chats")
      );
      setActiveChats(
        chats.docs.map((chat) => ({ data: { ...chat.data() }, id: chat.id }))
      );

      const users = await getDocs(collection(db, "onlineUsers"));
      setOnlineUsers(users.docs.map((user) => user.id));
    };

    getChats();
  }, []);

  return (
    <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box sx={{ position: "fixed" }}>
        <List>
          <ListItem>
            <h5>Recent chats</h5>
          </ListItem>
          {activeChats.map((chat) => {
            return (
              <Link
                key={chat.data.chatter}
                to={`/messenger/${currentUser.email}/${chat.data.chatter}`}
                style={{ textDecoration: "none", color: "black" }}
                onClick={() => setRefresh(false)}
              >
                <ListItem sx={{ margin: "0", padding: "2px 3px" }}>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0",
                      margin: "0",
                      justifyContent: "center",
                    }}
                  >
                    {chat.data.chatterPP && (
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          onlineUsers.includes(chat.data.chatter) ? (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                              }}
                            ></div>
                          ) : (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "red",
                              }}
                            ></div>
                          )
                        }
                      >
                        <Avatar
                          sx={{ width: 34, height: 34 }}
                          src={chat.data.chatterPP}
                        />
                      </Badge>
                    )}
                    <p
                      style={{
                        width: "100px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {chat.data.chatter}
                    </p>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default RecentChats;

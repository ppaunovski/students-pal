import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

function Rightbar() {
  const { currentUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getOnlineUsers = async () => {
      const ou = await getDocs(collection(db, "onlineUsers"));
      setOnlineUsers(
        ou.docs.map((user) => ({
          data: { ...user.data() },
          id: user.id,
          key: user.id,
        }))
      );
      const u = await getDocs(collection(db, "users"));
      setUsers(
        u.docs.map((user) => ({
          data: { ...user.data() },
          id: user.id,
          key: user.id,
        }))
      );
    };

    getOnlineUsers();
  }, []);

  return (
    <Box
      flex={1}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box sx={{ position: "fixed" }}>
        <List>
          <ListItem>
            <h5>Online Users</h5>
          </ListItem>
          {onlineUsers.map((user) => {
            let pp = users.filter((u) => u.id === user.id);
            return user.id !== currentUser.email ? (
              <Link
                key={user.id}
                // to={`/profile/${chat.data.chatter}/message`}
                to={`/profile/${user.id}`}
                // state={{
                //   sender: currentUser.email,
                //   recipient: chat.data.chatter,
                // }}
                style={{ textDecoration: "none", color: "black" }}
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
                    {user.data.isOnline && (
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "green",
                            }}
                          ></div>
                        }
                      >
                        {pp[0] && (
                          <Avatar
                            sx={{ width: 34, height: 34 }}
                            src={pp[0].data.ppurl}
                            alt={user.id}
                          />
                        )}
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
                      {user.id}
                    </p>
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <div key={v4()}></div>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default Rightbar;

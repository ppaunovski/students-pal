import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { Prev } from "react-bootstrap/esm/PageItem";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";

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

export default function CustomizedMenus({ setReload }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        sx={{ padding: "0", margin: "0", color: "white" }}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <List>
          <ListItem>
            <h5>Recent chats</h5>
          </ListItem>
          {activeChats.map((chat) => {
            return (
              <Link
                key={chat.data.chatter}
                // to={`/profile/${chat.data.chatter}/message`}
                to={`/messenger/${currentUser.email}/${chat.data.chatter}`}
                state={{
                  sender: currentUser.email,
                  recipient: chat.data.chatter,
                }}
                style={{ textDecoration: "none", color: "black" }}
                onClick={() => setReload(false)}
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
                      <MenuItem>
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
                      </MenuItem>
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
      </StyledMenu>
    </div>
  );
}

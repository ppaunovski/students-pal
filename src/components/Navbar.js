import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ForumIcon from "@mui/icons-material/Forum";
import { ListItemIcon, ListItemText, Modal } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const openAbout = () => {
    setOpen(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const updateOnlineStatus = async (isOnline, email) => {
    await updateDoc(doc(db, "users", `${email}`), {
      isOnline: isOnline,
    });
    await deleteDoc(doc(db, "onlineUsers", `${email}`));
  };

  async function handleLogout() {
    setError("");

    try {
      const email = currentUser.email;
      await logout(currentUser.email);
      updateOnlineStatus(false, email);
      navigate("/login");
    } catch {
      setError("Failed to Log Out!");
    }
  }

  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${currentUser.email}`));
      setProfilePicture(pp.data());
    };

    getPP();
  }, []);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" className=" bg-[#522d80] text-gray-300">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              exact
              to={`/`}
            >
              FINKI Student's Pal
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                exact
                to={`/forum`}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <ListItemIcon>
                    <ForumIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Forum</ListItemText>
                </MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/semesters`}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <ListItemIcon>
                    <ListIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Semesters</ListItemText>
                </MenuItem>
              </Link>

              <MenuItem onClick={handleCloseNavMenu && openAbout}>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* MINIMISED */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              exact
              to={`/`}
            >
              Student's Pal
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              exact
              to={`/forum`}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Forum
              </Button>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/semesters`}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Semesters
              </Button>
            </Link>

            <Button
              onClick={handleCloseNavMenu && openAbout}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser.email} src={profilePicture.ppurl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${currentUser.email}`}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/messenger/${currentUser.email}`}
                state={{ sender: currentUser.email, recipient: null }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <ChatIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Chats</ListItemText>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleCloseUserMenu && handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About FINKI Studet's Pal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This web application is created as a faculty project for the Faculty
            of Computer Science &amp; Engineering of Skopje (
            <a href="https://www.finki.ukim.mk/mk" target="_blank">
              FINKI
            </a>
            ), Macedonia. It was built using React and Firebase for the
            functionality, Material UI and Bootstrap for the visuals.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Created by:{" "}
            <a href="https://github.com/ppaunovski" target="_blank">
              Pavel Paunovski
            </a>
          </Typography>
        </Box>
      </Modal>
    </AppBar>
  );
};
export default Navbar;

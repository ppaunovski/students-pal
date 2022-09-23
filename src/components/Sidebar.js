import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import GradingIcon from "@mui/icons-material/Grading";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QuizIcon from "@mui/icons-material/Quiz";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Sidebar() {
  return (
    <Box
      flex={1}
      p={1}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box sx={{ position: "fixed" }}>
        <Box sx={{ maxWidth: "20vw" }}>
          <h5 style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            Корисни линкови
          </h5>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Сервиси на Финки" />
            </ListItem>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://www.finki.ukim.mk/"
              target="_blank"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Финки" />
                </ListItemButton>
              </ListItem>
            </a>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://www.iknow.ukim.mk/"
              target="_blank"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <GradingIcon />
                  </ListItemIcon>
                  <ListItemText primary="Iknow" />
                </ListItemButton>
              </ListItem>
            </a>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://courses.finki.ukim.mk/"
              target="_blank"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Курсеви" />
                </ListItemButton>
              </ListItem>
            </a>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://ispiti.finki.ukim.mk/"
              target="_blank"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                  <ListItemText primary="Испити" />
                </ListItemButton>
              </ListItem>
            </a>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="https://finki.edupage.org/timetable/"
              target="_blank"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Распоред" />
                </ListItemButton>
              </ListItem>
            </a>
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;

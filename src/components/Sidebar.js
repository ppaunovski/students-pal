import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
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
        <h5>Корисни линкови</h5>
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
  );
  // const [semester, setSemester] = useState(null);
  // const [semesters, setSemesters] = useState([]);
  // const semCollectionRef = collection(db, "semesters");
  // useEffect(() => {
  //   const getSub = async () => {
  //     const data = await getDocs(semCollectionRef);

  //     setSemesters(
  //       data.docs.map((doc) => ({ data: { ...doc.data() }, id: doc.id }))
  //     );
  //   };

  //   getSub();
  // }, [semester]);

  // const setAllProps = async (sem) => {
  //   setSemester(sem);
  // };

  // return (
  //   <Box flex={1} p={1} sx={{ display: { xs: "none", sm: "block" } }}>
  //     <Box position="fixed">
  //       <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
  //         Семестри
  //       </Typography>

  //       <List>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester1"
  //                 state={{
  //                   semester: 1,
  //                 }}
  //               >
  //                 Semester 1
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester2"
  //                 state={{
  //                   semester: 2,
  //                 }}
  //               >
  //                 Semester 2
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester3"
  //                 state={{
  //                   semester: 3,
  //                 }}
  //               >
  //                 Semester 3
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester4"
  //                 state={{
  //                   semester: 4,
  //                 }}
  //               >
  //                 Semester 4
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester5"
  //                 state={{
  //                   semester: 5,
  //                 }}
  //               >
  //                 Semester 5
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester6"
  //                 state={{
  //                   semester: 6,
  //                 }}
  //               >
  //                 Semester 6
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester7"
  //                 state={{
  //                   semester: 7,
  //                 }}
  //               >
  //                 Semester 7
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem>
  //           <ListItemButton>
  //             <ListItemText>
  //               <Link
  //                 style={{ textDecoration: "none", color: "black" }}
  //                 to="/semesters/semester8"
  //                 state={{
  //                   semester: 8,
  //                 }}
  //               >
  //                 Semester 8
  //               </Link>
  //             </ListItemText>
  //           </ListItemButton>
  //         </ListItem>
  //       </List>
  //     </Box>
  //   </Box>
  // );

  //   return (
  //     <Box bgcolor="pink" flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
  //       Sidebar
  //     </Box>

  //   );
}

export default Sidebar;

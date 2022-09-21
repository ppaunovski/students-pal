import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Box } from "@mui/system";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

export default function Semesters() {
  const [semester, setSemester] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const semCollectionRef = collection(db, "semesters");
  useEffect(() => {
    const getSub = async () => {
      const data = await getDocs(semCollectionRef);

      setSemesters(
        data.docs.map((doc) => ({ data: { ...doc.data() }, id: doc.id }))
      );
    };

    getSub();
  }, [semester]);

  const setAllProps = async (sem) => {
    setSemester(sem);
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{ mt: 4, mb: 2, textAlign: "center" }}
          variant="h4"
          component="div"
        >
          Семестри
        </Typography>

        <List>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/1"
            state={{
              semester: 1,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 1</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/2"
            state={{
              semester: 2,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 2</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/3"
            state={{
              semester: 3,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 3</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/4"
            state={{
              semester: 4,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 4</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/5"
            state={{
              semester: 5,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 5</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/6"
            state={{
              semester: 6,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 6</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/7"
            state={{
              semester: 7,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 7</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/semesters/semester/8"
            state={{
              semester: 8,
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText>Семестар 8</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
        </List>
      </Box>
    </>
  );
}

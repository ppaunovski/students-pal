import React, { useState, useEffect } from "react";
import {
  arrayUnion,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  Box,
  Button,
  CardActions,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Navbar from "./Navbar";
import AddIcon from "@mui/icons-material/Add";

export default function Semester() {
  // const location = useLocation();
  // const { semester } = location;

  //pathname = /semsters/semester/${which semester}
  //pathname.slice(20) returns the number of the semester
  const pathname = window.location.pathname;
  const semester = pathname.slice(39, 40);

  const [sem, setSem] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setSem(semester);
  }, []);

  const semCollectionRef = collection(db, "semesters");
  useEffect(() => {
    const getSub = async () => {
      const data = await getDocs(semCollectionRef);

      setSemesters(
        data.docs.map((doc) => ({ data: { ...doc.data() }, id: doc.id }))
      );
    };

    getSub();
  }, [sem, refresh]);

  let currentSubjects;

  if (semesters[sem - 1]) {
    currentSubjects = semesters[sem - 1].data.subjects;
  }

  const semesterCollectionRef = doc(db, "semesters", `${semester}`);

  const [addSubject, setAddSubject] = useState(false);
  const [newSubjectsTitle, setNewSubjectsTitle] = useState("");

  const addNewSubject = async () => {
    await updateDoc(doc(db, "semesters", `${sem}`), {
      subjects: arrayUnion(`${newSubjectsTitle}`),
    });

    await setDoc(doc(db, "subjects", `${newSubjectsTitle}`), {
      description: "",
    });

    setNewSubjectsTitle("");
    setRefresh(!refresh);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{ mt: 5, mb: 2, textAlign: "center" }}
          variant="h4"
          component="div"
        >
          Семестар {sem}
        </Typography>
        <List>
          {currentSubjects &&
            currentSubjects.map((s) => {
              return (
                <Link
                  key={sem}
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/semesters/semester/${sem}/subject/${s}`}
                  state={{ subject: s }}
                >
                  <ListItem>
                    <ListItemButton>
                      <ListItemText>{s}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
        </List>
        <Box>
          {!addSubject ? (
            <Button
              variant="outlined"
              onClick={() => {
                setAddSubject(!addSubject);
              }}
            >
              Add new subject
            </Button>
          ) : (
            <Box>
              <CardActions disableSpacing>
                <TextField
                  onChange={(event) => {
                    setNewSubjectsTitle(event.target.value);
                  }}
                  placeholder="Enter the name of the subject"
                  variant="standard"
                  fullWidth
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addNewSubject() && setAddSubject(!addSubject);
                  }}
                >
                  <AddIcon />
                </Button>
              </CardActions>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

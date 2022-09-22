import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, useAccordionButton } from "react-bootstrap";
import Navigation from "./Navigation";
import NewPost from "./NewPost";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import Post from "./Post";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 } from "uuid";

export default function Forum() {
  const postsCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [nextQuery, setNextQuery] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const getPosts = async () => {
    setLoading(true);
    let q;
    if (isFirst) {
      q = query(postsCollectionRef, orderBy("postedAt", "desc"), limit(5));
      setIsFirst(false);
    } else {
      q = nextQuery;
    }

    const documentSnapshots = await getDocs(q);
    documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      setPosts((prev) => [...prev, { data: data, id: doc.id }]);
    });

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    if (lastVisible) {
      setHasMore(true);
      setNextQuery(
        query(
          postsCollectionRef,
          orderBy("postedAt", "desc"),
          startAfter(lastVisible),
          limit(5)
        )
      );
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getPosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (refresh === true) {
      setPosts([]);
      setIsFirst(true);
    }
  }, [refresh]);

  useEffect(() => {
    if (isFirst) {
      getPosts();
      setRefresh(false);
    }
  }, [isFirst]);

  return (
    <Box
      flex={3}
      sx={{
        borderRight: "lightgray 2px solid",
        borderLeft: "lightgray 2px solid",
      }}
    >
      <Container>
        <Container>
          <NewPost setRefresh={setRefresh} />
          <div className="posts">
            {posts.map((p, index) => {
              if (posts.length === index + 1) {
                return (
                  <Box key={p.id}>
                    <Post post={p.data} postId={p.id} />
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {hasMore && <CircularProgress />}
                    </Box>
                    <div ref={lastPostElementRef}></div>
                  </Box>
                );
              } else {
                return <Post key={p.id} post={p.data} postId={p.id} />;
              }
            })}
          </div>

          {/* <Button onClick={getPosts}>Load more</Button> */}
        </Container>
      </Container>
    </Box>
  );
}

import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Navbar from "./Navbar";
import RecentChats from "./RecentChats";

function Messenger() {
  const countNextSlash = (pathname) => {
    let slashes = 0;
    let i = 0;
    for (i = 0; i < pathname.length; i++) {
      if (slashes === 4) break;
      if (pathname[i] === "/") {
        slashes++;
      }
    }
    return i;
  };
  const pathname = window.location.pathname;
  const sender = pathname.slice(24, countNextSlash(pathname) - 1);
  const recipient = pathname.slice(countNextSlash(pathname));
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh) {
      setRefresh(true);
    }
  }, [refresh]);

  return (
    <>
      <Navbar />
      <Stack direction="row" justifyContent="space-between" overflow={"hidden"}>
        <RecentChats setRefresh={setRefresh} />
        {recipient && refresh && (
          <Chat sender={sender} recipient={recipient} setReload={setRefresh} />
        )}
      </Stack>
    </>
  );
}

export default Messenger;

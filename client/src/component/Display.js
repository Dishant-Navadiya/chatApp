import React, { useEffect } from "react";
import { Message } from "semantic-ui-react";
const Display = ({ username, msg }) => {
  useEffect(() => {
    document.querySelector(".dishant").scrollTop = document.querySelector(
      ".dishant"
    ).scrollHeight;
  }, []);
  return <Message header={username} content={msg} />;
};

export default Display;

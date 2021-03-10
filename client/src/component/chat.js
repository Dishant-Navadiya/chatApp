import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Card, Grid, Header } from "semantic-ui-react";
import axios from "axios";
import Display from "./Display";
import io from "socket.io-client";
let socket;

const Chat = (props) => {
  const [msg, setMsg] = useState("");
  const [showAllMsg, setShowAllMsg] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("uname") && !localStorage.getItem("key")) {
      props.history.push("/");
    } else {
      const detail = {
        uname: localStorage.getItem("uname"),
        key: localStorage.getItem("key"),
      };
      axios
        .post("https://chattingappbro.herokuapp.com/check", detail, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status === false) {
            localStorage.removeItem("uname");
            localStorage.removeItem("key");
            props.history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
    socket = io("https://chattingappbro.herokuapp.com/", {
      query: `user=${localStorage.getItem("uname")}`,
    });
    socket.on("show-massage", (data) => {
      setShowAllMsg(data.allMsg);
    });
  }, []);

  useEffect(() => {
    socket.on("join-others", (data) => {
      setShowAllMsg((oldMsg) => [...oldMsg, data.allMsg]);
    });
    socket.on("dis-others", (data) => {
      setShowAllMsg((oldMsg) => [...oldMsg, data.allMsg]);
    });
    socket.on("show-others", (data) => {
      setShowAllMsg((oldMsg) => [...oldMsg, data.allMsg]);
    });
  }, []);

  const sendMsg = (event) => {
    event.preventDefault();
    socket.emit("send-massage", { msg });
    const self = {
      username: "Me",
      msg,
    };
    setShowAllMsg((oldMsg) => [...oldMsg, self]);
    setMsg("");
  };

  const manageLogout = () => {
    localStorage.removeItem("uname");
    localStorage.removeItem("key");
    props.history.push("/");
  };

  return (
    <div>
      <Grid style={{ marginTop: "20px" }}>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={14}>
          <Card style={{ width: "auto" }}>
            <Card.Content icon="users">
              <Card.Header>
                <Header as="h3">
                  <Icon name="users" />
                  <Header.Content>
                    Chats{" "}
                    <Button type="button" onClick={manageLogout}>
                      Logout
                    </Button>
                  </Header.Content>
                </Header>
              </Card.Header>
            </Card.Content>

            <Card.Content
              className="dishant"
              style={{ height: "400px", overflow: "auto" }}
            >
              {showAllMsg !== undefined
                ? showAllMsg.map((personal, index) => {
                    return (
                      <Display
                        username={personal.username}
                        msg={personal.msg}
                      />
                    );
                  })
                : null}
            </Card.Content>

            <Card.Content extra>
              <Form className=" fluid " autoComplete="off" onSubmit={sendMsg}>
                <Form.Input
                  icon="facebook messenger"
                  iconPosition="left"
                  fluid
                  type="text"
                  label="Massage"
                  placeholder="Type something...."
                  name="massage"
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                  action={
                    <Button icon labelPosition="right" type="submit">
                      Send
                      <Icon name="send" />
                    </Button>
                  }
                />
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid>
    </div>
  );
};

export default Chat;

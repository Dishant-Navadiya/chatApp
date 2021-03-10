import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Message,
  Icon,
  List,
} from "semantic-ui-react";

const Enter = (props) => {
  useEffect(() => {
    if (localStorage.getItem("uname")) {
      props.history.push("/chat");
    }
  }, []);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState({
    status: false,
    msg: "All fields are required..",
  });
  const changeVal = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const sendData = (e) => {
    e.preventDefault();
    if (login.username === "" || login.password === "") {
      setErr({ ...err, status: true });
    } else {
      axios
        .post("https://chattingappbro.herokuapp.com/auth", login, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status === false) {
            setErr({ status: true, msg: res.data.msg });
          } else if (res.data.status === true) {
            localStorage.setItem("uname", res.data.uname);
            localStorage.setItem("key", res.data.key);
            props.history.push("/chat");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const redirectToSignUp = () => {
    props.history.push("/signup");
  };
  return (
    <Grid style={{ marginTop: "50px" }} columns={3} relaxed="very" stackable>
      <Grid.Column></Grid.Column>
      <Grid.Column>
        {err.status ? (
          <Message attached negative>
            <Message.Header>We're sorry.</Message.Header>
            <p>{err.msg}</p>
          </Message>
        ) : (
          <Message
            attached
            header="Welcome to our site!"
            content="Fill out the form below to sign-in for entering the chat room"
          />
        )}
        <Form
          className="attached fluid segment"
          autoComplete="off"
          onSubmit={sendData}
        >
          <Form.Input
            icon="user"
            iconPosition="left"
            fluid
            type="text"
            label="Username"
            placeholder="Username"
            name="username"
            value={login.username}
            onChange={(e) => changeVal(e)}
          />
          <Form.Input
            icon="key"
            iconPosition="left"
            fluid
            type="password"
            label="Password"
            placeholder="Passsword"
            name="password"
            value={login.password}
            onChange={(e) => changeVal(e)}
          />
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button icon labelPosition="right" type="submit">
            Join
            <Icon name="sign-in" />
          </Button>
          <Button
            icon
            labelPosition="right"
            type="button"
            onClick={redirectToSignUp}
          >
            SignUp
            <Icon name="signup" />
          </Button>
        </Form>

        <List>
          <List.Item
            icon="instagram"
            content={
              <a href="https://www.instagram.com/thedishantnavadiya">
                thedishantnavadiya
              </a>
            }
          />
        </List>
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid>
  );
};
export default Enter;

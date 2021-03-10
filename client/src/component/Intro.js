import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Grid, Message, Icon } from "semantic-ui-react";
import axios from "axios";

const Intro = (props) => {
  useEffect(() => {
    if (localStorage.getItem("uname")) {
      props.history.push("/chat");
    }
  }, []);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    status: false,
    msg: "All fields are required..",
  });

  const changeVal = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const sendData = (e) => {
    e.preventDefault();
    if (
      details.username === "" ||
      details.email === "" ||
      details.password === ""
    ) {
      setErr({ ...err, status: true });
    } else {
      axios
        .post("https://chattingappbro.herokuapp.com/insert", details, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status === false) {
            setErr({ status: true, msg: res.data.msg });
          } else if (res.data.status === true) {
            props.history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const redirectToSignIn = () => {
    props.history.push("/");
  };
  return (
    <Grid style={{ marginTop: "30px" }} columns={3} relaxed="very" stackable>
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
            value={details.username}
            onChange={(e) => changeVal(e)}
          />
          <Form.Input
            icon="user"
            iconPosition="left"
            fluid
            type="text"
            label="email"
            placeholder="Example@gmail.com"
            name="email"
            value={details.email}
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
            value={details.password}
            onChange={(e) => changeVal(e)}
          />
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button icon labelPosition="right" type="submit">
            SignUp
            <Icon name="signup" />
          </Button>
          <Button
            icon
            labelPosition="right"
            type="button"
            onClick={redirectToSignIn}
          >
            Login
            <Icon name="sign-in" />
          </Button>
        </Form>
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid>
  );
};

export default Intro;

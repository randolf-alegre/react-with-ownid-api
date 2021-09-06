import React, { useState, useEffect } from "react";
import firebaseApp from "../firebaseApp";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredentialsError, setUserCredentialsError] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setUserCredentialsError({
            ...userCredentialsError,
            email: error.message,
          });
          break;
        case "auth/wrong-password":
          setUserCredentialsError({
            ...userCredentialsError,
            password: error.message,
          });
          break;
      }
    }
  };

  const handleSignup = async () => {
    try {
      const userPassword = document.getElementById("password").value;
      const response = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, "asdf!@#$");
      props.setUser(response.user.email);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setUserCredentialsError({
            ...userCredentialsError,
            email: error.message,
          });
          break;
        case "auth/weak-password":
          setUserCredentialsError({
            ...userCredentialsError,
          });
          break;
      }
    }
  };
  useEffect(() => {
    if (props.hasAccount) {
      window.ownid("destroy", "register");
      window.ownid("login", {
        loginIdField: document.getElementById("email"),
        passwordField: document.getElementById("password"),
        submitButton: document.getElementById("submit"),
        onSuccess: (response) => {
          console.log(response);
        },
      });
    } else {
      window.ownid("destroy", "login");
      window.ownid("register", {
        loginIdField: document.getElementById("email"),
        passwordField: document.getElementById("password"),
      });
    }
  }, [props]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {userCredentialsError.email ? (
                <Form.Text className="text-danger">
                  {userCredentialsError.email}
                </Form.Text>
              ) : (
                <></>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {userCredentialsError.password ? (
                <Form.Text className="text-danger">
                  {userCredentialsError.password}
                </Form.Text>
              ) : (
                <></>
              )}
            </Form.Group>

            {props.hasAccount ? (
              <>
                <Button variant="primary" id="submit" onClick={handleLogin}>
                  Login
                </Button>
                <p>
                  No account? &nbsp;
                  <span onClick={() => props.setHasAccount(false)}>
                    Sign-up
                  </span>
                </p>
              </>
            ) : (
              <>
                <Button variant="primary" id="submit" onClick={handleSignup}>
                  Sign Up
                </Button>
                <p>
                  Have an Account?&nbsp;
                  <span onClick={() => props.setHasAccount(true)}>Login</span>
                </p>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

import React from "react";
import { Nav } from "react-bootstrap";

export default function Headers(props) {
  return (
    <Nav activeKey="/">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => props.handleLogout()}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

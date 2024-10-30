import { Card, Container } from "react-bootstrap";
import "../AdminPanel/AdminDashboard.css";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login action (e.g., send to API)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Card className="py-3">
          <Col md={12}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Col>
        </Card>
      </Row>
    </Container>
  );
}
export default LoginForm;

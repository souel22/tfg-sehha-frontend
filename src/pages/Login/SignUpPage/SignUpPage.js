import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSignup } from "../../../hooks/useSignup";
import './SignUpPage.css'; // Import your custom CSS

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignUpPage = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [specialities, setSpecialities] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const { signup, error, isLoading } = useSignup();
  const query = useQuery();

  useEffect(() => {
    setUserType(query.get('userType'));
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData;

    switch (userType) {
      case "user":
        userData = {
          email,
          password,
          firstName,
          lastName,
          phone,
          dateOfBirth,
          gender
        };
        break;
      case "specialist":
        userData = {
          email,
          password,
          firstName,
          lastName,
          phone,
          specialities,
          profileImage
        };
        break;
      default:
        console.log("Invalid user type");
        break;
    }

    await signup(userType, userData);
  };

  return (
    <Container fluid className="signup-page">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={4}>
          <Card className="signup-card p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <img src={`${process.env.PUBLIC_URL}/images/sehha_logo.png`} alt="Logo" className="login-logo mb-3" />
                <h2>Create an account as a {userType === "user" ? "user" : userType === "specialist" ? "specialist" : null}</h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control 
                    type="email" 
                    placeholder="e-mail" 
                    className="signup-input mb-3" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    className="signup-input mb-3" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Control 
                    type="text" 
                    placeholder="First Name" 
                    className="signup-input mb-3" 
                    required 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                  <Form.Control 
                    type="text" 
                    placeholder="Last Name" 
                    className="signup-input mb-3" 
                    required 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                  <Form.Control 
                    type="text" 
                    placeholder="Phone" 
                    className="signup-input mb-3" 
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                </Form.Group>
                {userType === "user" && (
                  <>
                    <Form.Group controlId="formBasicDateOfBirth">
                      <Form.Control 
                        type="date" 
                        placeholder="Date of Birth" 
                        className="signup-input mb-3" 
                        required 
                        value={dateOfBirth} 
                        onChange={(e) => setDateOfBirth(e.target.value)} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicGender">
                      <Form.Control 
                        as="select" 
                        className="signup-input mb-3" 
                        required 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Control>
                    </Form.Group>
                  </>
                )}
                {userType === "specialist" && (
                  <>
                    <Form.Group controlId="formBasicSpecialities">
                      <Form.Control 
                        type="text" 
                        placeholder="Specialities" 
                        className="signup-input mb-3" 
                        required 
                        value={specialities} 
                        onChange={(e) => setSpecialities(e.target.value)} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicProfileImage">
                      <Form.Control 
                        type="file" 
                        className="signup-input mb-3" 
                        onChange={(e) => setProfileImage(e.target.files[0])} 
                      />
                    </Form.Group>
                  </>
                )}
                <Button disabled={isLoading} variant="primary" type="submit" className="signup-button w-100 mb-2">
                  Sign Up
                </Button>
                {error && <div className="error">{error}</div>}
                <div className="text-center">
                  <span><a href={userType === "user" ? `${process.env.REACT_APP_LOGIN}?userType=user` : userType === "specialist" ? `${process.env.REACT_APP_LOGIN}?userType=specialist` : null} className="d-block mb-2">Already have an account? Log In</a></span>
                </div>
                <div className="text-center">
                  <span>{userType === "user" ? <a href={`${process.env.REACT_APP_SIGNUP}?userType=specialist`} className="d-block mb-2">Are you a specialist? Sign up as a specialist</a> : userType === "specialist" ? <a href={`${process.env.REACT_APP_SIGNUP}?userType=user`} className="d-block mb-2">Are you a user? Sign up as a user</a> : null}</span>
                </div>
              </Form>
              <div className="text-center mt-3">
                <a href={process.env.REACT_APP_HOMEPAGE}>&lt; Home</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;

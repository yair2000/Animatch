import { useContext, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogUserMutation } from "../services/api";
import { AppContext } from "../context/appContext";
import axios from "axios";
import MainNavbar from "../components/navigation/MainNavbar";
import Footer from "../components/Footer";
import "./styles/LoginStyle.css";

function Login(){
  const [data, setData] = useState({
     email: "",
     password: ""
  });
  const { email, password } = data
  const navigate = useNavigate();

  const { socket } = useContext(AppContext);

  const [logUser, { error }] = useLogUserMutation();

  const dataHandler=({ currentTarget: input }) =>{
     setData({ ...data, [input.name]: input.value });
  }
  console.log(data);

  async function handleLogin(e){
    e.preventDefault();

    // Generates a cookie after a successful login
    try{
      const data = await axios.post("/users/login", {
        email,
        password
      });
      console.log(data);
    }
    catch(error){
      console.log(error.response);
    }

    // Auth using socket.io
    logUser({ email, password }).then(({ data }) =>{
      if(data){
        socket.emit("new-user");
        navigate("/");
      }
    });
  }

  return(
    <>
    <MainNavbar/>
    <Container className="wrapper">
      <Row>
        <Col className="shadow-lg mt-5">
          <Form onSubmit={handleLogin} encType="multipart/form-data">
            <h1 className="mt-4 text-center">Login</h1>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              {error && <p className="alert alert-danger">{error.data}</p>}
              <Form.Label className="mt-3">Email address</Form.Label>
              <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={dataHandler}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={dataHandler}/>
            </Form.Group>

            <Button
            type="submit"
            className="btn btn-danger mt-3"
            disabled={!email || !password ? true : false}>Login</Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account? <Link to="/register">Create one</Link>
              </p>
              <p className="text-center">
                Forgot your password? <Link to="/forgotpassword">Click Here</Link>
              </p>
            </div>
          </Form>
         </Col>
         <div className="footer"/>
       </Row>
      </Container>
      <Footer/>
    </>
  );
}
export default Login;
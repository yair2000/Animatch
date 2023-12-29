import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useLogUserMutation } from "../redux/services/authApi";
import MetaData from "../components/MetaData";

const Login = () =>{
  const [data, setData] = useState({
    email: "",
    password: ""
 });
 const { email, password } = data

 const navigate = useNavigate();

 const theme = useSelector((state) => state.theme);
 const { isAuthenticated, user } = useSelector((state) => state.user);
 const [logUser, { error }] = useLogUserMutation();

 const dataHandler=({ currentTarget: input }) =>{
   setData({ ...data, [input.name]: input.value });
 }

 useEffect(() =>{
  if(isAuthenticated){
    toast.success(`Welcome Back ${user?.name}`);
    navigate("/");
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated]);

 const handleLogin = (e) =>{
   e.preventDefault();
   logUser({ email, password });
 }

  return(
    <>
      <MetaData title={"Login"}/>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Row>
          <Col className={`${theme ? "shadow-lg" : ""}`}>
            <Form onSubmit={handleLogin} className={`${theme ? "" : "dark"}`}>
              <h1 className="mt-4 text-center">Login</h1>
              {error && <p className="alert alert-danger">{error?.data?.message}</p>}
              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Email address">
                <Form.Control type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={dataHandler}/>
              </FloatingLabel>

              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Password">
                <Form.Control type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={dataHandler}/>
              </FloatingLabel>

              <Button type="submit" className="btn-danger mt-3"
                disabled={!email || !password ? true : false}>Login</Button>

              <div className="py-4">
                <p className="text-center">
                  Don't have an account? <Link to="/register">Create one</Link>
                </p>
                <p className="text-center">
                  Forgot your password? <Link to="/password/forgotpassword">Click Here</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="mb-5"/>
    </>
  )
}

export default Login;
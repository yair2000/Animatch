import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useResetPasswordMutation } from "../../redux/services/userApi";
import MetaData from "../../components/MetaData";

const ResetPassword = () =>{
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const theme = useSelector((state) => state.theme);
  const [resetPassword, { error, isLoading, isSuccess }] = useResetPasswordMutation();

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Password Resetted Successfully");
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error, isSuccess]);

  const handleResetPassword = (e) =>{
    e.preventDefault();

    if(password !== confirmPassword){
      return toast.error("Password doesn't match. Try again");
    }
    const data = { password: password, confirmPassword: confirmPassword }
    resetPassword({ token: params?.token, body: data });
  };
  return(
    <>
      <MetaData title={"Reset password"}/>
      <Container className="d-flex justify-content-center align-items-center">
        <Row>
          <Col className="shadow-lg mt-5">
            <Form onSubmit={handleResetPassword} className={`${theme ? "" : "dark"}`}>
            <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="New Password">
              <Form.Control type="password"
              name="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>setPassword(e.target.value)}/>
            </FloatingLabel>

            <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Confirm Password">
              <Form.Control type="password"
              name="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/>
            </FloatingLabel>

              <Button type="submit" className="btn-danger mt-3"
              disabled={!password || !confirmPassword || isLoading}>{isLoading ? "Resetting" : "Reset"}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div style={{ marginBottom: "7rem" }}/>
    </>
  )
}

export default ResetPassword;
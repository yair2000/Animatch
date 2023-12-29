import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useUpdatePasswordMutation } from "../../redux/services/userApi";
import MetaData from "../../components/MetaData";
import UserSidebar from "../../components/storeComps/UserSidebar";

const UpdatePassword = () =>{
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const theme = useSelector((state) => state.theme);
  const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation();

  const navigate = useNavigate();

  useEffect(() =>{
    if(isSuccess){
      toast.success("Password Updated");
      navigate("/profile/my_profile");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handlePasswordUpdate = (e) =>{
    e.preventDefault();
    const data = { oldPassword: oldPassword, password: newPassword }
    updatePassword(data);
  }

  return(
    <>
      <MetaData title={"Update Your Password"}/>
      <UserSidebar>
        <Row>
          <Col>
            <Form onSubmit={handlePasswordUpdate} className={`${theme ? "" : "dark"}`}>
              {error && <Alert className="alert-danger" style={{ marginTop: 25 }}>{error?.data?.message}</Alert>}
              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Old Password">
                <Form.Control type="password"
                name="password"
                placeholder="Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}/>
              </FloatingLabel>
                    
              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="New Password">
                <Form.Control type="password"
                name="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
              </FloatingLabel>

              <Button type="submit" className="btn-danger mt-3"
              disabled={!oldPassword || !newPassword}>{isLoading ? "Updating..." : "Update"}</Button>
            </Form>
          </Col>
        </Row>
      </UserSidebar>
    </>
  )
}

export default UpdatePassword;
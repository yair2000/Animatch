import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "sonner";

import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../redux/services/userApi";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const UpdateUser = () =>{
  const [role, setRole] = useState("");

  const theme = useSelector((state) => state.theme);

  const navigate = useNavigate();
  const params = useParams();

  const { data } = useGetUserDetailsQuery(params?.id);

  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();

  useEffect(() =>{
    if(data?.user){
      setRole(data?.user?.role);
    }
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("User Updated");
      navigate("/admin/users");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);

  const handleUpdate = (e) =>{
    e.preventDefault();
    const data = { role }
    updateUser({ id: params?.id, body: data });
  }

  return(
    <>
      <MetaData title={"Update User"}/>
      <AdminSidebar>
        <Container>
          <Form onSubmit={handleUpdate}>
            <Form.Label data-bs-theme={theme ? "light" : "dark"}>
              <Form.Select name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
                <option value=""/>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Select>
              <Button type="submit" className="btn-danger mt-5"
              disabled={role === ""}>Update Role</Button>
            </Form.Label>
          </Form>
        </Container>
      </AdminSidebar>
      <div style={{ marginBottom: "5rem" }}/>
    </>
  )
}

export default UpdateUser
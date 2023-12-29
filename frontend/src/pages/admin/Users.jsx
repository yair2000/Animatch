import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "sonner";

import { useDeleteUserMutation, useGetAdminUsersQuery } from "../../redux/services/userApi";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const Users = () => {
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { data, error } = useGetAdminUsersQuery();
  const [deleteUser, { isLoading: isDeleteLoading, error: deleteError, isSuccess }] = useDeleteUserMutation();

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(deleteError){
      toast.error(deleteError?.data?.message);
    }
    if(isSuccess){
      toast.success("User Deleted");
    }
  },[deleteError, error, isSuccess]);

  const userDelete = (id) =>{
    deleteUser(id);
  }
  
  const setUsers = () =>{
    const users ={
      columns: [
        {
          label: "ID",
          field: "id"
        },
        {
          label: "Username",
          field: "name"
        },
        {
          label: "Email Address",
          field: "emailAddress"
        },
        {
          label: "Role",
          field: "role"
        },
        {
          label: "Joined",
          field: "joined"
        },
        {
          label: "Actions",
          field: "actions"
        }
      ],
      rows: []
    };
  
    data?.users?.forEach((userItem) =>{
      users.rows.push({
        id: userItem?._id,
        name: userItem?.name,
        emailAddress: userItem?.email,
        role: userItem?.role,
        joined: format(new Date(userItem?.date), "MMMM do yyyy"),
        actions: 
        <>
          <Link to={`/admin/user/${user?._id}/edit`}
          className="btn btn-outline-success"
          hidden={user?._id === userItem?._id}
          style={{ color: theme ? "black" : "whitesmoke" }}>
            <BsFillPencilFill size="1.2rem"/>
          </Link>
          <Button variant="outline-danger"
          onClick={() => userDelete(user?._id)}
          disabled={isDeleteLoading}
          hidden={user?._id === userItem?._id}
          style={{ color: theme ? "black" : "whitesmoke" }}>
            <FaTrash size="1.2rem"/>
          </Button>
        </>
      });
    });
    
    return users;
  }
  
  return(
    <>
      <MetaData title={"All Users"}/>
      <AdminSidebar>
        <Container>
          <h1>{data?.users?.length} Users</h1>
          <MDBDataTableV5 data={setUsers()}
          className="mt-lg-3"
          hover
          bordered
          striped
          responsive
          entries={10}
          searching={false}
          sortable={false}/>
        </Container>
      </AdminSidebar>
      <div style={{ marginBottom: "5rem" }}/>
    </>
  )
}

export default Users;
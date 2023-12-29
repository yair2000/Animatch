import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { format } from "date-fns";

import MetaData from "../../components/MetaData";
import UserSidebar from "../../components/storeComps/UserSidebar";

const Profile = () =>{
  const { user } = useSelector((state) => state.user);
  let currentDate = format(new Date(user?.date), "MMMM do yyyy");

  return(
    <>
      <MetaData title={"Your Profile"}/>
      <UserSidebar>
        <Row className="justify-content-around">
          <Col md={4}>
            <figure className="avatar avatar-profile">
              <img src={user?.picture?.url} alt={user?.name} className="rounded-circle"/>
            </figure>
          </Col>

          <Col md={4}>
            <h4>Full Name</h4>
            <p>{user?.name}</p>

            <h4>Email Address:</h4>
            <p>{user?.email}</p>

            <h4>Joined:</h4>
            <p>{currentDate}</p>
          </Col>
        </Row>
      </UserSidebar>
    </>
  );
};

export default Profile;
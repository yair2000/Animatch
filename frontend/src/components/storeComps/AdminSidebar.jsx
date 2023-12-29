import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

import SidebarConfig from "./SidebarConfig";

const AdminSidebar = ({ children }) =>{
  const theme = useSelector((state) => state.theme);

  const menuItems =[
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "All Products",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "All Orders",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "All Users",
      url: "/admin/users",
      icon: "fas fa-user",
    },
    {
      name: "All Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    }
  ];

  return(
    <div>
      <div className="mt-2 py-4">
        <h2 className="text-center fw-bolder" style={{ color: theme ? "black" : "whitesmoke" }}>Admin Sidebar</h2>
      </div>

      <Container>
        <Row className={`justify-content-around ${theme ? "" : "dark"}`}>
          <Col lg={3} className="col-12">
            <SidebarConfig menuItems={menuItems}/>
          </Col>
          <Col lg={9} className="col-12 my-2">{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminSidebar;
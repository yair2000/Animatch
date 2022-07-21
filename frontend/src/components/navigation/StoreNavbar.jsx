import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useLogOutUserMutation } from "../../services/api";
import storeLogo from "../../assets/storeLogo.png";
import Search from "./Search";

function StoreNavbar(){
    const user = useSelector(state => state.user);
    const [logoutUser] = useLogOutUserMutation();

    async function handleLogout(e){
       e.preventDefault();
       await logoutUser(user);
       window.location.replace("/");
    }

    return(
        <Navbar bg="dark" expand="lg" variant="dark" className="navbar row">
          <Container>
              <LinkContainer to="/store">
                  <Navbar.Brand>
                    <img src={storeLogo} alt="Store"/>
                  </Navbar.Brand>
              </LinkContainer>

              <div className="col-9 col-md-6 mt-2 mt-md-0">
                <Search className="mx-auto"/>
              </div>

              <Navbar.Toggle className="my-2"/>
              <Navbar.Collapse> 
              <Nav className="mx-auto">
                <LinkContainer to="/" hidden={user ? true : false}>
                  <Nav.Link>Homepage</Nav.Link>
                </LinkContainer>
                
                {user && (
                  <NavDropdown title={
                    <>
                    <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} alt={"Name"}/>
                    {user.name}
                    </>
                  } id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Homepage</NavDropdown.Item>
                    <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
                    <NavDropdown.Item href="/profile">My Account</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>
                      <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
  export default StoreNavbar;
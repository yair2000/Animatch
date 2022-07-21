import { Button, Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useLogOutUserMutation } from "../../services/api";
import logo from "../../assets/Logo.png";

function MainNavbar(){
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
              <LinkContainer to="/">
                  <Navbar.Brand>
                    <img src={logo} alt="Home" width={270}/>
                  </Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle/>
              <Navbar.Collapse> 
              <Nav className="ms-auto">

              <LinkContainer to="/register" hidden={user}>
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login" hidden={user}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/store" hidden={user}>
                <Nav.Link>Store</Nav.Link>
              </LinkContainer>

                {user && (
                  <NavDropdown className="" title={
                    <>
                    <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} alt="Name"/>
                    {user.name}
                    </>
                  } id="basic-nav-dropdown">
                      <NavDropdown.Item href="/profile">My Account</NavDropdown.Item>
                      <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
                      <NavDropdown.Item href="/store">Store</NavDropdown.Item>
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
  export default MainNavbar;
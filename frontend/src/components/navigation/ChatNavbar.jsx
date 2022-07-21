import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useLogOutUserMutation } from "../../services/api";
import chatLogo from "../../assets/chatLogo.png";

function ChatNavbar(){
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
              <LinkContainer to="/chat">
                  <Navbar.Brand>
                    <img src={chatLogo} alt="Home"/>
                  </Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-2"/>
              <Navbar.Collapse id="basic-navbar-nav"> 
              <Nav className="ms-auto">
                {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>)}
                
                
                {user && (
                  <NavDropdown title={
                    <>
                    <img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%"}} alt="Name"/>
                    {user.name}
                    </>
                  } id="basic-nav-dropdown">
                    <NavDropdown.Item href="/store">Store</NavDropdown.Item>
                    <NavDropdown.Item href="/">Homepage</NavDropdown.Item>
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
  export default ChatNavbar;
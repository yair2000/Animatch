import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Message from "../components/Message";
import ChatNavbar from "../components/navigation/ChatNavbar";

function Chat(){
  return(
    <>
    <ChatNavbar/>
    <Container>
      <Row>
        <Col md={4} className="mt-2">
          <Sidebar/>
        </Col>
        <Col md={8} className="mt-3">
          <Message/>
        </Col>
      </Row>
    </Container>
    </>
  )
}
export default Chat;
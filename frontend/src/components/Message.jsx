import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { AppContext } from "../context/appContext";
import "../pages/styles/MessageStyle.css";

function Message(){
  const [message, setMessage] = useState("");
  const { socket, currentRoom, setMessages, messages, privateMessage } = useContext(AppContext);

  const user = useSelector(state => state.user);
  const messageRef = useRef(null);

  useEffect(() =>{
    messageScroll();
  }, [messages])

  function getDateFormat(){
     const date = new Date();
     const year = date.getFullYear();
     let month = (1 + date.getMonth()).toString();
     let day = date.getDate();

     day = day.length > 1 ? day : "0" + day;
     month = month.length > 1 ? month : "0" + month;

     return day + "/" + month + "/" + year;
  }
  const currentDate = getDateFormat();
  socket.off("room-messages").on("room-messages", (roomMessages) =>{
     setMessages(roomMessages);
  });

  function messageHandler(e){
     e.preventDefault(e);
     const today = new Date();
     const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
     const hours = today.getHours();
     let time = hours + ":" + minutes
     const roomName = currentRoom;

     socket.emit("message-room", roomName, message, user, time, currentDate);
     setMessage("");
  }

  function messageScroll(){
     messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return(
    <>
      <Helmet>
        <title>The Animatch Chat</title>
      </Helmet>
      <div className="messages-output">
        { user && !privateMessage?._id && <div className="alert alert-info">Welcome to the { currentRoom } room</div>}
        { user && privateMessage?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>
                Your chat with { privateMessage.name } <img src={ privateMessage.picture } className="conversation-profile-pic" alt="pic"/>
              </div>
            </div>
          </>
        )}
        { user && messages.map(({ _id, date, messagesByDate }, idx) =>{
          return(
          <div key={ idx }>
            { messagesByDate && (<p className="alert alert-info text-center message-date-indicator">{date || _id}</p>) }
            { messagesByDate?.map(({ content, time, from: sender }, msgIdx) =>(
            <div className={ sender?.email === user?.email ? "message" : "incoming-message" } key={msgIdx}>
              <div className="message-inner mt-4">
                <div className="d-flex align-items-center mb-3">
                  <img src={ sender.picture }
                  style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} alt="pic"/>
                  <p className="message-sender">{ sender._id === user?._id ? "You" : sender.name }</p>
                </div>
                <p style={ sender._id === user?._id ? { textAlign: "left" } : { textAlign: "right" } }>{ content }</p>
                <p style={ sender._id === user?._id ? { textAlign: "left" } : { textAlign: "right" } }>{ time }</p>
              </div>
            </div>
          ))}
          </div>
        )},
        <div ref={ messageRef }/>
      )}
      </div>
        <Form onSubmit={messageHandler}>
          <Row>
            <Col className="col-9 col-md-10 col-lg-11">
              <Form.Group>
                <Form.Control
                type="text"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col className="col-md-2 col-lg-1">
              <Button variant="primary" type="submit" disabled={!message}
              style={{ width: "100%", backgroundColor: "orange" }}>
                <i className="fas fa-paper-plane"></i>
              </Button>
            </Col>
          </Row>
        </Form>
    </>
  )
}
export default Message;
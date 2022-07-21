import { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNotifications, resetNotifications } from "../reducers/userSlice";
import { AppContext } from "../context/appContext";
import "../pages/styles/SidebarStyle.css";


function Sidebar(){
  const user = useSelector(state => state.user);
  // const dispatch = useDispatch();
  const { socket, rooms, members, privateMessage, currentRoom, setMembers, setRooms, setCurrentRoom, setPrivateMessage } = useContext(AppContext);
  
  socket.off("new-user").on("new-user", (payload) =>{
     setMembers(payload);
  });

  useEffect(() =>{
    const getRooms = () =>{
      fetch("http://localhost:5001/rooms")
     .then((res) => res.json())
     .then((data) => setRooms(data));
    }
    getRooms();
    if(user){
      setCurrentRoom("Action");
      socket.emit("join-room", "Action");
      socket.emit("new-user");
    }
 },[setRooms, setCurrentRoom, socket, user]);

  function joinRoom(room, isPublic = true){
     if(!user){
       return alert("Please Login");
     }
     socket.emit("join-room", room, currentRoom);
     setCurrentRoom(room);

     if(isPublic){
       setPrivateMessage(null);
     }
    //  dispatch(resetNotifications(room));
  }
  // socket.off("notifications").on("notifications", (room) =>{
  //   console.log(room);
  //   if(currentRoom !== room){
  //      dispatch(addNotifications(room));
  //   }
  // });

  function orderIDs(id1, id2){
     if(id1 > id2){
        return id1 + "-" + id2
     }
     else{
       return id2 + "-" + id1
     }
  }

  function privateMsgHandler(member){
     setPrivateMessage(member);
     const roomID = orderIDs(member._id, user._id);
     joinRoom(roomID, false);
  }

  if(!user){
    return null
  }
  return(
    <>
      <h2 className="rooms sm: mb-3">Avaliable Rooms</h2>
        <ListGroup>
          {rooms.map((room, idx) =>(
            <ListGroup.Item key={ idx }
            onClick={ () => joinRoom(room) }
            active={ room === currentRoom }
            style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
              {room} { currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages}</span> }
            </ListGroup.Item>
          ))}
        </ListGroup>
      <h2 className="members sm: mb-3">Members</h2>
      {members.map((member, id) =>(
         <ListGroup.Item key={id} style={{ cursor: "pointer" }}
         active={ privateMessage?._id === member?._id }
         onClick={ () =>privateMsgHandler(member) }
         disabled={ member._id === user._id }>
           <Row>
             <Col xs={2} className="member-status">
               <img src={ member.picture } className="member-status-img" alt="pic"/>
               { member.status === "Online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i> }
             </Col>
             <Col xs={9}>
               { member.name }
               { member._id === user?._id && " (You)" }
               { member.status === "Offline" && " (Offline)" }
             </Col>
             <Col xs={1}>
               <span className="badge rounded-pill bg-primary">{ user.newMessages }</span>
             </Col>
           </Row>
         </ListGroup.Item>
      ))}
    </>
  )
}
export default Sidebar;
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppContext, socket } from "./context/appContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/profile/UserProfile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import Chat from "./pages/Chat";
import Store from "./pages/store/Store";
import ProductDetails from "./pages/store/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadUser } from "./reducers/user/userService";
import "./App.css";

function App(){
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(loadUser())
  }, [dispatch])

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMessage, setPrivateMessage] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return(
    <AppContext.Provider value={{ socket, rooms, setRooms, currentRoom, setCurrentRoom, members, setMembers,
    messages, setMessages, privateMessage, setPrivateMessage, newMessages, setNewMessages }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<ProtectedRoute/>}>
            <Route path="/profile" element={<UserProfile/>}/>
          </Route>
          <Route path="/profile/update" element={<ProtectedRoute/>}>
            <Route path="/profile/update" element={<UpdateProfile/>}/>
          </Route>
          {/* <Route path="/profile"
          element={
          <ProtectedRoute isAdmin={true}>
            <UserProfile/>
          </ProtectedRoute>}/> */}
          <Route path="/chat" element={<ProtectedRoute/>}>
            <Route path="/chat" element={<Chat/>}/>
          </Route>
          {/* <Route path="/chat" element={<Chat/>}/> */}
          <Route path="/store" element={<Store/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/search/:keyword" element={<Store/>}/>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
export default App;
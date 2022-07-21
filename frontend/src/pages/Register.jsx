import { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase";
import { useRegUserMutation } from "../services/api";
import profilepic from "../assets/add.png";
import MainNavbar from "../components/navigation/MainNavbar";
import Footer from "../components/Footer";
import "./styles/RegisterStyle.css";

function Register(){
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    picture: ""
  });
  const { name, email, password, picture } = data
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const [regUser, { error }] = useRegUserMutation();

  const dataHandler = ({ currentTarget: input }) =>{
     setData({ ...data, [input.name]: input.value });
  }
  console.log(data);

  useEffect(() =>{
     const uploadFile = async() =>{
       if(img.size >= 1048576){
         setImg();
         return alert("Image must be at least 1MB");
       }
       const storageRef = ref(storage, `/Profile_Pictures/${v4()}`);
       const uploadTask = uploadBytesResumable(storageRef, img);

       uploadTask.on("state_changed", (snapshot) =>{
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
         if(progress){
           alert("Upload Completed");
         }
       },
       (error) =>{
         console.log(error);
       },
       () =>{
         getDownloadURL(uploadTask.snapshot.ref).then((picture) =>{
            setData((prev) => ({ ...prev, picture }));
         });
       });
     }
     img && uploadFile();
  }, [img])

  async function handleRegister(e){
     e.preventDefault();

     regUser({name, email, password, picture: picture}).then(({data}) =>{
       if(data){
         navigate("/");
       }
     })
  };

  return(
    <>
    <MainNavbar/>
    <Container className="wrapper">
      <Row>
        <Col className="shadow-lg mt-5">
          <Form onSubmit={handleRegister} encType="multipart/form-data">
            <h1 className="mt-4 text-center">Register</h1>
            <div className="reg-profile-pic_container">
              <img src={img ? URL.createObjectURL(img) : profilepic} alt="" className="reg-profile-pic mt-2"/>
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
              type="file"
              id="image-upload"
              hidden
              onChange={(e) => setImg(e.target.files[0])}/>
            </div>

            {error && <p className="alert alert-danger" style={{ marginTop: 25 }}>{error.data}</p>}
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className="mt-3">Name</Form.Label>
              <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={dataHandler}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={dataHandler}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={dataHandler}/>
            </Form.Group>

            <Button
            type="submit"
            className="btn btn-danger mt-3"
            disabled={!name || !email || !password || !picture ? true : false}>Register</Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
         </Col>
         <div className="footer"/>
       </Row>
    </Container>
    <Footer/>
    </>
  );
}
export default Register;
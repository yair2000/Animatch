import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { updateProfile, loadUser, clearErrors } from "../../reducers/user/userService";
import MetaData from "../../components/MetaData";
import MainNavbar from "../../components/navigation/MainNavbar";
import Footer from "../../components/Footer";
import profilepic from "../../assets/add.png";

const UpdateProfile = () =>{
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState({profilepic});

  useEffect(() =>{
    if(user){
      setName(user.name);
      setEmail(user.email);
      setImgPreview(user.picture);
    }
    
    if(error){
      dispatch(clearErrors());
      return alert.error(error);
    }

    if(isUpdated){
      alert.success("User Updated Successfully");

      dispatch(loadUser());
      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [dispatch, alert, error, navigate, isUpdated]);

  async function handleUpdate(e){
     e.preventDefault();
     dispatch(updateProfile());
  };

  return(
    <>
      <MetaData title={"Update Your Profile"}/>
      <MainNavbar/>
      <Container className="wrapper">
      <Row>
        <Col className="shadow-lg mt-5">
          <Form onSubmit={handleUpdate} encType="multipart/form-data">
            <h1 className="mt-4 text-center">Update Your Profile</h1>
            <div className="reg-profile-pic_container">
            <img src={img ? URL.createObjectURL(img) : imgPreview} alt="" className="reg-profile-pic mt-2"/>
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
              onChange={(e) => setName(e.target.value)}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button
            type="submit"
            className="btn btn-danger mt-3"
            disabled={loading ? true : false}>Update</Button>
          </Form>
         </Col>
         <div className="footer"/>
       </Row>
    </Container>
    <Footer/>
    </>
  )
}
export default UpdateProfile;
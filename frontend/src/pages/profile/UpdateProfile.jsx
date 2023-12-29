import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useUpdateProfileMutation } from "../../redux/services/userApi";
import profilepic from "../../assets/add.png";
import MetaData from "../../components/MetaData";
import UserSidebar from "../../components/storeComps/UserSidebar";

const UpdateProfile = () =>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState(profilepic);
  const [updatedImg, setUpdatedImg] = useState(false);

  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const [updateProfile, { isLoading, isSuccess, error }] = useUpdateProfileMutation();

  const navigate = useNavigate();

  const validateImage = (e) =>{
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", img);

    reader.onload = () =>{
      if(reader.readyState === 2){
        setImg(reader.result);
        setUpdatedImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(() =>{
    if(user){
      setName(user?.name);
      setEmail(user?.email);
      setImgPreview(user?.picture?.url);
    }
    if(isSuccess){
      toast.success("User Updated");
      navigate("/profile/my_profile");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user, isSuccess]);

  const handleUpdate = (e) =>{
    e.preventDefault();
    const data = { name, email, picture: img }
    updateProfile(data);
  }

  return(
    <>
      <MetaData title={"Update Your Profile"}/>
      <UserSidebar>
        <Row>
          <Col>
            <Form onSubmit={handleUpdate} className={`${theme ? "" : "dark"}`}>
              <div className="reg-profile-pic_container">
                <img src={updatedImg || imgPreview} alt="" className="reg-profile-pic mt-2"/>
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"/>
                </label>
                <input type="file" id="image-upload"
                hidden
                onChange={validateImage}/>
              </div>

              {error && <Alert className="alert-danger" style={{ marginTop: 25 }}>{error?.data?.message}</Alert>}
              <FloatingLabel className="mt-5" data-bs-theme={theme ? "light" : "dark"} label="Name">
                <Form.Control type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
              </FloatingLabel>

              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Email address">
                <Form.Control type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              </FloatingLabel>

              <Button type="submit" className="btn-danger mt-5"
              disabled={!name || !email}>{isLoading ? "Updating..." : "Update"}</Button>
            </Form>
          </Col>
        </Row>
      </UserSidebar>
    </>
  )
}

export default UpdateProfile;
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../../components/MetaData";
import Loader from "../store/Loader";
import ProfileNavbar from "../../components/navigation/ProfileNavbar";
import Footer from "../../components/Footer";
import "../styles/ProfileStyle.css"

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.auth);

  return(
    <>
      {loading ? <Loader/> : (
         <>
          <ProfileNavbar/>
          <MetaData title={"Your Profile"}/>
          <h2 className="mt-5 ml-5 text-center">{`${user.name}'s Profile`}</h2>
          <div className="row justify-content-center mt-3 user-info">
            <div className="col-12 col-md-5">
              <figure className="avatar avatar-profile">
                <img src={user.picture} alt={user.name} className="rounded-circle mt-3 mx-5"/>
              </figure>
              <Link to="/profile/update" id="edit_profile" className="btn btn-danger mb-3">Edit Profile</Link>
              <div>
              {user.role === "Admin" && (
              <Link to="/orders/me" id="edit_profile" className="btn btn-danger btn-block">My Orders</Link> )}
              </div>
            </div>
            <div className="col-12 col-md-2">

              <h4 className="mx-2">Full Name</h4>
              <p className="mx-2">{user.name}</p>

              <h4 className="mx-2">Email Address:</h4>
              <p className="mx-2">{user.email}</p>

              <h4 className="mx-2">Joined:</h4>
              <p className="mx-2">{String(user.date).substring(0, 10)}</p>
              <Link to="/password/update" className="btn btn-primary btn-block mx-2 mt-2">Change Password</Link>
            </div>
            <div className="footer"/>
          </div>
          <Footer/>
         </>
      )}
    </>
  )
}
export default UserProfile;
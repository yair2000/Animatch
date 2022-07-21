import { Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet"
import MainNavbar from "../components/navigation/MainNavbar";
import Footer from "../components/Footer";
import "./styles/HomeStyle.css";

function Home(){
  const user = useSelector(state => state.user);

  return(
     <>
     <MainNavbar/>
      <Helmet>
        <title>Animatch - The World's Anime and Manga Community</title>
      </Helmet>
      <Col className="home_bg opacity-50 vh-100 vw-100">
        <h1 className="text-center mt-5">The Worldwide Anime Community Website</h1>
        <p className="text-center mt-2">Connect with other fans and share your thoughts and opinions</p>
        <LinkContainer to="/register">
          <Button className={user ? "d-none" : "btn-success d-grid gap-2 col-5 col-md-2 col-lg-1 mx-auto"}>
          Get Started
          </Button>
        </LinkContainer>
      </Col>
      <Footer/>
    </>
  )
}
export default Home;
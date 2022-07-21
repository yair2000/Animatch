import Card from 'react-bootstrap/Card';
import "../pages/styles/FooterStyle.css";

function Footer(){
    const year = new Date().getFullYear();
 
    return(
      <Card.Footer className="pt-3 pl-2 pr-2 bg-dark">
          <div>
             <p className='text-light'>Copyright &copy; {year} All rights reserved</p>
          </div>
      </Card.Footer>
    )
 }
 export default Footer;
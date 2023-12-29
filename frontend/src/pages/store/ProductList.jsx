import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const ProductList = ({ product }) =>{
  const theme = useSelector((state) => state.theme);
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return(
    <Col md={5} lg={keyword ? 5 : 4} xl={keyword ? 4 : 3} className="col-9 my-3">
      <Card className={`p-3 h-100 rounded ${theme ? "" : "dark border-dark-subtle"}`}>
        <Link to={`/product/${product._id}`}>
          <img src={product?.images[0]?.url} alt={product.name} className="card-img-top"/>
        </Link>

        <Card.Body className="justify-content-center flex-column"
        style={{ paddingLeft: "0" }}>
          <Card.Title>
            <Link to={`/product/${product._id}`} className={`text-dark text-decoration-none ${theme ? "" : "dark"}`}>{product.name}</Link>
          </Card.Title>

          <div className="mt-1 d-flex">
            <Rating
            iconsCount={5}
            initialValue={product?.rating}
            allowFraction={true}
            fillColor="#FFA41C"
            size="20px"
            readonly/>

            <span id="no_of_reviews" className={`pt-1 ps-2 ${theme ? "" : "dark"}`}>({ product.totalReviews })</span>
          </div>
        </Card.Body>
        <Card.Text className="mt-2" style={{ fontSize: "1.4rem" }}>${product.price}</Card.Text>
        <Button variant="danger" href={`/product/${product._id}`}>View Details</Button>
      </Card>
    </Col>
  )
}
export default ProductList;
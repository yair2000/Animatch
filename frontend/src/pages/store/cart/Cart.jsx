import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { FaTrash } from "react-icons/fa";
import { setCartProduct, removeCartProduct } from "../../../redux/features/cartSlice";
import MetaData from "../../../components/MetaData";
import "../../styles/CartStyle.css";

const Cart = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.theme);

  useEffect(() =>{
    if(cart.length === 0){
      navigate("/");
    }
  },[cart.length, navigate])

  const increaseQty = (item, quantity) =>{
    const newQty = quantity + 1;
    if (newQty > item?.stock) return;

    addToCart(item, newQty);
  };

  const decreaseQty = (item, quantity) =>{
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    addToCart(item, newQty);
  };

  const addToCart = (item, newQty) =>{
    const cartProducts ={
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty
    }
    dispatch(setCartProduct(cartProducts));
  }

  const removeFromCart = (id) => {
    dispatch(removeCartProduct(id));
  };

  return(
    <>
      <MetaData title={"Your Cart"}/>
      <h2 className="mx-4 mt-5" style={{ color: theme ? "black" : "whitesmoke" }}>
        <b>{`Your Cart: ${cart?.length} Products`}</b>
      </h2>

      <Row className="d-flex justify-content-between">
        <Col md={8} lg={8} className={`col-12 mx-lg-4 ${theme ? "" : "dark"}`}>
          {cart?.map((item) =>(
            <Fragment key={item?.name}>
              <hr className={`${theme ? "" : "dark"}`}/>
              <Container className={`${theme ? "" : "dark"}`}>
                <Row>
                  <Col md={4} lg={3}>
                    <img src={item?.image} alt={item?.name}
                    height="180"
                    width="150"/>
                  </Col>

                  <Col md={2} lg={3} className="mt-2 mt-md-0">
                    <Link to={`/product/${item?.product}`}
                    style={{ color: theme ? "black" : "whitesmoke", textDecoration: "none"}}>{item?.name}</Link>
                  </Col>

                  <Col md={1} lg={2} className={`col-3 mt-4 mt-md-0 mt-lg-0 text-${theme ? "dark" : "light"} fw-bold`}>
                    <p id="card_item_price">${item?.price}</p>
                  </Col>

                  <Col md={4} lg={3} className="col-5 mt-4 mt-md-0 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <Button className="btn-danger minus" onClick={() => decreaseQty(item, item.quantity)}>-</Button>
                      <Form.Control type="number" className={`count d-inline border-0 ${theme ? "" : "dark"}`}
                      value={item?.quantity}
                      readOnly/>
                      <Button className="btn-danger plus" onClick={() => increaseQty(item, item.quantity)}>+</Button>
                    </div>
                  </Col>

                  <Col md={1} lg={1} className="col-4 mt-md-0 mt-lg-0" style={{ marginTop: "1.65rem"}}>
                    <FaTrash className="icon mt-2"
                    onClick={() => removeFromCart(item?.product)}/>
                  </Col>
                </Row>
              </Container>
              <hr className={`${theme ? "" : "dark"}`}/>
            </Fragment>
          ))}
        </Col>

        <Col md={4} lg={3} className="col-8">
          <div id="order_summary" className={`border border-dark-subtle ${theme ? "" : "dark"}`}>
            <h4>Order Summary</h4>
            <hr/>
              <p>Total Items: <span className="order-summary-values">{cart.reduce((acc, item) => (acc + Number(item?.quantity)), 0)} (Units)</span></p>
              <p>Total Price: <span className="order-summary-values">${cart.reduce((acc, item) => acc + item?.quantity * item?.price, 0).toFixed(2)}</span></p>
              <hr/>
              <Link to="/shipping" id="checkout_btn" className="btn btn-danger btn-block mb-3"
              disabled={cart.length === 0}>Check Out</Link>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Cart;
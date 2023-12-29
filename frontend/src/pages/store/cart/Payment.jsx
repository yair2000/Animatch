import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { caluclateOrderCost } from "../../../components/storeComps/PriceHelper";
import { useCheckoutSessionMutation, useCreateNewOrderMutation } from "../../../redux/services/orderApi";
import Checkout from "./Checkout";
import MetaData from "../../../components/MetaData";

const Payment = () =>{
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);
  const { cart, shippingInfo } = useSelector((state) => state.cart);
  const [checkoutSession, { data: checkoutData, error: checkoutError, isLoading }] = useCheckoutSessionMutation();
  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  useEffect(() =>{
    if(checkoutData){
      window.location.href = checkoutData?.url
    }
    if(checkoutError){
      toast.error(checkoutError?.data?.message)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkoutData, checkoutError]);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }

    if(isSuccess){
      toast.success(`Successfully Purchased ${cart?.length} Products`);
      navigate("/profile/orders?order_success=true");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);

  const paymentHandler = (e) =>{
    e.preventDefault();
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cart);

    if(method === "COD"){
      const orderData ={
        shippingInfo,
        orderItems: cart,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      }
      createNewOrder(orderData);
    }
    if(method === "Card"){
      const orderData ={
        shippingInfo,
        orderItems: cart,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      }
      checkoutSession(orderData);
    }
  }

  return(
    <>
      <MetaData title={"Payment Method"}/>
      <Checkout shipping confirmOrder payment/>
        <Container>
          <Row className="d-flex justify-content-center align-items-center mb-5">
            <Col md={8} lg={5} className={`col-10 ${theme ? "shadow-lg" : ""}`}>
              <Form onSubmit={paymentHandler} className={`${theme ? "" : "dark"}`}>
                <h2>Select Payment Method</h2>
                <Form.Check>
                  <Form.Check.Input type="radio" data-bs-theme={theme ? "light" : "dark"}
                  name="payment_mode"
                  value="COD"
                  onChange={() => setMethod("COD")}/>
                  <Form.Check.Label>Cash on Delivery</Form.Check.Label>
                </Form.Check>

                <Form.Check>
                  <Form.Check.Input type="radio" data-bs-theme={theme ? "light" : "dark"}
                  name="payment_mode"
                  value="Card"
                  onChange={() => setMethod("Card")}/>
                  <Form.Check.Label>Card - VISA, MasterCard</Form.Check.Label>
                </Form.Check>

                <Button type="submit"
                className="btn-block btn-danger mt-4 py-2 col-3 col-sm-4 col-md-3"
                disabled={!method || isLoading}>Pay</Button>
              </Form>
            </Col>
          </Row>
        </Container>
    </>
  )
}

export default Payment;
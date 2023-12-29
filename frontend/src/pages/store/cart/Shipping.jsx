import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { countries } from "countries-list";

import { saveShippingInfo } from "../../../redux/features/cartSlice";
import Checkout from "./Checkout";
import MetaData from "../../../components/MetaData";

const Shipping = () =>{
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const countriesList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);

  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() =>{
    if(shippingInfo){
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNumber(shippingInfo?.phoneNumber);
      setCountry(shippingInfo?.country);
    }
  }, [shippingInfo]);

  const shippingHandler = (e) =>{
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, zipCode, phoneNumber, country }));
    navigate("/order/confirm");
  }

  return(
    <>
      <MetaData title={"Shipment Information"}/>
      <Checkout shipping/>
        <Container>
          <Row className="d-flex justify-content-center align-items-center mb-5">
            <Col lg={5} className={`col-10 ${theme ? "shadow-lg" : ""}`}>
              <Form onSubmit={shippingHandler} className={`${theme ? "" : "dark"}`}>
                <h1 className="mt-4 text-center">Shipping Information</h1>
                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Address">
                  <Form.Control type="text"
                  placeholder="Address"
                  value={address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  required/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="City">
                  <Form.Control type="text"
                  placeholder="City"
                  value={city || ""}
                  onChange={(e) => setCity(e.target.value)}
                  required/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Zip Code">
                  <Form.Control type="number"
                  placeholder="Zip Code"
                  value={zipCode || ""}
                  onChange={(e) => setZipCode(e.target.value)}
                  required/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Phone Number">
                  <Form.Control type="number"
                  placeholder="Phone Number"
                  value={phoneNumber || ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Country">
                  <Form.Select
                  name="country"
                  value={country || ""}
                  onChange={(e) => setCountry(e.target.value)}
                  required>
                  {countriesList?.map((country) => (
                    <option key={country?.name} value={country?.name}>{country?.name}</option>
                  ))}
                  </Form.Select>
                </FloatingLabel>

                <Button type="submit"
                className="btn-block btn-danger mt-4 py-2 col-sm-4 col-md-3">Confirm</Button>
              </Form>
            </Col>
          </Row>
        </Container>
    </>
  )
}

export default Shipping;
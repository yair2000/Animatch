import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

import { getPriceQueryParams } from "../../../components/storeComps/PriceHelper";

const Price = () =>{
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);

  let [searchParams] = useSearchParams();

  const priceRangeHandler = (e) =>{
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  }

  return(
    <>
      <h4 className="mx-auto">Price</h4>
        <Form onSubmit={priceRangeHandler} className="p-0">
          <Row>
            <Col md={3} lg={4} className="col-5">
              <Form.Control type="text" className="mt-1" data-bs-theme={theme ? "light" : "dark"}
              placeholder="Min"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}/>
            </Col>
            
            <br/>
            <Col md={3} lg={4} className="col-5">
              <Form.Control type="text" className="mt-1"  data-bs-theme={theme ? "light" : "dark"}
              placeholder="Max"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}/>
            </Col>

            <Col className="col-2">
              <Button type="submit" className="btn-danger mt-1">Filter</Button>
            </Col>
          </Row>
        </Form>
    </>
  )
}
export default Price;
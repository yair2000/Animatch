import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Col, Container, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { IoMdDocument } from "react-icons/io";
import { toast } from "sonner";

import { useOrderDetailsQuery } from "../../redux/services/orderApi";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";

const OrderDetails = () =>{
  const theme = useSelector((state) => state.theme);

  const params = useParams();

  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
  },[error]);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? true : false;

  return(
    <>
      <MetaData title={`Order ${order?._id} Details`}/>
      {isLoading ? <Loader/> : (
        <Container>
        <Row className="d-flex justify-content-center">
          <Col lg={9} className="col-12 mt-5">
            <div className={`d-flex justify-content-between align-items-center ${theme ? "" : "dark"}`}>
              <h3 className="mb-3">Your Order Details</h3>
              <OverlayTrigger overlay={<Tooltip data-bs-theme={theme ? "light" : "dark"}>Invoice</Tooltip>}>
                <Link to={`/invoice/order/${order?._id}`}
                style={{ color: theme ? "black" : "whitesmoke", textDecoration: "none" }}>
                  <IoMdDocument className="invoice-order-icon"/>
                </Link>
              </OverlayTrigger>
            </div>
            <Table striped bordered
            className="mb-5"
            variant={theme ? "light" : "dark"}>
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{order?._id}</td>
                </tr>

                <tr>
                  <th scope="row">Status</th>
                  <td style={{ color: order?.orderStatus !== "Delivered" ? "red" : "green" }}>
                    <b>{orderStatus}</b>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Order Date</th>
                  <td>{format(new Date(order?.orderDate), "MMMM do yyyy")}</td>
                </tr>

                {order?.orderStatus === "Delivered" ? (
                  <tr>
                    <th scope="row">Delivery Date</th>
                    <td>{format(new Date(order?.delivaryDate), "MMMM do yyyy")}</td>
                  </tr>
                ) : null}
              </tbody>
            </Table>

            <div className={`d-flex justify-content-between align-items-center ${theme ? "" : "dark"}`}>
              <h3 className="mb-3">Shipping Information</h3>
            </div>
            <Table striped bordered
            className="mb-5"
            variant={theme ? "light" : "dark"}>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{user?.name}</td>
                </tr>

                <tr>
                  <th scope="row">Phone Number</th>
                  <td>{shippingInfo?.phoneNumber}</td>
                </tr>

                <tr>
                  <th scope="row">Address</th>
                  <td>
                    {shippingInfo?.address}, {shippingInfo?.city},
                    {shippingInfo?.zipCode}, {shippingInfo?.country}
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className={`d-flex justify-content-between align-items-center ${theme ? "" : "dark"}`}>
              <h3 className="mb-3">Payment Information</h3>
            </div>
            <Table striped bordered
            className="mb-5"
            variant={theme ? "light" : "dark"}>
              <tbody>
                <tr>
                  <th scope="row">Status</th>
                  <td style={{ color: isPaid ? "green" : "red" }}>
                    <b>{paymentInfo?.status.toUpperCase()}</b>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Method</th>
                  <td>{order?.paymentMethod}</td>
                </tr>

                <tr>
                  <th scope="row">Payment ID</th>
                  <td>{paymentInfo?.id || "Nill"}</td>
                </tr>

                <tr>
                  <th scope="row">Price</th>
                  <td>${itemsPrice}</td>
                </tr>

                {shippingPrice ? (
                  <tr>
                    <th scope="row">Shipping</th>
                    <td>${shippingPrice}</td>
                  </tr>
                ) : null}
                
                <tr>
                  <th scope="row">Taxes</th>
                  <td>${taxPrice}</td>
                </tr>

                <tr>
                  <th scope="row">Total Price</th>
                  <td>${totalPrice}</td>
                </tr>
              </tbody>
            </Table>

            <div className={`my-1 ${theme ? "" : "dark"}`}>
              <h3>Products</h3>
              <hr style={{ color: theme ? "black" : "whitesmoke" }}/>
              {orderItems?.map((item) =>(
                <Row className="mb-5" key={item?.name} style={{ marginLeft: "0"}}>
                  <Col md={3} lg={3} className={`col-5 ${theme ? "" : "dark"}`}>
                    <img src={item?.image} alt={item?.name}
                    height="150"
                    width="130"/>
                  </Col>

                  <Col md={5} lg={4} className="col-4">
                    <Link to={`/products/${item?.product}`}
                    style={{ color: theme ? "black" : "whitesmoke", textDecoration: "none"}}>{item?.name}</Link>
                  </Col>

                  <Col md={2} lg={2} className={`col-4 mt-4 mt-md-0 mt-lg-0 text-${theme ? "dark" : "light"} fs-4 fw-bold`}>
                    <p>${item?.price}</p>
                  </Col>

                  <Col md={2} lg={3} className={`col-4 mt-4 mt-md-1 mt-lg-1 text-${theme ? "dark" : "light"} fw-bold`}>
                    <p>x {item?.quantity}</p>
                  </Col>
                </Row>
              ))}
            </div>
            <hr/>
          </Col>
        </Row>
        <div style={{ marginBottom: "5rem" }}/>
      </Container>
      )}
    </>
  )
}

export default OrderDetails;
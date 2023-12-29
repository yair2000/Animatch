import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { IoMdPrint } from "react-icons/io";
import { toast } from "sonner";

import { useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/services/orderApi";
import { ORDER_OPTIONS } from "../../constants/productConstants";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const UpdateOrder = () =>{
  const [status, setStatus] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);

  const { data } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation()

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

  useEffect(() =>{
    if(orderStatus){
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Order Updated");
      navigate("/admin/orders")
    }
  }, [error, isSuccess, navigate])

  const updateOrderHandler = (id) =>{
    const data = { status };
    updateOrder({ id, body: data })
  };

  return(
    <AdminSidebar>
    <MetaData title={`Process Order ${order?._id}`}/>
      <Row className="d-flex justify-content-around">
        <Col lg={9} className="col-12">
          <h3 className="mb-2">Order Details</h3>
          <Table striped bordered
          variant={theme ? "light" : "dark"}>
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td>
                  <b className={String(orderStatus).includes("Delivered") ? "greenColor" : "redColor"}>{orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </Table>

          <h3 className="mt-3 mb-2">Shipping Info</h3>
          <Table striped bordered
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

          <h3 className="mt-3 mb-2">Payment Info</h3>
          <Table striped bordered
          variant={theme ? "light" : "dark"}>
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{paymentInfo?.status?.toUpperCase()}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Payment ID</th>
                <td>{paymentInfo?.id || "Null"}</td>
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

          <h3 className="mt-3 my-2">Order Items:</h3>
          <hr/>
          <div className="my-1">
            {orderItems?.map((item) =>(
              <Row className="my-3" key={item?.name}>
                <Col md={3} lg={3} className="col-5">
                  <img src={item?.image} alt={item?.name}
                  height="150"
                  width="130"/>
                </Col>

                <Col md={5} lg={4} className="col-4">
                  <Link to={`/product/${item?.product}`}
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

        <Col lg={3} className="col-12 mt-3">
          {order?.orderStatus !== "Delivered" && (
            <>
              <h4 className="my-2">Status</h4>
              <div className="mb-3">
                <Form.Select data-bs-theme={theme ? "light" : "dark"}
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                {ORDER_OPTIONS.map((option) =>(
                  <option key={option} value={option}>{option}</option>
                ))}
                </Form.Select>
              </div>

              <Button className="btn-danger"
              onClick={() => updateOrderHandler(order?._id)}
              disabled={status === order.orderStatus}>Update Status</Button>
            </>
          )}
          <br/>
          <Link to={`/invoice/order/${order?._id}`}
          className="btn btn-success mt-3"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <IoMdPrint className="invoice-icon"/>Generate Invoice
          </Link>
        </Col>
      </Row>
      <div style={{ marginBottom: "5rem" }}/>
    </AdminSidebar>
  )
}

export default UpdateOrder;
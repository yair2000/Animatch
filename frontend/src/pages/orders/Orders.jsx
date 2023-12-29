import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "sonner";

import { clearCart } from "../../redux/features/cartSlice";
import { useMyOrdersQuery } from "../../redux/services/orderApi";
import MetaData from "../../components/MetaData";

const ProfileOrders = () =>{
  const theme = useSelector((state) => state.theme);
  const { data, error } = useMyOrdersQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get("order_success")

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(orderSuccess){
      dispatch(clearCart());
      navigate("/profile/orders?order_success=true");
    }
  },[dispatch, error, navigate, orderSuccess]);

  const setOrders = () =>{
    const orders ={
      columns: [
        {
          label: "Order ID",
          field: "id"
        },
        {
          label: "Price",
          field: "price"
        },
        {
          label: "Payment Status",
          field: "status"
        },
        {
          label: "Order Status",
          field: "orderStatus"
        },
        {
          label: "Order Date",
          field: "orderDate"
        },
        {
          label: "Actions",
          field: "actions"
        },
      ],
      rows: []
    };

    data?.orders?.forEach((order) =>{
      orders.rows.push({
        id: order?._id,
        price: `$${order?.totalPrice}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        orderDate: format(new Date(order?.orderDate), "MMMM do yyyy"),
        actions: 
        <>
          <Link to={`/profile/orders/${order?._id}`}
          className="btn btn-outline-info"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <FaRegEye size="1.4rem"/>
          </Link>
          <Link to={`/invoice/order/${order?._id}`}
          className="btn btn-outline-success ms-lg-2"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <IoMdDocument size="1.4rem"/>
          </Link>
        </>
      });
    });

    return orders;
  }

  return(
    <>
      <MetaData title={"Your Orders"}/>
      <Container className={`${theme ? "" : "dark"}`}>
        <h1 className="mt-4">{data?.orders?.length} Orders</h1>
        <MDBDataTableV5 data={setOrders()}
        className="mt-lg-5"
        hover
        bordered
        striped
        responsive
        searching={false}
        sortable={false}/>
      </Container>
    </>
  )
}

export default ProfileOrders;
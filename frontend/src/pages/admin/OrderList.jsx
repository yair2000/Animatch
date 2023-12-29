import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "sonner";

import { useDeleteOrderMutation, useGetAdminOrdersQuery } from "../../redux/services/orderApi";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const OrderList = () => {
  const theme = useSelector((state) => state.theme);
  const { data, error } = useGetAdminOrdersQuery();
  const [deleteOrder, { isLoading: isDeleteLoading, error: deleteError, isSuccess }] = useDeleteOrderMutation();
  
  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(deleteError){
      toast.error(deleteError?.data?.message);
    }
    if(isSuccess){
      toast.success("Order Deleted");
    }
  },[deleteError, error, isSuccess]);

  const orderDelete = (id) =>{
    deleteOrder(id);
  }
  
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
        }
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
          <Link to={`/admin/order/${order?._id}/edit`}
          className="btn btn-outline-success"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <BsFillPencilFill size="1.2rem"/>
          </Link>
          <Button variant="outline-danger"
          onClick={() => orderDelete(order?._id)}
          disabled={isDeleteLoading}
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <FaTrash size="1.2rem"/>
          </Button>
        </>
      });
    });
    
    return orders;
  }
  
  return(
    <>
      <MetaData title={"All Orders"}/>
      <AdminSidebar>
        <Container>
          <h1>{data?.orders?.length} Orders</h1>
          <MDBDataTableV5 data={setOrders()}
          className="mt-lg-3"
          hover
          bordered
          striped
          responsive
          entries={10}
          searching={false}
          sortable={false}/>
        </Container>
      </AdminSidebar>
      <div style={{ marginBottom: "5rem" }}/>
    </>
  )
}

export default OrderList;
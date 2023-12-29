import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useLazyGetDashboardSalesQuery } from "../../redux/services/orderApi";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import SalesChart from "../../components/storeComps/SalesChart";
import MetaData from "../../components/MetaData";

const Dashboard = () =>{
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, { error, data }] = useLazyGetDashboardSalesQuery();

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }

    if(startDate && endDate && !data){
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString()
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salesHandler = () =>{
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString()
    });
  }

  return(
    <AdminSidebar>
      <MetaData title={"Admin Dashboard"}/>
      <div className="d-md-flex d-lg-flex justify-content-start align-items-center">
        <div className="mb-2 me-4">
          <DatePicker
          className="mt-md-2 mt-lg-2"
          dateFormat={"MMMM dd, yyyy"}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}/>
        </div>
        <div className="mb-2">
          <DatePicker
          className="mt-md-2 mt-lg-2"
          dateFormat={"MMMM dd, yyyy"}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}/>
        </div>

        <Button variant="danger" className="ms-md-4 ms-lg-4"
        onClick={salesHandler}>Fetch</Button>
      </div>

      <Row className="my-5">
        <Col xl={6} className="col-6 mb-3">
          <Card className="text-white bg-success o-hidden h-100">
            <Card.Body>
              <Card.Title className="text-center">Sales
              <br/>
              <b>${data?.totalSales.toFixed(2)}</b>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-6 mb-3">
          <Card className="text-white bg-danger o-hidden h-100">
            <Card.Body>
              <Card.Title className="text-center">Orders
              <br/>
              <b>{data?.totalNumOrders}</b>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <SalesChart salesData={data?.sales}/>
      <div style={{ marginBottom: "7rem" }}/>
    </AdminSidebar>
  )
}

export default Dashboard;
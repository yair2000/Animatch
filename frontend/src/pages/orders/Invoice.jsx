import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import { Button, Container, Row, Table } from "react-bootstrap";
import { toast } from "sonner";
import html2canvas from "html2canvas";

import { useOrderDetailsQuery } from "../../redux/services/orderApi";

import logo from "../../assets/Logo.png";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";
import "../styles/InvoiceStyle.css";

const Invoice = () =>{
  const theme = useSelector((state) => state.theme);

  const params = useParams();

  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
  }, [error]);

  const { shippingInfo, orderItems, paymentInfo, user } = order;

  const downloadInvoiceHandler = () =>{
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();

      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}.pdf`);
    });
  }

  return(
    <div>
      <MetaData title={`Invoice ${order?._id}`}/>
      {isLoading ? <Loader/> : (
        <Container className="order-invoice my-5">
          <Row className="d-flex justify-content-center mb-5">
            <Button variant="success" className="col-6 col-md-3 col-lg-2 justify-content-center"
            onClick={downloadInvoiceHandler}>
              Download Invoice
            </Button>
          </Row>

          <section id="order_invoice" className={`p-3 border border-secondary ${theme ? "" : "bg-light"}`}>
            <header className="clearfix">
              <section id="logo">
                <img src={logo} alt="Logo"/>
              </section>
              <h1>Invoice #{order?._id}</h1>
              <section id="company" className="clearfix">
                <div>Animatch</div>
                <div>
                  Menachem Begin 137, Tel-Aviv
                  <br/>
                  Israel
                </div>
                <div>+972502151798</div>
                <div>
                 <a href="mailto:info@animatch.com">info@animatch.com</a>
                </div>
              </section>

              <section id="project">
                <div>
                  <span>Name</span>{user?.name}
                </div>
                <div>
                  <span>Email</span>{user?.email}
                </div>
                <div>
                  <span>Phone</span>{shippingInfo?.phoneNumber}
                </div>
                <div>
                  <span>Address</span>
                  {shippingInfo?.address}, {shippingInfo?.city},
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </div>
                <div>
                  <span>Date</span>
                  {format(new Date(order?.orderDate), "MMMM do yyyy")}
                </div>
                <div>
                  <span>Status</span>{paymentInfo?.status.toUpperCase()}
                </div>
              </section>
            </header>

            <main>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="service">ID</th>
                    <th className="desc">Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems?.map((item) =>(
                    <tr key={item}>
                      <td className="service">{item?.product}</td>
                      <td className="desc">{item?.name}</td>
                      <td className="unit">${item?.price}</td>
                      <td className="qty">{item?.quantity}</td>
                      <td className="total">${item?.price * item?.quantity}</td>
                    </tr>
                  ))}
                  
                  <tr>
                    <td colSpan="4">
                      <b>SUBTOTAL</b>
                    </td>
                    <td className="total">${order?.itemsPrice}</td>
                  </tr>

                  <tr>
                    <td colSpan="4">
                      <b>TAX 15%</b>
                    </td>
                    <td className="total">${order?.taxPrice}</td>
                  </tr>

                  <tr>
                    <td colSpan="4">
                      <b>SHIPPING</b>
                    </td>
                    <td className="total">${order?.shippingPrice}</td>
                  </tr>

                  <tr>
                    <td colSpan="4" className="grand total">
                      <b>GRAND TOTAL</b>
                    </td>
                    <td className="grand total">${order?.totalPrice}</td>
                  </tr>
                </tbody>
              </Table>
              <div id="notices">
                <b className="notice">Notice:</b>
                <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
              </div>
            </main>
            <footer className="position-relative">Invoice was created on a computer and is valid without the signature.</footer>
          </section>
          <div style={{ marginBottom: "5rem" }}/>
        </Container>
      )}
    </div>
  )
}

export default Invoice;
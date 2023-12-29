import { Link } from "react-router-dom";

import "../../styles/OrderStyle.css"

const Checkout = ({ shipping, confirmOrder, payment }) =>{
  return(
    <div className="checkout-progress d-flex justify-content-center align-items-center mx-4 mr-md-2">
      {shipping ?
      <Link to="/shipping" className="px-2">
        <div className="step active-step">Shipping</div>
      </Link> :
      <Link to="#!" disabled className="px-2">
        <div className="step incomplete">Shipping</div>
      </Link>}

      {confirmOrder ?
      <Link to="/order/confirm" className="px-2">
        <div className="step active-step">Confirm Order</div>
      </Link> :
      <Link to="#!" disabled className="px-2">
        <div className="step incomplete">Confirm Order</div>
      </Link>}

      {payment ?
      <Link to="/payment_method" className="px-2">
        <div className="step active-step">Payment</div>
      </Link> :
      <Link to="#!" disabled className="px-2">
        <div className="step incomplete">Payment</div>
      </Link>}
    </div>
  )
}
export default Checkout;
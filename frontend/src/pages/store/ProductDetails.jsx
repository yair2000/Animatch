import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import { clearErrors, getProductDetails } from "../../reducers/product/productService";
import { addItemsToCart } from "../../reducers/cart/cartService";
import StoreNavbar from "../../components/navigation/StoreNavbar";
import Footer from "../../components/Footer";
import Loader from "./Loader";
import MetaData from "../../components/MetaData";

const ProductDetails = () =>{
  const [quantity, setQuantity] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(state => state.user);
  const { loading, product, error } = useSelector(state =>state.productDetails);

  useEffect(() =>{
     dispatch(getProductDetails(params.id));
     
     if(error){
        alert.error(error);
        dispatch(clearErrors());
     }

  },[dispatch, alert, error, params.id]);

  const increaseQty = () =>{
     const count = document.querySelector(".count");
     if(count.valueAsNumber >= product.stock) return;

     const qty = count.valueAsNumber + 1;
     setQuantity(qty);
  }

  const decreaseQty = () =>{
     const count = document.querySelector(".count");
     if(count.valueAsNumber <= 1) return;

     const qty = count.valueAsNumber - 1;
     setQuantity(qty);
  }

  const addToCart = () =>{
     dispatch(addItemsToCart(params.id, quantity));
     return alert.success("Item added to the cart");
  }

  return(
    <>
      {loading ? <Loader/> : (
        <>
          <StoreNavbar/>
          <MetaData title={product.productName}/>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause="hover">
              {product.images && product.images.map(image =>(
              <Carousel.Item key={image.public_id}>
                <img className="d-block w-100" src={image.url} alt={product.title} height={480}/>
              </Carousel.Item>
              ))}
            </Carousel>
          </div>

            <div className="col-12 col-lg-5 mt-3 p-3">
              {!user ? <h3 style={{ marginTop: "8.5rem" }}>{product.productName}</h3> : <h3>{product.productName}</h3>}
              <hr/>

              <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%`}}></div>
              </div>  
              <span id="no_of_reviews">({product.totalReviews} reviews)</span>
              <hr/>

              <p id="product_price">${product.price}</p>
              {user && (
                 <>
                 <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                  <input type="number" className="form-control count d-inline" value={quantity} readOnly={true}/>
                  <span className="btn btn-danger plus" onClick={increaseQty}>+</span>
                </div>
                <button type="button" id="cart_btn" className="btn btn-primary d-inline mx-4" onClick={addToCart}>Add to Cart</button>
                 </>
              )}
              <hr/>

              <p>Status: <span id="stock_status">{product.status}</span></p>
              <p>Stock: <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? product.stock : "Out of stock"}</span>
              </p>
              <hr/>

              <h4 className="mb-3">Description</h4>
              <p>{product.description}</p>
              <p id="product_seller mt-2">Sold by: {product.seller}</p>

              {user && (
                <button id="review_btn" type="button"
                className="btn btn-primary mt-3"
                dataToggle="modal"
                dataTarget="#ratingModal">Submit your Review</button>
              )}

              {user && (
                 <div className="row mt-2 mb-5">
                 <div className="rating d-flex justify-content-start">
                   <div className="modal_fade" id="ratingModal"
                   tabIndex={-1} role="dialog"
                   aria-labelledby="ratingModalLabel"
                   aria-hidden="true">
                     <div className="modal-dialog pb-3" role={document}>
                       <div className="modal-content">
                         <div className="modal-header">
                           <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                           <button type="button" className="close" data-dismiss="modal" aria-label="close">
                             <span aria-hidden="true">&times;</span>
                           </button>
                         </div>
 
                         <div className="modal-body">
                           <ul className="stars">
                             <li className="star"><i className="fa fa-star"></i></li>
                             <li className="star"><i className="fa fa-star"></i></li>
                             <li className="star"><i className="fa fa-star"></i></li>
                             <li className="star"><i className="fa fa-star"></i></li>
                             <li className="star"><i className="fa fa-star"></i></li>
                           </ul>
 
                           <textarea name="review" id="review" className="form-control mt-3"/>
                           <button
                           className="btn my-3 float-right review-btn px-4 text-white"
                           data-dismiss="modal"
                           aria-label="close">Submit</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
              )}
            </div>
            {!user && (
               <div className="footer"/>
            )}
          </div>
          <Footer/>
        </>
      )}
    </>
  )
}
export default ProductDetails;
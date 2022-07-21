import { Link } from "react-router-dom"

const ProductList = ({ product, col }) =>{
  return(
    <div className={`col-10 col-md-6 col-lg-${col} my-2`}>
     <div className="card p-3 rounded">
       <Link to={`/product/${product._id}`}><img src={ product.images[0].url } alt={product.productName} className="card-img-top mx-auto"/></Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.productName}</Link>
          </h5>
           <div className="rating mt-auto">
            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%`}}/></div>
               <span id="no_of_reviews">({ product.totalReviews } reviews)</span>
              </div>
            <p className="card-text">${product.price}</p>
            <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block mb-3">View Details</Link>
        </div>
      </div>
    </div>
  )
}
export default ProductList;
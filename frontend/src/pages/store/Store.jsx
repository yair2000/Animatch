import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import StoreNavbar from "../../components/navigation/StoreNavbar";
import Footer from "../../components/Footer";
import 'rc-slider/assets/index.css';

import { getProducts } from "../../reducers/product/productService";
import MetaData from "../../components/MetaData";
import ProductList from "./ProductList";
import Loader from "./Loader";
import "../styles/StoreStyle.css"

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Store = () =>{
  const[currentPage, setCurrentPage] = useState(1);
  const[price, setPrice] = useState([1, 1000]);
  const[category, setCategory] = useState("");
  const[ratings, setRatings] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const categories = [
    "Manga",
    "Toys",
    "Miscellaneous"
  ]

  const { loading, products, error, productsCount, resPerPage, filterProductsCount } = useSelector(state =>state.products)

  const keyword = params.keyword

  useEffect(() =>{
     if(error){
        alert.error(error)
     }
     dispatch(getProducts(keyword, currentPage, price, category, ratings));

  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

  function setCurrentPageNo(pageNumber){
     setCurrentPage(pageNumber)
  }

  let count = productsCount;
  if(keyword){ // Shows the results of any product with the written keyword in the name
     count = filterProductsCount
  }

  return(
    <>
    {loading ? <Loader/> : (
      <>
      <StoreNavbar/>
       <MetaData title={"The Animatch Store - The best merchandise of the anime world"}/>
       <div className="container container-fluid">
          <h1 id="products_heading">Latest Products</h1>
   
          <section id="products" className="container">
            <div className="row">
             {keyword ? (
                <>
                     <div className="col-12 col-md-9 col-lg-9 mt-3">
                        <div className="row">
                           {products && products.map(product =>(
                              <ProductList key={product._id} product={product} col={4}/>
                           ))}
                        </div>
                     </div>

                     <div className="col-12 col-lg-3 mt-5 mb-5">
                     <div className="px-5">
                        <Range
                        marks={{
                           1: `$1`,
                           1000: `$1000`
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                           placement: "top",
                           visible: true,
                        }}
                        value={price}
                        onChange={price =>setPrice(price)}/>

                        <div className="mt-5">
                           <h4 className="mb-3">Categories</h4>
                           <div className="pl-0">{categories.map(category =>(
                              <li
                              style={{ cursor: "pointer", listStyleType: "none", marginBottom: "7px" }}
                              key={category}
                              onClick={() =>setCategory(category)}>{category}</li>
                           ))}</div>
                        </div>

                        <hr className="my-3"/>

                        <div className="mt-3">
                           <h4 className="mb-3">Ratings</h4>
                           <div className="pl-0">{[5,4,3,2,1].map(star =>(
                              <li
                              style={{ cursor: "pointer", listStyleType: "none", marginBottom: "7px" }}
                              key={star}
                              onClick={() =>setRatings(star)}>
                                 <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${star * 20}%` }}>

                                    </div>
                                 </div>
                              </li>
                           ))}</div>
                        </div>
                     </div>
                  </div>
                  </>

             ) : (products && products.map(product =>(
                <ProductList key={product._id} product={product} col={3}/>
               ))
             )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-3">
               <Pagination
               activePage={currentPage}
               itemsCountPerPage={resPerPage}
               totalItemsCount={productsCount}
               onChange={setCurrentPageNo}
               nextPageText={'Next'}
               prevPageText={'Prev'}
               firstPageText={'First'}
               lastPageText={'Last'}
               itemClass="page-item"
               linkClass="page-link"/>
            </div>
            )}
            <div className="footer"/>
       </div>
       <Footer/>
       </>
    )}
    </>
  )
}
export default Store;
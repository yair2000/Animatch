import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetProductsQuery } from "../../redux/services/productApi";
import CustomPagination from "../../components/storeComps/CustomPagination";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";
import Category from "./filters/Category";
import Price from "./filters/Price";
import RatingSearch from "./filters/Rating";
import ProductList from "./ProductList";
import "../styles/StoreStyle.css"

const Store = () =>{

  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1
  const keyword = searchParams.get("keyword") || ""
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const params = { page, keyword }

  // Don't show values
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  rating !== null && (params.rating = rating);
  
  const { data, isLoading } = useGetProductsQuery(params);
  const theme = useSelector((state) => state.theme);

  return(
    <>
      <MetaData title={"Animatch"}/>
      {isLoading ? <Loader/> : (
        <Container className={`mt-3 ${theme ? "" : "dark"}`}>
          {!isLoading && (
            <h1 id="products_heading" style={{ marginLeft: keyword ? "0.8rem" : ""}}>{keyword ? `${data?.filterProductsCount} Products found` : "All Products"}</h1>
          )}
          <Container id="products">
            <Row>
              {keyword ? (
                <>
                  <Col>
                    <Row className="mt-3">
                      {data?.products?.map(product =>(
                        <ProductList key={product._id} product={product}/>
                      ))}
                    </Row>
                  </Col>

                  <Col lg={3} className="col-8 mt-4 mb-5">
                    <Container>
                      <Price/>
                      <hr/>
                      <Category/>
                      <hr/>
                      <RatingSearch/>
                    </Container>
                  </Col>
                </>
              ) : (data?.products?.map(product =>(
                    <ProductList key={product._id} product={product}/>
                ))
              )}
            </Row>
          </Container>
        <CustomPagination resPerPage={data?.resPerPage} filterProductsCount={data?.filterProductsCount}/>
        <div style={{ marginBottom: "5rem" }}/>
        </Container>
      )}
    </>
  )
}

export default Store;
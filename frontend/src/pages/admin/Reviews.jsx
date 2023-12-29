import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Col, Form, InputGroup, Row } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import { FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

import { useDeleteProductReviewMutation, useLazyGetProductReviewsQuery } from "../../redux/services/productApi";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const Reviews = () =>{
  const [productId, setProductId] = useState("");

  const theme = useSelector((state) => state.theme);
  const [getProductReviews, { data, error }] = useLazyGetProductReviewsQuery();
  const [deleteProductReview, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] = useDeleteProductReviewMutation()

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(deleteError){
      toast.error(deleteError?.data?.message);
    }
    if(isSuccess){
      toast.success("Review Deleted");
    }
  },[deleteError, error, isSuccess]);

  const setReviews = () =>{
    const reviews ={
      columns: [
        {
          label: "Review ID",
          field: "id"
        },
        {
          label: "Rating",
          field: "rating"
        },
        {
          label: "Comment",
          field: "comment"
        },
        {
          label: "User",
          field: "user"
        },
        {
          label: "Actions",
          field: "actions"
        }
      ],
      rows: []
    };

    const deleteReviewHandler = (id) =>{
      deleteProductReview({ productId, id });
    };

    data?.reviews?.forEach((review) =>{
      reviews.rows.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,
        actions: 
        <>
          <Button variant="outline-danger"
          className="ms-lg-2"
          style={{ color: theme ? "black" : "whitesmoke"}}
          onClick={() => deleteReviewHandler(review?._id)}
          disabled={isDeleteLoading}>
            <FaTrash size="1.2rem"/>
          </Button>
        </>
      });
    });
    
    return reviews;
  }

  const reviewHandler = (e) =>{
    e.preventDefault();
    getProductReviews(productId);
  }

  return(
    <>
      <MetaData title={"All Reviews"}/>
      <AdminSidebar>
        <Container>
          <Row className="justify-content-center my-3">
            <Col lg={6} className="col-12">
              <Form onSubmit={reviewHandler}>
                <InputGroup>
                  <Form.Control type="text"
                  placeholder="Search"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}/>
                  <div>
                    <Button type="submit" className="border-danger btn-danger">
                      <FaSearch aria-hidden="true" className="icon"/>
                    </Button>
                  </div>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          {data?.reviews?.length > 0 ? (
          <>
            <h1>{data?.reviews?.length} Total Reviews</h1>
            <MDBDataTableV5 data={setReviews()}
            className="mt-lg-3"
            hover
            bordered
            striped
            responsive
            entries={10}
            searching={false}
            sortable={false}/>
          </>
          ) : (<p className="mt-3 text-center">No Reviews</p>)}
        </Container>
      </AdminSidebar>
    </>
  )
}

export default Reviews
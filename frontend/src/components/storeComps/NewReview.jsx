import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Modal, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";

import { useGetProductDetailsQuery, useSubmitReviewMutation } from "../../redux/services/productApi";

const NewReview = ({ productId }) =>{
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams();
  const { data } = useGetProductDetailsQuery(params?.id);
  const [submitReview, { error, isLoading, isSuccess }] = useSubmitReviewMutation();
  const product = data?.product;

  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }

    if(isSuccess){
      toast.success("Review Posted");
    }
  }, [error, isSuccess]);

  const reviewHandler = () =>{
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  }
  return(
    <div>
      <Button variant="danger"
      className="mt-4"
      data-bs-toggle="modal"
      data-bs-target="#ratingModal"
      hidden={product?.seller === user?.name}>Submit your review</Button>

      <Row className="mt-2 mb-5" data-bs-theme={theme ? "light" : "dark"}>
        <div className="rating w-50">
          <div id="ratingModal" className="modal fade">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title id="ratingModalLabel">Submit Review</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Rating
                iconsCount={5}
                initialValue={0}
                fillColor="#FFA41C"
                size="60px"
                allowFraction={true}
                onClick={(e) => setRating(e)}/>
                <br/>
                <textarea
                name="review"
                id="review"
                className="mt-3 w-100"
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}>
                </textarea>

                <Button variant="danger" id="new_review_btn"
                className="w-100 px-2 mt-3"
                data-bs-dismiss="modal"
                aria-label="close"
                onClick={reviewHandler}
                disabled={isLoading || !comment}>Submit</Button>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        </div>
      </Row>
    </div>
  )
}

export default NewReview;
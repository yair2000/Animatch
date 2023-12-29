import { Rating } from "react-simple-star-rating";

const ReviewList = ({ reviews }) =>{
  return(
    <div className="reviews">
      <h3 className="px-3">Reviews:</h3>
      <hr/>
      {reviews && reviews.map(review =>(
        <div key={review._id} className="px-3 py-3">
          <img src={review?.user?.picture?.url} alt="" width="45" height="45" className="mx-1 rounded-circle"/>
            <p className="px-1 py-2">by {review?.user?.name}</p>
            <Rating
            iconsCount={5}
            allowFraction={true}
            initialValue={review?.rating}
            fillColor="#FFA41C"
            size="22px"
            readonly/>
            <p className="px-1 py-2">{review?.comment}</p>
        </div>
       ))}
    </div>
  )
}
export default ReviewList;
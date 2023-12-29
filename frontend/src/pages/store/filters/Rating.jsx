import { useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const RatingSearch = () =>{
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ratingHandler = (checkbox) =>{
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) =>{
      if(item !== checkbox) item.checked = false
    });

    if(checkbox.checked === false){
      if(searchParams.has(checkbox.name)){
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    }
    else{
      if(searchParams.has(checkbox.name)){
        searchParams.set(checkbox.name, checkbox.value);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
      else{
        searchParams.append(checkbox.name, checkbox.value);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    }
  }

  const checkedHandler = (checkboxType, checkboxValue) =>{
    const value = searchParams.get(checkboxType);
    if(checkboxValue === value) return true;
    return false;
  }

  return(
    <>
      <h5 className="mb-3">Ratings</h5>
      {[5,4,3,2,1].map(stars =>(
         <Form.Check key={stars}>
          <Form.Check.Input type="checkbox"
          name="rating"
          id="ratings"
          value={stars}
          defaultChecked={checkedHandler("ratings", stars?.toString())}
          onClick={(e) => ratingHandler(e.target)}/>
          <Rating
          iconsCount={5}
          initialValue={stars}
          allowFraction={true}
          fillColor="#FFA41C"
          style={{ marginTop: "-5px", marginLeft: "7px" }}
          name="rating"
          size="20px"
          readonly/>
       </Form.Check>
      ))}
    </>
  )
}
export default RatingSearch;
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";

import { PRODUCT_CATEGORIES } from "../../../constants/productConstants";

const Category = () =>{
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryHandler = (checkbox) =>{
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) =>{
      if(item !== checkbox) item.checked = false // Can only select one checkbox
    });

    if(checkbox.checked === false){ // Delete category filter from the url
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
      <h5 className="mb-3">Categories</h5>
      {PRODUCT_CATEGORIES.filter(category =>{
        if(category === ""){
          return false
        }
        return true
      })
      .map((category) =>(
        <Form.Check key={category}>
          <Form.Check
          name="category"
          value={category}
          label={category}
          defaultChecked={checkedHandler("category", category)}
          onClick={(e) => categoryHandler(e.target)}/>
        </Form.Check>
      ))}
    </>
  );
};

export default Category;
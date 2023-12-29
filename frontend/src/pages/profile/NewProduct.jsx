import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { PRODUCT_CATEGORIES, PRODUCT_CONDITION } from "../../constants/productConstants";
import { useCreateProductMutation } from "../../redux/services/productApi";

import MetaData from "../../components/MetaData";
import UserSidebar from "../../components/storeComps/UserSidebar";

const NewProduct = () =>{
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    seller: user?.name,
    stock: "",
    condition: ""
  });
  const { name, description, price, category, stock, condition } = product;
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);
  const [createProduct, { error, isLoading, isSuccess }] = useCreateProductMutation();

  const productDataHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validateProductImage = (e) =>{
    const files = Array.from(e.target.files);

    files.forEach((file) =>{
      const reader = new FileReader();

      reader.onload = () =>{
        if(reader.readyState === 2){
          setImagesPreview((oldArray) =>[...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Product created");
      navigate("/");
    }
  }, [error, isSuccess, navigate]);

  const createProductHandler = (e) =>{
    e.preventDefault();
    const productWithImages = { ...product, images: images };
    createProduct(productWithImages);
  };

  return(
    <>
      <UserSidebar>
      <MetaData title={"Create A New Product"}/>
        <Row>
          <Col lg={10} className="col-12 mt-lg-0">
            <Form onSubmit={createProductHandler}
            className={`product-form ${theme ? "shadow-lg" : "dark"}`}>

              <FloatingLabel data-bs-theme={theme ? "light" : "dark"} label="Product Name">
                <Form.Control type="text"
                name="name"
                placeholder="Product Name"
                value={name}
                onChange={productDataHandler}/>
              </FloatingLabel>

              <Form.Label className="mt-2"/>
                <Form.Control as="textarea" data-bs-theme={theme ? "light" : "dark"}
                rows={8}
                name="description"
                placeholder="Description"
                value={description}
                onChange={productDataHandler}/>

              <Row>
                <Col>
                  <Form.Label className="mt-2"/>
                  <Form.Control type="number" data-bs-theme={theme ? "light" : "dark"}
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={productDataHandler}/>
                </Col>

                <Col>
                  <Form.Label className="mt-2"/>
                  <Form.Control type="number" data-bs-theme={theme ? "light" : "dark"}
                  name="stock"
                  placeholder="Stock"
                  value={stock}
                  onChange={productDataHandler}/>
                </Col>
              </Row>

              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Category">
                <Form.Select
                data-bs-theme={theme ? "light" : "dark"}
                name="category"
                value={category}
                onChange={productDataHandler}
                required>
                {PRODUCT_CATEGORIES?.map((category) =>(
                  <option key={category} value={category}>{category ? category : ""}</option>
                ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Condition">
                <Form.Select
                name="condition"
                value={condition}
                onChange={productDataHandler}
                required>
                {PRODUCT_CONDITION?.map((condition) =>(
                  <option key={condition} value={condition}>{condition}</option>
                ))}
                </Form.Select>
              </FloatingLabel>

              <Form.Group className="mt-4">
                <Form.Control type="file" data-bs-theme={theme ? "light" : "dark"}
                name="product_images"
                onChange={validateProductImage}
                multiple/>
              </Form.Group>
              {imagesPreview.map(img =>(
                <img key={img} src={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52"/>
              ))}
              <br/>
              <Button type="submit" className="btn-danger my-3" disabled={isLoading}>Publish</Button>
            </Form>
          </Col>
        </Row>
      </UserSidebar>
      <div style={{ marginBottom: "5rem" }}/>
    </>
  )
}

export default NewProduct;
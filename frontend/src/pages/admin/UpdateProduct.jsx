import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../redux/services/productApi";

import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const UpdateProduct = () =>{
  const [product, setProduct] = useState({
    price: "",
    stock: ""
  });
  const { price, stock } = product;
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const imgRef = useRef(null);

  const navigate = useNavigate();
  const params = useParams();

  const theme = useSelector((state) => state.theme);
  const { data } = useGetProductDetailsQuery(params?.id);
  const [updateProduct, { error, isLoading, isSuccess }] = useUpdateProductMutation();

  const productDataHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validateProductImage = (e) =>{
    const files = Array.from(e.target.files);

    files.forEach((file) =>{
      const reader = new FileReader();

      reader.onload = () =>{
        if(reader.readyState === 2){
          setImages((oldArray) =>[...oldArray, reader.result]);
          setImagesPreview((oldArray) =>[...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }

  const handleImages = (image) =>{
    const filteredImages = imagesPreview.filter(img => img !== image);
    setImagesPreview(filteredImages);
    setImages(filteredImages);
  }

  const resetImagesHandler = () =>{
    if(imgRef.current){
      imgRef.current.value = ""
    }
  }

  useEffect(() =>{
    if(data?.product){
      setProduct({
        name: data?.product?.name,
        price: data?.product?.price,
        stock: data?.product?.stock,
      });
      setUploadedImages(data?.product?.images);
    }
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Product updated");
      navigate("/admin/dashboard");
    }
  }, [data?.product, error, isSuccess, navigate]);

  const updateProductHandler = (e) =>{
    e.preventDefault();
    const productWithImages = { ...product, images }
    updateProduct({ id: params?.id, body: productWithImages });
    console.log(productWithImages);
  };

  return(
    <>
      <AdminSidebar>
      <MetaData title={"Update Product"}/>
        <Row>
          <Col lg={10} className="col-12 mt-lg-0">
            <Form onSubmit={updateProductHandler}
            className={`product-form ${theme ? "shadow-lg" : "dark"}`}>
              <Row>
                <Col>
                  <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Price">
                    <Form.Control type="number" data-bs-theme={theme ? "light" : "dark"}
                    name="price"
                    value={price}
                    onChange={productDataHandler}/>  
                  </FloatingLabel>
                </Col>

                <Col>
                  <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Stock">
                    <Form.Control type="number" data-bs-theme={theme ? "light" : "dark"}
                    name="stock"
                    value={stock}
                    onChange={productDataHandler}/>  
                  </FloatingLabel>
                </Col>
              </Row>

              <Form.Group className="mt-4">
                <Form.Control type="file" data-bs-theme={theme ? "light" : "dark"}
                ref={imgRef}
                name="product_images"
                onChange={validateProductImage}
                onClick={resetImagesHandler}
                multiple/>
              </Form.Group>
              
              {imagesPreview?.length > 0 && (
                <div className="my-4">
                  <p className="text-warning">New Images:</p>
                  <Row>
                    {imagesPreview?.map((img) =>(
                      <Col md={3} className="col-6">
                        <Card data-bs-theme={theme ? "light" : "dark"}>
                          <img src={img} alt="Card"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "150px" }}/>

                          <Button type="button" variant="danger"
                          className="btn-block mt-1 py-0"
                          onClick={() => handleImages(img)}>
                            <FaTimes size="1.1rem" className="my-1"/>
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <p className="text-warning mt-3">Updating the images will replace the current ones</p>
                </div>
              )}

              {uploadedImages?.length > 0 && (
                <div className="my-4">
                  <p className="text-success">Current Product Images:</p>
                  <Row>
                    {uploadedImages?.map((img) =>(
                      <Col md={3} className="col-6">
                        <Card data-bs-theme={theme ? "light" : "dark"}>
                          <img src={img?.url} alt="Card"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "150px" }}/>

                          <Button type="button" variant="danger" disabled
                          className="btn-block mt-1 py-0">
                            <FaTrash size="1.1rem" className="my-1"/>
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
              <Button type="submit" className="btn-danger my-3"
              disabled={isLoading || imagesPreview?.length === 0}>Update</Button>
            </Form>
          </Col>
        </Row>
      </AdminSidebar>
      <div style={{ marginBottom: "3rem" }}/>
    </>
  )
}

export default UpdateProduct;
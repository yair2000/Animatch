import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "sonner";

import { useDeleteProductMutation, useGetAdminProductsQuery } from "../../redux/services/productApi";
import AdminSidebar from "../../components/storeComps/AdminSidebar";
import MetaData from "../../components/MetaData";

const Products = () =>{
  const theme = useSelector((state) => state.theme);
  const { data, error } = useGetAdminProductsQuery();
  const [deleteProduct, { isLoading: isDeleteLoading, error: deleteError, isSuccess }] = useDeleteProductMutation();

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(deleteError){
      toast.error(deleteError?.data?.message);
    }
    if(isSuccess){
      toast.success("Product Deleted");
    }
  },[deleteError, error, isSuccess]);

  const productDelete = (id) =>{
    deleteProduct(id);
  }

  const setProducts = () =>{
    const products ={
      columns: [
        {
          label: "Product Name",
          field: "name"
        },
        {
          label: "Price",
          field: "price"
        },
        {
          label: "Seller",
          field: "seller"
        },
        {
          label: "Stock",
          field: "stock"
        },
        {
          label: "Actions",
          field: "actions"
        }
      ],
      rows: []
    };

    data?.products?.forEach((product) =>{
      products.rows.push({
        name: product?.name,
        price: `$${product?.price}`,
        seller: product?.seller,
        stock: product?.stock,
        actions: 
        <>
          <Link to={`/product/${product?._id}`} target="blank"
          className="btn btn-outline-info"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <FaInfoCircle size="1.2rem"/>
          </Link>
          <Link to={`/admin/product/${product?._id}/edit`}
          className="btn btn-outline-success ms-lg-2"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <BsFillPencilFill size="1.2rem"/>
          </Link>
          <Button variant="outline-danger"
          className="ms-lg-2"
          onClick={() => productDelete(product?._id)}
          disabled={isDeleteLoading}
          style={{ color: theme ? "black" : "whitesmoke" }}>
            <FaTrash size="1.2rem"/>
          </Button>
        </>
      });
    });

    return products;
  }

  return(
    <>
      <AdminSidebar>
        <MetaData title={"All Products"}/>
        <Container>
          <h1>{data?.products?.length} Products</h1>
          <MDBDataTableV5 data={setProducts()}
          className="mt-lg-3"
          hover
          bordered
          striped
          responsive
          entries={10}
          searching={false}
          sortable={false}/>
        </Container>
      </AdminSidebar>
      <div style={{ marginBottom: "5rem" }}/>
    </>
  )
}

export default Products;
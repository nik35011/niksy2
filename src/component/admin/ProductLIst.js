import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductLIst.css";
import { clearErrors,getAdminProduct,deleteProduct } from "../../actions/productAction";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductLIst=()=>{
    const dispatch=useDispatch();

    const alert=useAlert();

    const Navigate=useNavigate();

    const {error,products}=useSelector((state)=>state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
      );

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          alert.success("Product Deleted Successfully");
          Navigate("/admin/dashboard");
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
    
        dispatch(getAdminProduct());
      }, [dispatch, alert, error,Navigate,isDeleted,deleteError]);


      const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id));
    }

    const columns=[
        {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},

        {
            field:"name",
            headerName:"Name",
            minWidth:350,
            flex:1
        },
        {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field:"price",
            headerName:"Price",
            type:"number",
            minWidth:270,
            flex:0.5
        },
        {
            field:"actions",
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/product/${params.id}`}>
                            <EditIcon />
                        </Link>

                        <Button onClick={()=>deleteProductHandler(params.id)}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },

    ]


    const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });


   


    return(
        <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
    );
}


export default ProductLIst;
import React,{Fragment,useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css";
import { useSelector,useDispatch } from "react-redux";
import { clearErrors,myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import LaunchIcon from "@material-ui/icons/Launch";



const MyOrders=()=>{
    const dispatch=useDispatch();

    const alert=useAlert();

    const {loading,error,orders}=useSelector((state)=>state.myOrders);

    const {user}=useSelector((state)=>state.user);
     
    const columns=[
        { field : "id",headerName:"order ID",minwidth:250,flex:0.5},
        {
            field:"status",
            headerName:"Status",
            minwidth:150,
            flex:0.3,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            }
            
        },{
            field:"itemQty",
            headerName:"Item Qty",
            type:"number",
            minwidth:150,
            flex:0.1
        },{
            field:"amount",
            headerName:"Amount",
            type:"number",
            minwidth:200,
            flex:0.3
        },
        {
            field:"actions",
            headerName:"Actions",
            type:"number",
            minwidth:150,
            flex:0.2,
            sortable:false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            }
            
        }
    ];
    const rows=[];

    orders && 
    orders.forEach((item,index)=>{
        rows.push({
            itemQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice
        });
    });

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }
        dispatch(myOrders());
    },[dispatch,alert,error]);


    return(
        <Fragment>
        <MetaData title={`${user.name}-orders`} />
        {loading ? <Loader/> :
        <div className="myOrdersPage">
        <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
        />
        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

        </div>
        }
        </Fragment>
    );
}


export default MyOrders;
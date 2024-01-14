import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductLIst.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstans";

const UsersList = () => {

    const Navigate=useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

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
      alert.success(message);
      Navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 140, flex: 0.7 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 140,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 80,
      flex: 0.4,
    },

    {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 50,
        flex: 0.3,
        cellClassName: (params) => {
          return params.value === "admin" ? "greenColor" : "redColor";
        },
      },
      

      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 130,
        type: "number",
        sortable: false,
        renderCell: (params) => {
            const userId = params.id;
          
            return (
              <Fragment>
                {userId && (
                  <Link to={`/admin/user/${userId}`}>
                    <EditIcon />
                  </Link>
                )}
          
                {userId && (
                  <Button onClick={() => deleteUserHandler(userId)}>
                    <DeleteIcon />
                  </Button>
                )}
              </Fragment>
            );
          },
          },
      
      
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
};

export default UsersList;
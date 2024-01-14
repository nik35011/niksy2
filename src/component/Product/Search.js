import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./Search.css";
import MetaData from "../layout/Metadata";

const Search = ()=>{

    const [keyword,setKeyword]=useState("");
    const navigate = useNavigate(); // Use useNavigate hook

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword){
            navigate(`/products/${keyword}`); // Use navigate function
        } else {
            navigate("/products");
        }
    }

    return (
        <Fragment>
        <MetaData title="SEARCH A PRODUCT -- NIKSY"/>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder="search a product" onChange={(e)=>setKeyword(e.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
        </Fragment>
    );
}

export default Search;

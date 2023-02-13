import React, { useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducer";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { removeToken } from "../redux/slices/authSlice";
import { Divider } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CartDrawer from "./cartDrawer";
import jwt_decode from "jwt-decode";
import SessionExpiredDialog from "./SessionExpiredDialog";
import axiosClient from "../apiService/axiosInstance";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let user:any =  localStorage.getItem("token") && jwt_decode(localStorage.getItem("token") as string);
  console.log(user)

  const logout = async() => {
    const result = await axiosClient.post('/logout',{id: user?._id})
    if(result.status === 200){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(removeToken(null));
    }
    else{
      alert(result.data.message)
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#047BD5",
          height: 55,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="/test2.jpg"
          width="100"
          height="35"
          style={{ marginLeft: 10 }}
        />
        <NavLink
          to="/home"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "600",
                  marginRight: 20,
                  marginLeft: 20,
                }
              : {
                  color: "rgba(255,255,255,.7)",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: 20,
                  marginLeft: 20,
                }
          }
        >
          <p style={location.pathname === "/home" ? { marginBottom: 14 } : {}}>
            Home
          </p>
          <div
            style={
              location.pathname === "/home"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>


        <NavLink
          to="/orders"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "600",
                  marginRight: 20,
                }
              : {
                  color: "rgba(255,255,255,.7)",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: 20,
                }
          }
        >
          <p style={location.pathname === "/orders" ? { marginBottom: 14 } : {}}>
            Orders
          </p>
          <div
            style={
              location.pathname === "/orders"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>

        { user?.role?.includes('admin') &&
        <NavLink
          to="/admin"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "600",
                  marginRight: 20,
                }
              : {
                  color: "rgba(255,255,255,.7)",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: 20,
                }
          }
        >
          <p style={location.pathname === "/admin" ? { marginBottom: 14 } : {}}>
            Admin
          </p>
          <div
            style={
              location.pathname === "/admin"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>
}

       

        {/* <Search style={{ color: "#ffffff", marginLeft: "auto" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              dispatch(setSearchValue(e.target.value));
            }}
          />
        </Search> */}

        <div style={{ marginLeft: "auto", marginRight: 20 ,display:"flex"}}>
          <CartDrawer/>
          <button style={{ marginLeft: 20 }} onClick={logout}>
            Logout
          </button>
        </div>
        <h4
          style={{
            color: "#ffffff",
            border: "0.5px solid white",
            padding: 3,
            marginRight: 10,
          }}
        >
          {user && user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}
        </h4>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;

import React, { useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { removeAdminToken, removeToken } from "../../redux/slices/authSlice";


const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let user:any =  localStorage.getItem("token") && jwt_decode(localStorage.getItem("token") as string);

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(removeToken(null));
    navigate("/admin")

  };

  return (
    <>
      <div
        style={{
          backgroundColor: "red",
          height: 55,
          display: "flex",
          alignItems: "center",
        }}
      >
        
        <NavLink
          to="/admin-home"
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
          <p style={location.pathname === "/admin-home" ? { marginBottom: 14 } : {}}>
            Home
          </p>
          <div
            style={
              location.pathname === "/admin-home"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>

        <NavLink
          to="/list"
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
          <p style={location.pathname === "/list" ? { marginBottom: 14 } : {}}>
            List
          </p>
          <div
            style={
              location.pathname === "/list"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>

        <NavLink
          to="/mainform/new"
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
          <p
            style={location.pathname === "/mainform/new" ? { marginBottom: 14 } : {}}
          >
            New
          </p>
          <div
            style={
              location.pathname === "/mainform/new"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>

        <NavLink
          to="/adminOrders"
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
          <p style={location.pathname === "/adminOrders" ? { marginBottom: 14 } : {}}>
            Admin-Orders
          </p>
          <div
            style={
              location.pathname === "/adminOrders"
                ? { borderBottom: "2px solid #fff" }
                : {}
            }
          ></div>
        </NavLink>

        <div style={{ marginLeft: "auto", marginRight: 20 ,display:"flex"}}>
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

export default AdminLayout;

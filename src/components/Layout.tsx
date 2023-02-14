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
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer";
import WidgetsIcon from '@mui/icons-material/Widgets';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import Loader from "./Loader";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { setSearchValue } from "../redux/slices/cartSlice";


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
  const [state, setState] = React.useState(false);
  const [loader,setLoader] = useState(false)



  let user:any =  localStorage.getItem("token") && jwt_decode(localStorage.getItem("token") as string);
  console.log(user)

  const logout = async() => {
    setLoader(true)
    const result = await axiosClient.post('/logout',{id: user?._id})
    if(result.status === 200){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(removeToken(null));
    setLoader(false)
    }
    else{
      setLoader(false)
      alert(result.data.message)
    }
  };

  return (
    
    <Box >
      <div
        style={{
          backgroundColor: "#047BD5",
          height: 55,
          display: "flex",
          alignItems: "center",
          width: "100%",
          // minWidth: '990px',
          position: 'fixed',
          left: 0,
          top:0,
          zIndex:100, 
         
        }}
      >
         <div className="menuIcon">
         <MenuIcon  sx={{color:"#fff",marginLeft:1}} onClick={()=>setState(!state)} />
      <Drawer anchor={"left"}  open={state} onClose={() => setState(false)}>
        <Box className="drawer-width" role="presentation" >
          <h3 style={{textAlign:"center"}}>Hi {user && user?.name.charAt(0).toUpperCase() + user?.name.slice(1)} &#x1F600;</h3>
        <Divider/>
        <div style={{marginLeft:20}}>
        
       
        <NavLink
        onClick={()=>setState(!state)}
          to="/home"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "red",
                  textDecoration: "none",
                  fontWeight: "600",
                }
              : {
                  color: "#000",
                  fontWeight: "600",
                  textDecoration: "none",
                }
          }
        >
         <p style={{marginBottom:20}}> <WidgetsIcon style={{marginBottom:-6,marginRight:5}}/> Products</p>      
        </NavLink>


        <NavLink
        onClick={()=>setState(!state)}
          to="/orders"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "red",
                  textDecoration: "none",
                  fontWeight: "600",
                }
              : {
                  color: "#000",
                  fontWeight: "600",
                  textDecoration: "none",
                }
          }
        >
           <p style={{marginBottom:20}}> <LocalMallIcon style={{marginBottom:-6,marginRight:5}}/> Orders</p> 
        </NavLink>

        { user?.role?.includes('admin') &&
        <NavLink
        onClick={()=>setState(!state)}
          to="/admin"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "red",
                  textDecoration: "none",
                  fontWeight: "600",
                }
              : {
                  color: "#000",
                  fontWeight: "600",
                  textDecoration: "none",
                }
          }
        >
           <p style={{marginBottom:20}}> <AdminPanelSettingsIcon style={{marginBottom:-6,marginRight:5}}/> Admin</p> 
          
        </NavLink>
        
}
<Divider/>
<p onClick={logout} style={{fontWeight:600}}> <LogoutIcon style={{marginLeft:3,marginBottom:-6,marginRight:5}}/> Logout</p>
</div>
        </Box>
      </Drawer>
    </div>
       
       
        <NavLink
        className="hide-items-header"
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
        className="hide-items-header"
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
        className="hide-items-header"
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


       

        <Search style={{ color: "#ffffff",marginLeft:8,marginRight:5 }}>
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
        </Search>

        <div style={{marginLeft:"auto",marginRight: 20 ,display:"flex",width:"100wh"}}>
          <NotificationsIcon sx={{color:"#fff",marginRight:1.5}}/>
          {/* <AccountCircleIcon sx={{color:"#fff",marginRight:1.5}}/> */}
          <CartDrawer/>
          <button className="hide-items-header" style={{ marginLeft: 20 }} onClick={logout}>
            Logout
          </button>
        </div>
        <h4
        className="hide-items-header"
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
      
      <div style={{marginLeft:10,marginRight:10,marginTop:60}}>
      <Outlet />
      </div>
      {loader && <Loader/>}
      </Box>
    
  );
};

export default Layout;

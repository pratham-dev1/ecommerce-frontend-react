import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { RootState } from "../redux/reducer";
import { useDispatch,useSelector } from "react-redux";
import { Badge } from "@mui/material";
import axiosClient from "../apiService/axiosInstance";
import jwt_decode from "jwt-decode";
import { emptyCart } from "../redux/slices/cartSlice";
import CartItems from "./CartItems";
import { useLocation, useNavigate } from "react-router-dom";



export default function CartDrawer() {
  const [state, setState] = React.useState(false);
  const [loader,setLoader] = React.useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const reduxState:any = useSelector((state: RootState) => state);
  let totalItems = Object.keys(reduxState.cart.orders);
  let Items = Object.values(reduxState.cart.orders);
  console.log(reduxState);

  let totalPrice: any = Items.reduce(
    (acc: any, current: any) => acc + current.price * current.quantity,
    0
  );


  const List = () => (
    <Box width={300} role="presentation">
      <h4 style={{ textAlign: "center", marginTop: 10 }}>
        Cart({totalItems.length})
      </h4>
      <Divider />
      {Items.map((item: any) => {
        return (
         <CartItems item={item}/>
        );
      })}
      {Items.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 6,
            }}
          >
            <h3>Total: </h3>
            <h3>₹{totalPrice}</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            {location.pathname !== "/checkout" &&
            <Button
              fullWidth
              color="warning"
              variant="contained"
              onClick={()=>{
                setState(false)
                navigate('/checkout')
              }}
              
            >
              Checkout
            </Button>
}
          </div>
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>No Items in Cart</h2>
      )}
    </Box>
  );

  return (
    <div>
      <Badge
        onClick={() => setState(!state)}
        badgeContent={totalItems.length}
        color="error"
      >
        <ShoppingCartIcon style={{ color: "#fff",marginRight:-3 }} />
      </Badge>
      <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
        <List />
      </Drawer>
    </div>
  );
}

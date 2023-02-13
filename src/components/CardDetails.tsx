import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrder, removeOrder } from "../redux/slices/cartSlice";

interface Props {
  item: any;
}

const CardDetails: React.FC<Props> = ({ item}) => {
  const [quantity, setQuantity] = useState(0);
  let navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Card sx={{ margin: 2,border:"0.5px solid silver" }} className="card" >
      <CardActionArea>
        <CardMedia component="img" height="130" image={item.url} />
        <CardContent sx={{ height: 210 }} onClick={()=>navigate(`/productdetail/${item._id}`)}>
          <Typography gutterBottom variant="h5" component="div">
            Product Id : {item._id}
          </Typography>
          <Typography variant="body2" >
            Description : {item.description.length > 42 ? item.description.slice(0,42)+'...' : item.description}
          </Typography>

          <Typography variant="body2" >
            Name : {item.name}
          </Typography>

          <div style={{ bottom: 0, position: "absolute", marginBottom: 40 }}>
            <h3>₹ {item.price}</h3>
            <h3>{item.size}</h3>
          </div>

          
        </CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ bottom: 0, position: "absolute", marginBottom: 7 }} >
              {quantity === 0 ? (
                <Button variant="contained" style={{ width: 190 }} onClick={()=>{
                  setQuantity(quantity+1)
                  dispatch(addOrder({...item,quantity : quantity+1}))
                }}>
                  Add to cart
                </Button>
              ) : (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderRadius: 50,
                      backgroundColor: "#047BD5",
                      fontSize: 28,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      height: 35,
                      width: 35,
                      marginRight: 30,
                    }}
                    onClick={()=>{
                      setQuantity(quantity-1)
                      dispatch(removeOrder({...item,quantity : quantity-1}))
                    }}
                  >
                    -
                  </div>
                  <div style={{ fontSize: 22, marginTop: 5 }}>{quantity}</div>
                  <div
                    style={{
                      borderRadius: 50,
                      backgroundColor: "#047BD5",
                      fontSize: 26,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      height: 35,
                      width: 35,
                      marginLeft: 30,
                    }}
                    onClick={()=>{
                      setQuantity(quantity+1)
                      dispatch(addOrder({...item,quantity : quantity+1}))
                    }}
                  >
                    +
                  </div>
                </div>
              )}
            </div>
          </div>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(CardDetails);

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
import { SERVER_URL } from "../apiService/axiosInstance";

interface Props {
  item: any;
}

const CardDetails: React.FC<Props> = ({ item}) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Card sx={{ margin: 2,border:"0.5px solid silver" }} className="card" >
      <CardActionArea>
        <CardMedia component="img" height="130" image={`${SERVER_URL}/public/uploads/${item.image}`} />
        <CardContent sx={{ height: 210 }} >
          <Typography gutterBottom variant="h5" component="div">
            Product Id : {item._id}
          </Typography>
          <Typography variant="body2" >
            Description : {item.description.length > 10 ? item.description.slice(0,10)+'...' : item.description}
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
                <Button variant="contained" style={{width:"200px"}} onClick={()=>navigate(`/productdetail/${item._id}`)}>
                  Check now
                </Button>
             
            </div>
          </div>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(CardDetails);

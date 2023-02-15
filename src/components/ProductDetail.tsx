import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosClient, { SERVER_URL } from "../apiService/axiosInstance";
import { RootState } from "../redux/reducer";
import { addOrder, removeOrder } from "../redux/slices/cartSlice";
import Loader from "./Loader";
import SingleSize from "./SingleSize";

const ProductDetail = () => {
  let Sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  useEffect(() => {
    getData();
  }, []);

  const reduxState = useSelector((state: RootState) => state);


  

  let { id } = useParams();
  const [data, setData] = useState<any>({});
  const [loader,setLoader] = useState(false)
  const [size,setSize] = useState('')
  const [addedToCart, setAddedToCart] = useState(false);
  const [message,setMessage] = useState('')

  useEffect(()=>{
    let isEmpty = Object.keys(reduxState.cart.orders).length === 0
if(isEmpty){
  setAddedToCart(false)
}
  },[reduxState.cart.orders])

  const dispatch = useDispatch()

  const getData = async () => {
    try{
    setLoader(true)
    let response = await axiosClient.get(`/shop/getProductById/${id}`);
    setLoader(false)
    setData(response.data);
    }
    catch (err){
      setLoader(false)
      console.log(err)
    }
  };
//console.log(data)
  return (
    <>
    {data.size &&
    <>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img src={`${SERVER_URL}/public/uploads/${data.image}`} height="400" width="300" />
        </div>

        <h3>{data.name}</h3>
        <h2>₹{data.price}</h2>
        <Divider/>
        <h4>Available sizes</h4>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        {Sizes.map((item:string, index:any) => {
        return (
          <div
            className={item === size ? "selected-size" : data?.size.split(',').includes(item) ? "size" :  "disabled-size"}
            onClick={() => {
              if(data?.size.split(',').includes(item)){
              setSize(size === item ? "" : item);
              setAddedToCart(false)
              setMessage('')
              }
              
            }}
          >
            {item}
          </div>
        );
      })}
      <small style={{color:"red"}}>{message}</small>
      </div>

      <h4>Description :</h4>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident debitis temporibus accusamus ducimus mollitia sunt nostrum consequatur, eligendi totam quos nam eos quidem nesciunt. Obcaecati voluptatem eveniet porro quaerat quae</div>

      <div style={{ display: "flex", justifyContent: "center",alignItems:"center" ,marginTop:20,marginBottom:20,marginInline:20}}>
              
                <Button variant="contained" 
                color={addedToCart ? "success" : "primary"}
                onClick={()=>{
                  if(!size){
                    setMessage("Please select the size")
                  }
                  else {
                    
                    setAddedToCart(true)
                  dispatch(addOrder({...data,quantity:1,size:size}))
                  }
                }} fullWidth>
                  { addedToCart ? "Added" : "Add to cart"}
                </Button>
              
            </div>
        
      </>
}
{loader && <Loader/>}
        </>
  )
};

export default ProductDetail;

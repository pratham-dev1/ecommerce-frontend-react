import { Divider, Pagination } from "@mui/material";
import React, { useState } from "react";
import axiosClient from "../../apiService/axiosInstance";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)

  React.useEffect(() => {
    getOrders();
  }, [page]);

  let query = `page=${page}`

  const getOrders = async () => {
    let response = await axiosClient.get("/admin/get-orders-admin?"+query)
    //console.log(response);
    setOrders(response.data.result);
    setTotalPages(response.data.totalPages);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Order's list</h3>
      <Divider />
     
          <div style={{ padding:10}}>
            {orders.map((product: any) => {
              return (
                <div >
                    <b>OrderId : {product._id}</b>
                  <div>Name : {product.products.name}</div>
                  <div>Size : {product.products.size}</div>
                  <div>Quantity : {product.products.quantity}</div>
                  <div>Price : {product.products.price} x {product.products.quantity} = { product.products.price*product.products.quantity}</div>
                  <div >Status : <span style={product.products.orderStatus ==="pending" ? {backgroundColor:"red",borderRadius:50,paddingInline:10,color:"#fff" }:{backgroundColor:"green",borderRadius:50,paddingInline:10,color:"#fff"} }>{product.products.orderStatus}</span></div>
                  <div>Address : {product.user.address.address}</div>
                  <div>Pincode : {product.user.address.pincode}</div>
                  <Divider style={{margin:5}}/>
                </div>
              );
            })}
            {/* <b >TotalPrice : {item.totalPrice}</b> */}
            {/* <div style={{height:3,backgroundColor:"black"}}></div> */}
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <Pagination count={totalPages} onChange={(e,v)=>setPage(v)}  color="primary" />      
      </div>
    </div>
  );
};

export default AdminOrders;

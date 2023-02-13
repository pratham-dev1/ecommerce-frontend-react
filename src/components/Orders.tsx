import { Divider, Pagination } from "@mui/material";
import React, { useState } from "react";
import axiosClient from "../apiService/axiosInstance";
import { saveAs } from 'file-saver';
import Loader from "./Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const [loader,setLoader] = useState(false)


  React.useEffect(() => {
    getOrders();
  }, [page]);

  let query = `page=${page}`

  const getOrders = async () => {
    setLoader(true)
    let response = await axiosClient.get("/shop/getOrders?"+query)
    console.log(response);
    response?.data && setOrders(response.data?.result);
    response?.data && setTotalPages(response.data?.totalPages);
    setLoader(false)
  };

  const createAndDownloadPdf = async(orderId:any)=>{
    setLoader(true)
    let createPdf = await axiosClient.post("/shop/create-invoice-pdf",{orderId:orderId})
    console.log(createPdf)
    let getPdf = await axiosClient.get(`/shop/fetch-invoice-pdf/${orderId}`)
  //  console.log(getPdf.data)
    const linkSource = `data:application/pdf;base64,${getPdf.data}`;
    const downloadLink = document.createElement("a");
    const fileName = "Invoice.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click()
    setLoader(false)
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Order's list</h3>
      <Divider />
     
          <div style={{ padding:10}}>
            {orders.map((product: any,index) => {
              return (
                <div key={index}>
                    <b>OrderId : {product._id} - <span onClick={()=>createAndDownloadPdf(product._id)} style={{color:"blue",cursor:"pointer"}}>Invoice</span></b>
                  <div>Name : {product.products.name}</div>
                  <div>Size : {product.products.size}</div>
                  <div>Quantity : {product.products.quantity}</div>
                  <div>Price : {product.products.price} x {product.products.quantity} = { product.products.price*product.products.quantity}</div>
                  <div>Status : <span style={product.products.orderStatus ==="pending" ? {backgroundColor:"red",borderRadius:50,paddingInline:10,color:"#fff"  }:{backgroundColor:"green",borderRadius:50,paddingInline:10,color:"#fff" } }>{product.products.orderStatus}</span></div>
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
      {loader && <Loader/>}    
    </div>
  );
};

export default Orders;

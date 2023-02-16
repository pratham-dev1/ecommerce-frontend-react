import { Divider, Pagination } from "@mui/material";
import React, { useState } from "react";
import axiosClient from "../apiService/axiosInstance";
import { saveAs } from 'file-saver';
import Loader from "./Loader";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState<any>(null);
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const [loader,setLoader] = useState(false)


  React.useEffect(() => {
    getOrders();
  }, [page]);

  let query = `page=${page}`

  const getOrders = async () => {
    try {
    setLoader(true)
    let response = await axiosClient.get("/shop/getOrders?"+query)
    console.log(response);
    response?.data && setOrders(response.data?.result);
    response?.data && setTotalPages(response.data?.totalPages);
    setLoader(false)
    }
    catch(err:any){
      setLoader(false)
    toast.error(err)
    }
  };

  const createAndDownloadPdf = async(orderId:any)=>{
    setLoader(true)
    let createPdf = await axiosClient.post("/shop/create-invoice-pdf",{orderId:orderId})
    console.log(createPdf)
    let getPdf = await axiosClient.get(`/shop/fetch-invoice-pdf/${orderId}`,{ responseType: 'blob' })
   const pdfBlob = new Blob([getPdf.data], { type: 'application/pdf' });
   saveAs(pdfBlob, 'Invoice.pdf')
    setLoader(false)
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Order's list</h3>
      <Divider />
     
          <div style={{ padding:10}}>
            {orders?.map((product: any,index:any) => {
              return (
                <div key={index}>
                    <b>OrderId : {product._id} - <span onClick={()=>createAndDownloadPdf(product._id)} style={{color:"blue",cursor:"pointer"}}>Invoice</span></b>
                  <div>Name : {product.products.name}</div>
                  <div>Size : {product.products.size}</div>
                  <div>Quantity : {product.products.quantity}</div>
                  <div>Price : {product.products.price} x {product.products.quantity} = { product.products.price*product.products.quantity}</div>
                  <div>Status : <span style={product.products.orderStatus ==="pending" ? {backgroundColor:"red",borderRadius:50,paddingInline:10,color:"#fff"  }:{backgroundColor:"green",borderRadius:50,paddingInline:10,color:"#fff" } }>{product.products.orderStatus}</span></div>
                  <div>Address : {product.user.addressDetails.address}</div>
                  <div>Pincode : {product.user.addressDetails.pincode}</div>
                  <Divider style={{margin:5}}/>
                </div>
              );
            })}
            {/* <b >TotalPrice : {item.totalPrice}</b> */}
            {/* <div style={{height:3,backgroundColor:"black"}}></div> */}
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        {orders && <Pagination count={totalPages} onChange={(e,v)=>setPage(v)}  color="primary" />    }  
        {!loader && !orders && <h2>No orders found</h2>}
      </div>
      {loader && <Loader/>}    
    </div>
  );
};

export default Orders;

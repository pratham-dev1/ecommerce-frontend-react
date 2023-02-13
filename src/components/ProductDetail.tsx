import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../apiService/axiosInstance";

const ProductDetail = () => {
  useEffect(() => {
    getData();
  }, []);
  let { id } = useParams();
  const [data, setData] = useState<any>({});

  const getData = async () => {
    let response = await axiosClient.get(`/shop/getProductById/${id}`);
    setData(response.data);
  };
//console.log(data)
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img src={data.url} height="200" width="300" />
        <h2>Product Id : {data._id}</h2>
        <div>Name : {data.name}</div>
        <div>Description : {data.description}</div>
        <div>Size : {data.size}</div>
        <div>Price : {data.price}</div>
    </div>
  )
};

export default ProductDetail;

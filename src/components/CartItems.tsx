import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SERVER_URL } from '../apiService/axiosInstance'
import { addOrder, removeOrder } from '../redux/slices/cartSlice'

const CartItems = ({item}:any) => {
    const dispatch = useDispatch()

  return (
         <>
         <div style={{display:"flex",alignItems:"center",fontSize:14}}>
            <div style={{display:"flex"}}>
              <div>
              <img src={`${SERVER_URL}/public/uploads/${item.image}`} height="70"  width='50' style={{marginRight:3}} />
              </div>
              <div>
            <div style={{marginBottom:4}}>{item.name}</div>
            <div style={{marginBottom:4}}>Size : {item.size}</div>
            
                <div style={{marginBottom:4}}>Qty : {item.quantity}</div>
            <div style={{marginBottom:4}}>
              Price : {item.price} X {item.quantity} ={" "}
              {item.price * item.quantity}
            </div>
            </div>
            </div>
            <div>
            <div style={{ display: "flex",marginRight:10}}>
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
                      marginRight: 10,
                    }}
                    onClick={()=>{  
                      dispatch(removeOrder({...item,quantity : item.quantity-1}))
                    }}
                  >
                    -
                  </div>
                  <div style={{ fontSize: 22, marginTop: 5 }}>{item.quantity}</div>
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
                      marginLeft: 10,
                    }}
                    onClick={()=>{
                      
                      dispatch(addOrder({...item,quantity : item.quantity+1}))
                    }}
                  >
                    +
                  </div>
                  </div>
                </div>
                </div>
            <Divider  style={{marginBottom:6}}/>
            </>
          
  )
}

export default CartItems
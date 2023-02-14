import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOrder, removeOrder } from '../redux/slices/cartSlice'

const CartItems = ({item}:any) => {
    const dispatch = useDispatch()

  return (
         <>
         <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
            <div>Name : {item.name}</div>
            <div>Size : {item.size}</div>
            
                <div>Qty : {item.quantity}</div>
            <div>
              Price : {item.price} X {item.quantity} ={" "}
              {item.price * item.quantity}
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
            <Divider />
            </>
          
  )
}

export default CartItems
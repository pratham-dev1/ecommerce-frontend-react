import React from 'react'

const Quantity = ({getQuantity}:any) => {
    const [quantity, setQuantity] = React.useState(1);
  return (
    <div style={{ display: "flex" ,alignItems:"center",marginLeft:"auto",marginRight:7}}>
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
                      setQuantity(quantity-1)
                      getQuantity(quantity-1)
                      
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
                      marginLeft: 10,
                    }}
                    onClick={()=>{
                      setQuantity(quantity+1)
                      getQuantity(quantity+1)
                    }}
                  >
                    +
                  </div>
                </div>
  )
}

export default Quantity
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom';
import axiosClient from '../apiService/axiosInstance';

const UpdatePassword = (props:any) => {
    const location = useLocation();
    let {otp,email} = location.state
    console.log(location)
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const updatePassword = async()=>{
    let response: any = await axiosClient.post("/update-password", { email,otp,password });
    console.log(response)
    setMessage(response.data.message)
  
  }

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        flexDirection: "column",
      }}>
        <TextField
          variant="outlined"
          sx={{ width: 250, marginTop: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="new password"
          placeholder="Enter new password"
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={updatePassword}
        >
          Update Password
        </Button>
        <Link to="/">Back to login</Link> 
        <h3>{message}</h3>
      </div>
      
       
  )
}

export default UpdatePassword
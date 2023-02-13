import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {Link, useLocation, useParams,useNavigate} from 'react-router-dom';
import axiosClient from '../../apiService/axiosInstance';

const UpdatePasswordAdmin = (props:any) => {
   const {key} = useParams()
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForm,setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
axiosClient.post('/check-reset-key',{key}).then((result)=>{
  if(result.data.error){
    navigate("/admin")
  }
  else{
    setShowForm(true)
  }
})
  },[])


  const updatePassword = async()=>{
    let response: any = await axiosClient.post("/update-password-admin", { password , key });
    console.log(response)
    setMessage(response.data.message)
  
  }

  return (
    <>
    {showForm && 
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
          color="error"
        >
          Update Password
        </Button>
        <Link to="/admin">Back to login</Link> 
        <h3>{message}</h3>
      </div>
}
      </>
  )
}

export default UpdatePasswordAdmin
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../apiService/axiosInstance";
import {useNavigate} from "react-router-dom"

const ResetPasswordAdmin = () => {
const navigate= useNavigate()

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
      let response: any = await axiosClient.post("/admin-reset-password", { email });
      setMessage(response.data.message);
      
  };



  return (
    <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            flexDirection: "column",
          }}
        >
          <TextField
            variant="outlined"
            sx={{ width: 250 }}
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            placeholder="Enter email"
          />
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={onSubmit}
              color="error"
            >
             Send link
            </Button>          
        </div>
      
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column"
        }}>
          <Link to="/admin">Back to login</Link> 
          <h3>{message}</h3>
          </div>
    </>
  );
};

export default ResetPasswordAdmin;

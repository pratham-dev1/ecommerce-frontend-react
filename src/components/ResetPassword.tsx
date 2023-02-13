import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../apiService/axiosInstance";
import {useNavigate} from "react-router-dom"

const ResetPassword = () => {
const navigate= useNavigate()

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [password, setPassword] = useState("");

  const onSubmit = async (val: string) => {
    if (val === "send otp") {
      let response: any = await axiosClient.post("/reset-password", { email });
      setMessage(response.data.message);
      if (!response.data.error) {
        setShowOtpBox(true);
      }
    } else {
      let response: any = await axiosClient.post("/verify-otp", { otp, email });
      if (response.data.error) {
        setMessage(response.data.message);
      } else {
        navigate("/update-password",{state:{otp:otp,email:email}})
        
      }
      
    }
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
          {showOtpBox ? (
            <>
              <TextField
                variant="outlined"
                sx={{ width: 250, marginTop: 2 }}
                onChange={(e) => setOtp(e.target.value)}
                label="otp"
                placeholder="Enter Otp"
              />
              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={() => onSubmit("verify otp")}
              >
                Verify Otp
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={() => onSubmit("send otp")}
            >
              Send Otp
            </Button>
          )}
          
          
        </div>
      
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column"
        }}>
          <Link to="/">Back to login</Link> 
          <h3>{message}</h3>
          </div>
    </>
  );
};

export default ResetPassword;

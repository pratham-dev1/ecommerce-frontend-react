import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../apiService/axiosInstance";
import { setToken } from "../redux/slices/authSlice";
import Loader from "./Loader";

const SignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
const [loader,setLoader] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
  } = useForm();

  console.log(errors);

  const onSignup = (data: any) => {
    setLoader(true)
    axiosClient
      .post("/signup", { email: data.email, password: data.password,name:data.name,address:data.address,pincode:data.pincode,image:"testImage"  })
      .then((result) => {
        if (result.data.error) {
          toast.error(result.data.message)
          setLoader(false)
        } else {
          toast.success(`Registration successfull , Please login ${data.name}`)
          setLoader(false)
          navigate('/')
        }
      });

    // navigate('/home')
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: 40,
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        padding: 18,
        width: 300,
      }}
    >
      <form onSubmit={handleSubmit(onSignup)}>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2, width: 300 }}
          {...register("name", { required: true })}
          error={!!errors.name}
          helperText={errors.name && "This is required Field"}
        />

        <TextField
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2, width: 300 }}
          {...register("email", { required: "This is required Field" ,  pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }})}
          error={!!errors.email}
          helperText={errors.email && errors.email.message as any}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2, width: 300 }}
          {...register("password", { required: true , minLength:3 })}
          error={!!errors.password}
          helperText={errors.password && "Password length must be atleast 3 char."}
        />

        <TextField
          label="Address"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2, width: 300 }}
          {...register("address", { required: true })}
          error={!!errors.address}
          helperText={errors.address && "This is required Field"}
        />

        <TextField
          label="Pincode"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2, width: 300 }}
          {...register("pincode", { required: true })}
          error={!!errors.pincode}
          helperText={errors.pincode && "This is required Field"}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{
            width: 300,
          }}
        >
          Signup
        </Button>
      </form>
      <div style={{marginTop:10}}>Already have an Account ? <Link to="/login" >Login</Link></div>
      {loader && <Loader/>}
    </div>
  );
};

export default SignUp;

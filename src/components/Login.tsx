import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../apiService/axiosInstance";
import { setToken } from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
  } = useForm();

  //console.log(errors);

  const onLogin = (data: any) => {
    axiosClient
      .post("/login", { email: data.email, password: data.password })
      .then((result) => {
        if (result.data.error) {
          alert(result.data.error);
          //console.log(result)
        } else {
          console.log(result)
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("refreshToken", result.data.refreshToken);
          dispatch(setToken(result.data.token));
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
        width: 260,
      }}
    >
      <div>pratham@gmail.com</div>
      <div>1234</div>
      <form onSubmit={handleSubmit(onLogin)}>
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 3, width: 250 }}
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "This is required Field"}
          // onChange={(e) => {
          //   onChange(e.target.value);
          // }}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          sx={{ marginBottom: 3, width: 250 }}
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password && "This is required Field"}
          // onChange={(e) => {
          //   onChange(e.target.value);
          // }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{
            width: 250,
          }}
        >
          Login
        </Button>
      </form>
      <Link style={{marginLeft:"auto",marginRight:10,marginTop:5}} to="/forgot-password" >Forgot Password</Link>
      <div style={{marginTop:10}}>Don't have an Account ? <Link to="/signup" >Singup</Link></div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient, { SERVER_URL } from "../../apiService/axiosInstance"
const MainForm = () => {
  const { id }: any = useParams();
  const [dataById, setDataById] = useState<any>({});
  const [Image, setImage] = useState<any>();
  
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isDirty,isSubmitted},
    control,
    reset,
  } = useForm({
    defaultValues: {
      size: [],
      name: "",
      price: "",
      description:"",
      image:""
      
    },
  });

  //console.log(errors);

  const onSubmit = async (data: any) => {
    console.log(data.size)
    try{
      //console.log(data);
      let formData = new FormData();
      formData.append("name", data.name)
      formData.append("price", data.price)
      formData.append("size", data.size)
      formData.append("description", data.description)
      formData.append("image", data.image)

      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
      if (id === "new") {
        let response = await axiosClient.post("admin/add-product",formData,config);
        console.log(response);
        if(!response.data.error){
        navigate("/list")
        }
        else{
          alert(response.data.message)
        }
      } else {
        let response = await axiosClient.put(`/admin/edit-product/${id}`, formData,config);
        if(!response.data.error){
          navigate("/list")
          }
          else{
            alert(response.data.message)
          }
      }
    }
    catch(err){
      console.log(err)
    }
    
  };


  useEffect(() => {
    getById();
  }, [id]);

  const getById = async () => {
    if (id !== "new") {
      let response = await axiosClient.get(`/admin/getProductById/${id}`);
      // console.log(response)
      reset({...response.data , size:response.data.size.split(',')});
      setImage(response.data.image)
    }
  };

 

  return (
  
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >      
      <Paper sx={{ margin: "auto", width: 300, padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: 3 }}
                  fullWidth
                  error={!!error}
                  helperText={error && "This is required Field"}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  value={value}
                />
              );
            }}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Price"
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: 3 }}
                  fullWidth
                  type={"number"}
                  error={!!error}
                  helperText={error && "This is required Field"}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  value={value}
                />
              );
            }}
          />
          <Controller
            name="size"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Autocomplete
                  options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                  multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Size"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ marginBottom: 3 }}
                      error={!!error}
                      helperText={error && "This is required Field"}
                    />
                  )}
                  onChange={(_, data) => onChange(data)}
                  value={value}
                />
              );
            }}
          />
           <Controller
            name="description"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Description"
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: 3 }}
                  fullWidth
                  error={!!error}
                  helperText={error && "This is required Field"}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  value={value}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="image"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              //console.log(value)
              return (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  component="label"
                >
                  <TextField
                    type="file"
                    size="small"
                    style={{ width: 300, marginBottom: 40, display: "none" }}
                    onChange={(e: any) => {
                      setImage(e.target.files[0]);
                      onChange(e.target.files[0]);
                    }}
                  />
                  Upload
                </Button>
              );
            }}
          />
          {errors.image && (
            <small
              style={{
                color: "#d32f2f",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                fontSize: "0.75rem",
                marginTop: -10,
                marginRight: "14px",
                marginLeft: "14px",
              }}
            >
              This is required Field
            </small>
          )}
          {Image && (
            <>
              {typeof Image === "object" ? (
                <img
                  src={URL.createObjectURL(Image)}
                  height="40"
                  width="40"
                  style={{ marginLeft: 5 }}
                />
              ) : (
                <img
                  src={`${SERVER_URL}/public/uploads/${Image}`}
                  height="40"
                  width="40"
                  style={{ marginLeft: 5 }}
                />
              )}
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 3 }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
   
  );
};

export default MainForm;

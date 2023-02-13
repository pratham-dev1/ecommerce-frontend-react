import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axiosClient from "../apiService/axiosInstance";

const MultipleImages = () => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const onSubmit = async()=>{
    let formData = new FormData()
    formData.append("image1",image1)
    formData.append("image2",image2)
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    let result = await axiosClient.post('/shop/upload-multiple-images',formData,config)
  }

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <TextField
        type="file"
        size="small"
        style={{ width: 250, marginBottom: 10 }}
        onChange={(e: any) => setImage1(e.target.files[0])}
      />
      <TextField
        type="file"
        size="small"
        style={{ width: 250, marginBottom: 10 }}
        onChange={(e: any) => setImage2(e.target.files[0])}
      />
      <Button variant="contained" size="small" sx={{width: 250}} color="warning" onClick={onSubmit}>Upload</Button>
    </div>
  );
};

export default MultipleImages;

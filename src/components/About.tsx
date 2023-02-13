import { Button } from "@mui/material"
import axiosClient from "../apiService/axiosInstance"
import { saveAs } from 'file-saver';

const About = () => {
 
  const createAndDownloadPdf = async()=>{
    let createPdf = await axiosClient.post("/shop/create-pdf")
    console.log(createPdf)
    let getPdf = await axiosClient.get("/shop/fetch-pdf",{ responseType: 'blob' })
   console.log(getPdf)
   let pdfBlob =  new Blob([getPdf.data], { type: 'application/pdf' }); 
   saveAs(pdfBlob, 'generatedDocument.pdf')
  }

  return (
    <Button variant="contained" onClick={()=>createAndDownloadPdf()}>PDF</Button>
  )
}

export default About
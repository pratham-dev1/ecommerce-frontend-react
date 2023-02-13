import { Autocomplete, Divider, TextField } from "@mui/material";
import { display } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../apiService/axiosInstance";
import { RootState } from "../redux/reducer";
import CardDetails from "./CardDetails";
import MultipleSize from "./MultipleSize";
import Price from "./Price";
import Search from "./Search";
import SingleSize from "./SingleSize";
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";
import Loader from "./Loader";

const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([]);
  const [priceFilter, setPriceFilter] = useState<any>("");
  const [singleSize, setSingleSize] = useState<string>("");
  const [multipleSize, setMultipleSize] = useState<string[]>([]);
  const [search,setSearch] = useState("")
  const [pageNo,setPageNo] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const [loader,setLoader] = useState(false)


  const reduxState = useSelector((state : RootState)=>state.cart)
  
  let Sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    getData();
  }, [priceFilter,singleSize,debouncedSearchTerm,multipleSize,pageNo]);


let query = `size=${singleSize}&sortPrice=${priceFilter}&searchText=${search}&multipleSize=${multipleSize}&page=${pageNo}`

  const getData = async () => {
    try{
      setLoader(true)
    let response = await axiosClient.get("/shop/list-products?"+query);
    setData(response.data.result);
    setTotalPages(response.data.totalPages)
    setLoader(false)
    // console.log(response.data.message)
    }
    catch(err:any){
      // console.log(err.response.status)
      if(err?.response?.status === 500){
      // navigate("/error")
      }
    setLoader(false)

    }
  };

  return (
    <div className="display">
      <div>
      <Search setSearch={setSearch} />
        <Price setPriceFilter={setPriceFilter} />

        <Divider style={{ marginLeft: 16 }} />
        <h4 className="ml-16">Single select</h4>
        <SingleSize
          sizes={Sizes}
          singleSize={singleSize}
          setSingleSize={setSingleSize}
        />

        <Divider style={{ marginLeft: 16, marginTop: 20 }} />
        <h4 className="ml-16">Multiple select</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "280px",
            marginLeft: "16px",
          }}
        >
          {Sizes.map((item, index) => (
            <MultipleSize item={item} setMultipleSize={setMultipleSize} multipleSize={multipleSize} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={index}>
              <CardDetails item={item} />
            </div>
          );
        })}

      </div>
      <Pagination count={totalPages} onChange={(e,page)=>setPageNo(page)} color="primary" />  
      {loader && <Loader/>}    
    </div>
  );
};

export default Home;



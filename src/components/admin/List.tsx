import Divider from "@mui/material/Divider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosClient from "../../apiService/axiosInstance";
import DataTable from "./DataTable";

const List = () => {
  const [queryOptions, setQueryOptions] = useState<any>({
    sort:{_id:"desc"},
    search:null,
    page:{pageNo:0 , pageSize : 5}
  });
  const [data, setData] = useState<any[]>([]);
  const [count , setCount] = useState<number>(0)
  let query = `sort=${JSON.stringify(queryOptions.sort)}&search=${JSON.stringify(queryOptions.search)}
              &page=${JSON.stringify(queryOptions.page)}`

  useEffect(() => {
    getData();
  }, [queryOptions]);

   const getData = async () => {
    let response = await axiosClient.get("/admin/list-products?"+query);
    //console.log(response)
    setData(response.data.result);
    setCount(response.data.totalItems)
  };

  return <DataTable data={data} getData={getData} count={count} setQueryOptions={setQueryOptions} queryOptions={queryOptions} />;
};

export default List;

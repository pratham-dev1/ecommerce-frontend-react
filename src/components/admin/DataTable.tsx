import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../apiService/axiosInstance";

export default function DataTable({
  data,
  getData,
  setQueryOptions,
  count,
  queryOptions,
}: any) {

  const navigate = useNavigate()

  const handleSort = (sortModel: any[]) => {
    let sortResult = sortModel.map((item) => ({ [item.field]: item.sort }));
    let sort = Object.assign({}, ...sortResult);
    setQueryOptions((prev: any) => {
      return { ...prev, sort: sort };
    });
  };

  const handleSearch = (searchModel: any) => {
    //console.log(searchModel);
    let searchResult = searchModel.items.map((item: any) => ({
      [item.columnField]: item.value,
    }));
    let search = Object.assign({}, ...searchResult);
    setQueryOptions((prev: any) => {
      return {
        ...prev,
        search: { search: search, searchOperator: searchModel.linkOperator },
      };
    });
  };

  const handlePage = (pageNo: number) => {
    setQueryOptions((prev: any) => {
      return { ...prev, page: { ...prev.page, pageNo: pageNo } };
    });
  };

  const handlePageSize = (pageSize: number) => {
    setQueryOptions((prev: any) => ({
      ...prev,
      page: { ...prev.page, pageSize: pageSize },
    }));
  };


  const handleDelete = async (id: any) => {
    try {
      let response = await axiosClient.delete(`/admin/delete-product/${id}`);
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleEditCell = async(params:any)=>{
    let response = await axiosClient.put(`/admin/edit-product/${params.id}`, {
      [params.field] : params.value
    });
    //console.log("eeeeeeeeeeeeeeeeee",response)
  }


  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",
      width: 120,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      description: "This column has a value getter and is not sortable.",
      width: 150,
      editable: true,
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell : (params)=> {
        // console.log(params)
        return(
        <img src={params.row.image} height="40" width="40"/>
        )
      }
    },
    {
      field: "createdBy",
      headerName: "createdBy  (ref field)",
      width: 150,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row?.createdBy?.userId?.name || ''}`
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: 1 }}
            onClick={() => navigate(`/mainForm/${params.row._id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "80%",
        paddingTop: 3,
        paddingBottom: 3,
        margin: "auto",
      }}
    >
      <DataGridPro
        getRowId={(row) => row._id}
        rows={data}
        columns={columns}
        // loading={true}
        rowHeight={58}
        checkboxSelection
        disableSelectionOnClick
        sortingMode="server"
        filterMode="server"
        onSortModelChange={handleSort}
        onFilterModelChange={handleSearch}
        pagination
        rowsPerPageOptions={[2, 5, 10, 20, 50]}
        pageSize={queryOptions.page.pageSize}
        paginationMode="server"
        onPageChange={handlePage}
        onPageSizeChange={handlePageSize}
        rowCount={count}
        onCellEditCommit={handleEditCell}
        // experimentalFeatures={{ newEditingApi: true }}

        initialState={{
          sorting: {
            sortModel: [
              {
                field: '_id',
                sort: 'desc',
              },
            ],
          },
        }}
      />
    </Box>
  );
}

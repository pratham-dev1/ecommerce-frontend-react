import TextField from '@mui/material/TextField';
import React,{startTransition} from 'react'

const Search = ({setSearch}:any) => {
  return (
    <>
    <h4 style={{marginLeft:16,marginTop:16,marginBottom:0}}>Search</h4>
    <TextField onChange={(e)=>{
        startTransition(()=>{               // it will not hang the input field
            setSearch(e.target.value)
        })
        }} style={{marginLeft:16,marginTop:16}} className="price" id="outlined-basic" label="Search by Title" variant="outlined" size="small" />
    </>
  )
}

export default Search
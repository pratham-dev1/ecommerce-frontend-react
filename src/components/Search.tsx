import TextField from '@mui/material/TextField';
import React,{startTransition} from 'react'

const Search = ({setSearch}:any) => {
  return (
    <>
    <h4 style={{marginLeft:16,marginTop:16,marginBottom:20}}>Search</h4>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <TextField onChange={(e)=>{
        startTransition(()=>{               // it will not hang the input field
            setSearch(e.target.value)
        })
        }} className="price"  id="outlined-basic" label="Search by Title" variant="outlined" size="small" />
        </div>
    </>
  )
}

export default Search
import { Autocomplete, TextField } from '@mui/material'
import React, { memo} from 'react'

const Price = ({setPriceFilter}:any) => {
 //console.log("price called")
return (
    <>
    <h4 className="ml-16">Price Filter</h4>
    <Autocomplete
    size="small"
    className="price"
    options={[{name:"Default" ,value: ""}, {name : "Low to High", value: 1}, {name : "High to Low",value : -1}]}
    renderInput={(props) => (
      <TextField {...props} placeholder="Price Filter" />
    )}
    getOptionLabel={(option:any)=>option.name}
    disableClearable
    defaultValue={{name:"Default" ,value: ""}}
    onChange={(_,v:any)=>{
      setPriceFilter(v.value) 
    }}
  />
  </>
  )
}

export default memo(Price)
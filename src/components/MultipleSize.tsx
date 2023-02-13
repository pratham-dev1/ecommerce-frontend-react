import React, { memo, useState,startTransition } from "react";

interface Props {
  [key:string]:any
}

const MultipleSize: React.FC<Props> = ({ item,multipleSize,setMultipleSize }) => {
  //console.log("multiple size called")
  return (
    <div
      className={multipleSize.includes(item) ? "selected-size" : "size"}
      onClick={()=>{
        setMultipleSize((prev:string[])=>{
       return  prev.includes(item) ? prev.filter((prevSize)=>prevSize !== item) : [...prev,item]
      })}}
    >
      {item}
    </div>
  );
};

export default memo(MultipleSize);

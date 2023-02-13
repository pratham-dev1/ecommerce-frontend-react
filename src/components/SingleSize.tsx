import React, { memo, useState } from "react";

type Props = { sizes: string[] ,singleSize:string, setSingleSize : any};

const SingleSize: React.FC<Props> = ({ sizes,setSingleSize,singleSize }) => {
//console.log("single size called")
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "280px",
        marginLeft: "16px",
      }}
    >
      {sizes.map((size, index) => {
        return (
          <div
            className={singleSize === size ? "selected-size" : "size"}
            onClick={() => {
              setSingleSize(singleSize === size ? "" : size);
            }}
          >
            {size}
          </div>
        );
      })}
    </div>
  );
};

export default memo(SingleSize);

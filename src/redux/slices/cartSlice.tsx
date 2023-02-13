import InitialState, { UpdateCartAction } from "../../typesRedux/cartTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  orders : {},
};

export const cartSlice = createSlice({
  name: UpdateCartAction,
  initialState: initialState,
  reducers: {
    addOrder : (state, action: PayloadAction<any>)=>{
      //console.log(action)
      // state.orders[action.payload.id] = action.payload           ese bhi kr skte h
      return {
        ...state,
        orders:{
          ...state.orders,
          [action.payload._id] : action.payload
        }
      } 
    },
    removeOrder : (state, action: PayloadAction<any>)=>{
    //  if(action.payload.quantity > 0) {
    //   state.orders[action.payload.id] = action.payload                       ese bhi kr skte h
    //  } 
    //  else delete state.orders[action.payload.id]
    if(action.payload.quantity > 0){
    return {
      ...state,
      orders:{
        ...state.orders,
        [action.payload._id] :  action.payload 
      }

    }
  }
  else {
    let {[action.payload._id] :id , ...rest}  = state.orders
     return{
      ...state,
      orders:{
       ...rest
        
      }
    }
  }

    },
   
    emptyCart : (state, action: PayloadAction<any>)=>{
      state.orders = {}
    }
  },
});

// Action creators are generated for each case reducer function
export const {  addOrder,removeOrder , emptyCart } =
  cartSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default cartSlice.reducer;
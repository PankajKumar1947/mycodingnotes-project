import { createSlice } from "@reduxjs/toolkit";

const initialState={
    pages:[],
}

const pageCntSlice=createSlice({
    initialState,
    name:'pagecnt',
    reducers:{
        setPages:(state,action)=>{
            state.pages=action.payload
        }
    }
})
export const {
    setPages
}=pageCntSlice.actions;
export default pageCntSlice.reducer;
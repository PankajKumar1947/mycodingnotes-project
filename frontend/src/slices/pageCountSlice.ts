import { createSlice } from "@reduxjs/toolkit";

const initialState={
    pagecnt:1,
    pages:[],
}

const pageCntSlice=createSlice({
    initialState,
    name:'pagecnt',
    reducers:{
        setPageCnt:(state,action)=>{
            state.pagecnt=action.payload
        },
        increasePage:(state)=>{
            if(state.pagecnt<state.pages.length)
                state.pagecnt++;
        },
        decreasePage:(state)=>{
            if(state.pagecnt>1)
                state.pagecnt--;
        },
        setPages:(state,action)=>{
            state.pages=action.payload
        }
    }
})
export const {
    setPageCnt,
    increasePage,
    decreasePage,
    setPages
}=pageCntSlice.actions;
export default pageCntSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    pagecnt:1,
    pageLength:0,
}

const pageCntSlice=createSlice({
    initialState,
    name:'pagecnt',
    reducers:{
        setPageLength:(state,action)=>{
            state.pageLength=action.payload
        },
        setPageCnt:(state,action)=>{
            state.pagecnt=action.payload
        },
        increasePage:(state)=>{
            if(state.pagecnt<state.pageLength)
                state.pagecnt++;
        },
        decreasePage:(state)=>{
            if(state.pagecnt>1)
                state.pagecnt--;
        }
    }
})
export const {
    setPageLength,
    setPageCnt,
    increasePage,
    decreasePage
}=pageCntSlice.actions;
export default pageCntSlice.reducer;
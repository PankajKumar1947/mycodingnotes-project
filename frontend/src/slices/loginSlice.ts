import { createSlice } from "@reduxjs/toolkit";
const initialState={
    login:{},
    isLoggedIn:false,
}

const loginSlice=createSlice({
    initialState,
    name:'login',
    reducers:{
        setLogin:(state,action)=>{
            state.login=action.payload
        },
        setIsLoggedIn:(state,action)=>{
            state.isLoggedIn=action.payload
        }
    }
});
export const { 
    setLogin,
    setIsLoggedIn
} = loginSlice.actions;
export default loginSlice.reducer;

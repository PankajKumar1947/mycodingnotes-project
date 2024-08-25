import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from '../slices/loginSlice'
import pageCntReducer from '../slices/pageCountSlice'

const rootReducer=combineReducers({
    login:loginReducer,
    page:pageCntReducer
})

export default rootReducer;
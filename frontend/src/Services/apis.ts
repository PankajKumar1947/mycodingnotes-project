const BASE_URL="http://127.0.0.1:8787/api/v1"

//auth endpoints
export const AUTH_ENDPOINTS={
    SIGNUP_API:BASE_URL+"/user/signup",
    LOGIN_API:BASE_URL+"/user/login",
    VERIFY_TOKEN: BASE_URL+"/user/verifytoken",
    USER_INFO_API:BASE_URL+"/user/info"
}

//post endpoints
export const POST_ENDPOINTS={
    GET_ALL_POST_API:BASE_URL+"/post/bulk"
}

//create notes
export const NOTES_ENDPOINTS={
    CREATE_NOTE:BASE_URL+"/post/createPost"
}
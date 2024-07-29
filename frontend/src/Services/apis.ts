const BASE_URL="https://mycodingnotes.pankaj7371873145.workers.dev/api/v1"

//auth endpoints
export const AUTH_ENDPOINTS={
    SIGNUP_API:BASE_URL+"/user/signup",
    LOGIN_API:BASE_URL+"/user/login",
    VERIFY_TOKEN: BASE_URL+"/user/verifytoken",
    USER_INFO_API:BASE_URL+"/user/info"
}

//create notes
export const NOTES_ENDPOINTS={
    CREATE_NOTE:BASE_URL+"/post/createPost"
}
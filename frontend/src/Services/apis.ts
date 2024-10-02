const BASE_URL="https://mycodingnotes.pankaj7371873145.workers.dev/api/v1"
// const BASE_URL="http://127.0.0.1:8787/api/v1"

//auth endpoints
export const AUTH_ENDPOINTS={
    SIGNUP_API:BASE_URL+"/user/signup",
    LOGIN_API:BASE_URL+"/user/login",
    VERIFY_TOKEN: BASE_URL+"/user/verifytoken",
    USER_INFO_API:BASE_URL+"/user/info"
}

//post endpoints
export const POST_ENDPOINTS={
    GET_ALL_POST_API:BASE_URL+"/post/bulk",
    GET_POST_KEYWORDS_API:BASE_URL+"/post/getPost",
    MAKE_PRIVATE:(postid:string)=>BASE_URL+`/post/private/${postid}`,
}

//create notes
export const NOTES_ENDPOINTS={
    CREATE_NOTE:BASE_URL+"/post/createPost"
}

//create page
export const PAGE_ENDPOINTS={
    CREATE_PAGE:BASE_URL+"/page/create",
    GET_PAGE:(postId:string,pageId:string)=>BASE_URL+`/page/${postId}/${pageId}`
}

//create markdown
export const MARKDOWN_ENDPOINTS={
    CREATE_MARKDOWN:(postId:string,pageId:number)=>BASE_URL+`/post/page/markdown/create/${postId}/${pageId}`,
    UPDATE_MARKDOWN:(markdownid:number)=>BASE_URL+`/post/page/markdown/update/${markdownid}`
}

//comment endpoints
export const COMMENT_ENDPOINTS={
    CREATE_COMMENT:(pageId:number)=>BASE_URL+`/page/comment/${pageId}`,
    GET_COMMENT:(pageId:number)=>BASE_URL+`/page/comment/${pageId}`
}
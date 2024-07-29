import toast from "react-hot-toast";
import { setIsLoggedIn, setLogin } from "../../slices/loginSlice";

export function logout(navigate:any,dispatch:any){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setLogin({}));
    dispatch(setIsLoggedIn(false));
    toast.success("Logged Out");
    navigate("/login");
}
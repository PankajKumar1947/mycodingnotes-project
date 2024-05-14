import toast from "react-hot-toast";

export function logout(navigate:any){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
}
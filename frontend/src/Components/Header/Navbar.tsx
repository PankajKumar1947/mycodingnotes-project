import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { verifytoken } from "../../Services/operations/auth"
import { useEffect } from "react"
import { setLogin } from "../../slices/loginSlice"

export const Navbar = () => {
    const dispatch = useDispatch();
    const login = useSelector((state: any) => state.login?.isLoggedIn);
    const user = useSelector((state: any) => state.login.login?.data);
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const verifytokenResponse = await verifytoken();
                dispatch(setLogin(verifytokenResponse));
                localStorage.setItem('isLoggedIn', JSON.stringify(verifytokenResponse.data));
            } catch (error) {
                console.log(error);
            }
        }
        verifyToken();
    }, [login])

    return (
        <div className="bg-black  py-2">
            <div className="w-[90vw] mx-auto flex justify-between items-center">
                <NavLink to={"/"}>
                    <h1 className="font-bold text-2xl">MyCodingNotes</h1>
                </NavLink>
                {/* <form action="" className="w-[50%]">
                    <div className="relative ">
                        <input type="text" placeholder="Search notes ....." className="w-[100%] bg-transparent p-2 px-4 border-[1px] border-gray-400 rounded-2xl" />
                        <input type="submit" value={"Search"} className="absolute right-0 top-0 bg-blue-600 hover:bg-blue-700 cursor-pointer border-[1px] rounded-2xl p-2 px-4" />
                    </div>
                </form> */}

                <div className="flex gap-2 items-center">
                    {
                        user?.loggedIn? <NavLink to={"/profile"} className="">Profile</NavLink> : <NavLink to={"/login"} className="p-2 border-[1px] px-5 rounded-full bg-green-600 hover:bg-green-700 border-none">Login</NavLink>
                    }
                    
                    
                </div>
            </div>


        </div>
    )
}

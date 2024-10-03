import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { verifytoken } from "../../Services/operations/auth";
import { useEffect, useState } from "react";
import { setLogin } from "../../slices/loginSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";

const navmenu = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "About",
        path: "/about"
    },
    {
        name: "Notes",
        path: "/notes"
    },
    {
        name: "Contact",
        path: "/contact"
    },
];

export const Navbar = () => {
    const dispatch = useDispatch();
    const login = useSelector((state: any) => state.login?.isLoggedIn);
    const user = useSelector((state: any) => state.login.login?.data);
    const [navOpen, setNavOpen] = useState(false); // For toggling mobile nav menu

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const verifytokenResponse = await verifytoken();
                dispatch(setLogin(verifytokenResponse));
                localStorage.setItem('isLoggedIn', JSON.stringify(verifytokenResponse.data));
            } catch (error:any) {
                console.log(error);
                dispatch(setLogin({}));
                localStorage.setItem('isLoggedIn', JSON.stringify(false));
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        verifyToken();
    }, [login]);

    // Toggle function for mobile menu
    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <>
            <nav className="bg-[#181835] sticky top-0 z-50 border-gray-200 py-2.5">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <NavLink to={"/"} className="flex items-center">
                        <span className="self-center text-xl font-bold whitespace-nowrap text-white">MyCodingNotes</span>
                    </NavLink>
                    <div className="flex items-center lg:order-2">
                        {
                            user?.loggedIn ? (
                                <NavLink to={"/profile"} className="">
                                    <FaRegUserCircle className="text-3xl hover:text-blue-600" />
                                </NavLink>
                            ) : (
                                <NavLink to={"/signup"}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none">
                                    Sign up
                                </NavLink>
                            )
                        }
                        <button
                            onClick={toggleNav} // Toggle mobile menu on click
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="mobile-menu-2">
                            <RxHamburgerMenu />
                        </button>
                    </div>
                    <div className={`${navOpen ? "block" : "hidden"} items-center justify-between w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu">
                        <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 absolute sm:relative right-0 bg-[#181835] px-4">
                            {
                                navmenu.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            onClick={()=>setNavOpen(false)}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `block py-2 px-8 sm:px-2 border-b-[1px] sm:border-none ${isActive ? 'text-blue-500 font-semibold' : 'hover:text-blue-500'}`
                                            }>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

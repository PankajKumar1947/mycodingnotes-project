import { useLocation, useNavigate } from "react-router-dom";

const DropDown = ({ pages }: any) => {
    const navigate=useNavigate ();
    const location=useLocation();
    const pathSegments = location.pathname.split("/");
    const firsturl=pathSegments[1];
    const postid=pathSegments[2];
    const pageid=pathSegments[3];
    return (
        <div className="absolute -top-2 right-0 inline-block text-left text-black">
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                <div className="py-3 text-base" role="none">
                    {
                        pages?.map((page: any) => {
                            return (
                                <li 
                                key={page.id}
                                onClick={()=>navigate(`/${firsturl}/${postid}/${page.page_cnt}`)}
                                className={`${page?.page_cnt== pageid? "bg-gray-300" :""} py-1 cursor-pointer list-none px-4 hover:bg-gray-200`}>{page?.page_cnt}. {page.page_title}</li>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default DropDown
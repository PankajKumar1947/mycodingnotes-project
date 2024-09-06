import { setPageCnt } from "@/slices/pageCountSlice";
import { useDispatch } from "react-redux"

const DropDown = ({ pages,pagecnt }: any) => {
    const dispatch=useDispatch();
    return (
        <div className="absolute -top-2 right-0 inline-block text-left text-black">
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                <div className="py-3 text-base" role="none">
                    {
                        pages.map((page: any) => {
                            return (
                                <li 
                                key={page.id}
                                onClick={()=>dispatch(setPageCnt(page?.page_cnt))}
                                className={`${page?.page_cnt===pagecnt ? "bg-gray-300" :""} py-1 cursor-pointer list-none px-4 hover:bg-gray-200`}>{page?.page_cnt}. {page.page_title}</li>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default DropDown
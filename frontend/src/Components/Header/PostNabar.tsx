import { useDispatch, useSelector } from "react-redux"
import { decreasePage, increasePage } from "../../slices/pageCountSlice";
import DropDown from "./DropDown";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdArrowOutward } from "react-icons/md";

const PostNabar = () => {
  const page=useSelector((state:any)=>state.page.pagecnt);
  const pages=useSelector((state:any)=>state.page?.pages);
  const pageLength=pages?.length;
  const dispatch=useDispatch();
  return (
    <div className="bg-black  py-2">
        <div className="w-[90vw] mx-auto flex justify-between items-center">
            <h1 className="font-bold text-xl sm:text-2xl">MyCodingNotes</h1>   
            <div className="flex justify-center gap-1 sm:gap-2 items-center">
                <button 
                onClick={()=>dispatch(decreasePage())}
                className="border-[1px] rounded-md">
                  <GrFormPrevious className="text-2xl"/>
                </button>
                <button 
                onClick={()=>dispatch(increasePage())}
                className="border-[1px] rounded-md">
                  <MdOutlineNavigateNext className="text-2xl"/>
                </button>
                <div className="group">
                  <button className="border-[1px] rounded-md flex items-center px-1"><span>({page}/{pageLength})</span><MdArrowOutward className="text-2xl"/></button>
                  <div className="hidden group-hover:block relative">
                    <DropDown pages={pages} pagecnt={page}/>
                  </div>
                </div>
                {/*  */}
            </div>
        </div>
    </div>
  )
}

export default PostNabar
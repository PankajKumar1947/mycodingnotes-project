import { useDispatch, useSelector } from "react-redux"
import { decreasePage, increasePage } from "../../slices/pageCountSlice";

const PostNabar = () => {
  const page=useSelector((state:any)=>state.page.pagecnt);
  const pageLength=useSelector((state:any)=>state.page.pageLength);
  const dispatch=useDispatch();
  return (
    <div className="bg-black  py-2">
        <div className="w-[90vw] mx-auto flex justify-between items-center">
            <h1 className="font-bold text-2xl">MyCodingNotes</h1>   
            
            <h2>Topic names ({page}/{pageLength})</h2>
            <div className="flex justify-center gap-2 items-center">
                <button 
                onClick={()=>dispatch(decreasePage())}
                className="border-[1px] px-4 rounded-md">Prev</button>
                <button 
                onClick={()=>dispatch(increasePage())}
                className="border-[1px] px-4 rounded-md">Next</button>
                <button className="border-[1px] px-4 rounded-md">Jumpto</button>
            </div>
        </div>
    </div>
  )
}

export default PostNabar
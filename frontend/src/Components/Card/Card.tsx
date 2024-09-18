import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageCnt } from "../../slices/pageCountSlice";
import DropDown from "./DropDown";

export const Card = ({ note, adminView }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewPostHandler = () => {
    dispatch(setPageCnt(1));
    navigate(`/viewnotes/${note.id}`);
  }

  return (
    <div className="border-[1px] rounded-lg bg-zinc-900 sm:p-2 relative ">
      <div className="flex sm:gap-4 flex-wrap sm:flex-nowrap ">
        <img src={note?.post_img} alt="" className=" h-[150px] sm:max-h-[160px] w-full sm:w-[180px] border-[1px] rounded-t-lg sm:rounded-lg" />
        <div className="p-2 sm:p-0">
          <h1 className="text-xl font-semibold">{note?.title}</h1>
          <p className="text-gray-400">{note?.description}</p>
          {/* keywords section */}
          <div className="flex gap-2 flex-wrap mt-2">
            {
              note?.keywords?.map((keyword: string, ind: number) => {
                return (
                  <button
                    key={ind}
                    className="text-white font-bold">{keyword}</button>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className="cursor-pointer flex justify-between items-center mb-1 sm:mt-2 px-2">
        <p>{note?.pages?.length} lessons</p>
        <div className="flex items-center gap-2">
          <div
            onClick={viewPostHandler}
            className="flex items-center group border-[1px] rounded-lg px-4 py-2 bg-black gap-2">
            <button className="">Explore</button>
            <MdOutlineArrowCircleRight className="text-xl group-hover:rotate-45 duration-200  " />
          </div>
          <div>
            {
              adminView &&
              <DropDown note={note} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageCnt } from "../../slices/pageCountSlice";
import { Button } from "../ui/button";

export const Card = ({ note, adminView }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewPostHandler = () => {
    dispatch(setPageCnt(1));
    navigate(`/viewnotes/${note.id}`);
  }

  const adminPostHandler = () => {
    dispatch(setPageCnt(1));
    navigate(`/adminpost/${note.id}`);
  }

  //for date
  const date = new Date(note?.updated_at);
  const day = date.getDate();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return (
    <div className="border-[1px] rounded-lg bg-zinc-900 p-2 relative ">
      <div className="flex sm:gap-4 flex-wrap sm:flex-nowrap">
        <img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6149d7bc-57ad-4f0d-9469-ecd452329d3a%2FxTkbdgnzQzGI17aOBUh2Cg.jpeg?table=block&id=bb1052e8-bad5-42e8-969c-444886cc3fd7&cache=v2" alt="" className="w-[100%] h-[230px] sm:w-[30%] sm:h-auto rounded-lg " />
        <div>
          <h1 className="text-xl font-semibold">{note?.title}</h1>
          <p>{note?.description}</p>
          {/* keywords section */}
          <div className="flex gap-2 flex-wrap mt-2">
            {
              note?.keywords?.map((keyword: string) => {
                return (
                  <button
                    key={keyword}
                    className="border-[1px] px-3 rounded-full">{keyword}</button>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className="cursor-pointer flex justify-end md:justify-between items-center mt-2">
        <p className="hidden md:block">created at <span className="italic">{day}-{monthName},{year}</span></p>
        <div className="flex items-center gap-2">
          {
            adminView && (
              <Button
                onClick={adminPostHandler}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 text-black">
                Edit
              </Button>
            )
          }
          <div
            onClick={viewPostHandler}
            className="flex items-center group border-[1px] rounded-lg px-4 py-2 bg-black gap-2">
            <button className="">Explore</button>
            <MdOutlineArrowCircleRight className="text-xl group-hover:rotate-45 duration-200  " />
          </div>
        </div>
      </div>
    </div>
  )
}

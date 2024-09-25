import { useSelector } from "react-redux";
import DropDown from "./DropDown";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdArrowOutward } from "react-icons/md";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const PostNabar = () => {
  const pages = useSelector((state: any) => state.page?.pages);
  const pageLength = pages?.length || 0;
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const firsturl = pathSegments[1];
  const postid = pathSegments[2];
  const pageid = pathSegments[3];
  const currentPage = parseInt(pageid) || 1;

  const nextPageHandler = () => {
    if (currentPage < pageLength) {
      navigate(`/${firsturl}/${postid}/${currentPage + 1}`);
    }
  };

  const decreasePageHandler = () => {
    if (currentPage > 1) {
      navigate(`/${firsturl}/${postid}/${currentPage - 1}`);
    }
  };

  return (
    <div className="bg-black py-2 sticky top-0 z-50">
      <div className="w-[90vw] mx-auto flex justify-between items-center">
        <NavLink to="/notes" className="font-bold text-xl sm:text-2xl">
          MyCodingNotes
        </NavLink>
        <div className="flex justify-center gap-1 sm:gap-2 items-center">
          <button onClick={decreasePageHandler} className="border-[1px] rounded-md">
            <GrFormPrevious className="text-2xl" />
          </button>
          <button onClick={nextPageHandler} className="border-[1px] rounded-md">
            <MdOutlineNavigateNext className="text-2xl" />
          </button>
          <div className="group">
            <button className="border-[1px] rounded-md flex items-center px-1">
              <span>({currentPage}/{pageLength})</span>
              <MdArrowOutward className="text-2xl" />
            </button>
            <div className="hidden group-hover:block relative">
              <DropDown pages={pages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNabar;
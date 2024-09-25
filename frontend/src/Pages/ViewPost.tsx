import PostNabar from "../Components/Header/PostNabar";
import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPages } from "../slices/pageCountSlice";
import ViewContent from "@/Components/Codeblock/ViewContent";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const ViewPost = () => {
  const [data, setData] = useState([]);
  const [pageTitle, setPageTitle] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [menu,setMenu]=useState<boolean>(false);
  const navigate=useNavigate();
  const pageid = window.location.pathname.split("/")[3];

  useEffect(() => {
    setLoading(true);
    const fetchPageDetails = async () => {
      const postId = window.location.pathname.split("/")[2];
      const response = await getPage(postId, pageid);
      if(response?.status===404){
        navigate("/notes");
      }
      setPageTitle(response?.data?.page_title);
      setPostTitle(response?.data?.post_title);
      dispatch(setPages(response?.pages));
      setData(response?.data?.markdowns);
      setLoading(false);
    }

    fetchPageDetails();
  }, [pageid])
  return (
    <div className='min-h-[90vh]  mx-auto'>
      <PostNabar />
      {
        loading ? <div>
          <Loader />
        </div> : <div className="mx-auto bg-slate-900 px-4 sm:px-14 pb-4">
          <div className="font-bold text-start fixed top-12 sm:top-14 left-2 sm:left-8 flex gap-2 items-center z-10">
            <GiHamburgerMenu 
            onClick={()=>setMenu(!menu)}
            className="cursor-pointer text-white bg-gray-600 text-3xl p-2 rounded-md"/>
            {menu && <h1 className="bg-slate-950 px-4 py-2 rounded-md">{postTitle}</h1>}
          </div>
          <h1 className=" text-2xl sm:text-3xl font-bold text-center underline underline-offset-4 pb-4 italic mt-1">{pageTitle}</h1>
          {
            data?.length > 0 ? data.map((markdown: any) => {
              return (
                <div
                  key={markdown.id}
                  className="md:max-w-[80%] mx-auto overflow-hidden">
                  <ViewContent
                    content={markdown.content}
                  />
                </div>
              )
            }) :
              <div className="flex justify-center items-center text-4xl font-bold mt-20">
                <h1>Nothing inside</h1>
              </div>
          }
        </div>
      }

    </div>

  )
}

export default ViewPost
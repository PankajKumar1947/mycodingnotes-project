import { Codeblock } from "../Components/Codeblock/Codeblock";
import PostNabar from "../Components/Header/PostNabar";
import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLength } from "../slices/pageCountSlice";

const ViewPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageCnt = useSelector((state: any) => state.page.pagecnt);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchPageDetails = async () => {
      const postId = window.location.pathname.split("/")[2];
      const response = await getPage(postId, pageCnt);
      setData(response?.data?.markdowns);
      dispatch(setPageLength(response?.pageLength || 1));
      setLoading(false);
    }

    fetchPageDetails();
  }, [pageCnt])
  return (
    <div className='min-h-[90vh]  mx-auto'>
      <PostNabar />
      {
        loading ? <div>
          <Loader />
        </div> : <div className="w-[90vw] mx-auto ">
          {
            data?.length > 0 ? data.map((markdown: any) => {
              return (
                <Codeblock input={markdown?.content} key={markdown.id} />
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
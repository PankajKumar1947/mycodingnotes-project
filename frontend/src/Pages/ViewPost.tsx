import { Codeblock } from "../Components/Codeblock/Codeblock";
import PostNabar from "../Components/Header/PostNabar";
import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageCnt=useSelector((state:any)=>state.page.pagecnt);

  useEffect(() => {
    setLoading(true);
    const fetchPageDetails = async () => {
      const id = window.location.pathname.split("/")[2];
      const response = await getPage(id, pageCnt);
      setData(response?.markdowns);
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
            data?.length > 0 && data.map((markdown: any) => {
              return (
                <Codeblock input={markdown?.content} key={markdown.id} />
              )
            })
          }

        </div>
      }
    </div>
  )
}

export default ViewPost
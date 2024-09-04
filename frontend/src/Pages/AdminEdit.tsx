import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLength } from "../slices/pageCountSlice";
import { Button } from "@/Components/ui/button";
import PostNabar from "@/Components/Header/PostNabar";
import CreatePageBtn from "@/Components/Common/CreatePageBtn";
import { useNavigate } from "react-router-dom";

const AdminEdit = () => {
    const [data, setData] = useState([]);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const page = useSelector((state: any) => state.page);
    const pageCnt = page?.pagecnt;
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const postId = window.location.pathname.split("/")[2];

    useEffect(() => {
        setLoading(true);
        const fetchPageDetails = async () => {
            const response = await getPage(postId, pageCnt);
            setPageTitle(response?.data?.page_title);
            setData(response?.data?.markdowns);
            dispatch(setPageLength(response?.pageLength || 1));
            setLoading(false);
        }
        console.log("data", data)
        fetchPageDetails();
    }, [pageCnt])

    const addNewNotes=()=>{
        navigate(`/${postId}/createmarkdown`)
    }
    return (
        <div className=" text-white">
            <PostNabar />
            {
                loading ? <div>
                    <Loader />
                </div> : <div className="mx-auto prose lg:prose-xl bg-white px-10 py-4">
                    <div className="text-black">{pageTitle}</div>
                    {
                        data?.length > 0 ? data.map((markdown: any) => {
                            return (
                                <div
                                key={markdown.id}
                                className="border-t-2 py-2">
                                    <div>
                                        {markdown.content}
                                    </div>
                                    <div className="text-end">
                                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Edit</Button>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className="flex justify-center items-center text-4xl font-bold mt-20">
                                <h1>Nothing inside</h1>
                            </div>
                    }
                    <div className="text-center">
                        <Button 
                        onClick={addNewNotes}
                        className="bg-green-400 hover:bg-green-500 text-black">Add new notes</Button>
                    </div>

                    {/* show the add new page in the last page */}
                    {
                        page.pagecnt===page.pageLength && <div className="text-center  flex justify-between gap-2 text-sm items-center">
                        <input type="text" placeholder="Enter Title for new Page" className="flex-1 p-2 border-black rounded-md border-2"/>
                        <CreatePageBtn/>
                    </div>
                    }
                </div>
            }

        </div>
    )
}

export default AdminEdit
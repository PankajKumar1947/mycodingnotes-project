import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLength } from "../slices/pageCountSlice";
import { Button } from "@/Components/ui/button";
import PostNabar from "@/Components/Header/PostNabar";
import CreatePageBtn from "@/Components/Common/CreatePageBtn";
import { useNavigate } from "react-router-dom";

interface pageDetails {
    tilte: string,
    page_id: number
}

const AdminEdit = () => {
    const [data, setData] = useState([]);
    const [currPageDetails, setCurrPageDetails] = useState<pageDetails>();
    const [loading, setLoading] = useState(false);
    const page = useSelector((state: any) => state.page);
    const pageCnt = page?.pagecnt;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postId = window.location.pathname.split("/")[2];
    const [notesRefresh, setNotesRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchPageDetails = async () => {
            const response = await getPage(postId, pageCnt);
            setCurrPageDetails({
                tilte: response?.data?.page_title,
                page_id: response?.data?.id,
            })
            setData(response?.data?.markdowns);
            dispatch(setPageLength(response?.pageLength || 1));
            setLoading(false);
        }
        fetchPageDetails();
    }, [pageCnt, notesRefresh])

    const addNewNotes = () => {
        navigate(`/${postId}/createmarkdown/${currPageDetails?.page_id}`)
    }
    return (
        <div className=" text-white">
            <PostNabar />
            {
                loading ? <div>
                    <Loader />
                </div> : <div className="sm:max-w-[90%] mx-auto bg-white px-4 sm:px-14 py-4  ">
                    <h1 className="text-black text-2xl font-bold text-center">{currPageDetails?.tilte}</h1>
                    {
                        data?.length > 0 ? data.map((markdown: any) => {
                            return (
                                <div
                                    key={markdown.id}
                                    className="border-t-2 py-2 prose lg:prose-xl mx-auto overflow-hidden">
                                    <div dangerouslySetInnerHTML={{__html:markdown.content}}></div>
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
                        page.pagecnt === page.pageLength && <CreatePageBtn setNotesRefresh={setNotesRefresh} />
                    }
                </div>
            }
        </div>
    )
}

export default AdminEdit
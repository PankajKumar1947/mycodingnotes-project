import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPages } from "../slices/pageCountSlice";
import { Button } from "@/Components/ui/button";
import PostNabar from "@/Components/Header/PostNabar";
import CreatePageBtn from "@/Components/Common/CreatePageBtn";
import { useNavigate } from "react-router-dom";
import TextEditor from "@/Components/Codeblock/TextEditor";

interface pageDetails {
    tilte: string,
    page_id: number
}

interface editMarkdown {
    markdownId: number,
    editOption: boolean,
}

const AdminEdit = () => {
    const [data, setData] = useState([]);
    const [currPageDetails, setCurrPageDetails] = useState<pageDetails>();
    const [editOption, setEditOption] = useState<editMarkdown>({
        markdownId: 0,
        editOption: false
    });
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
            dispatch(setPages(response?.pages));
            setLoading(false);
        }
        fetchPageDetails();
    }, [pageCnt, notesRefresh])

    const addNewNotes = () => {
        navigate(`/${postId}/createmarkdown/${currPageDetails?.page_id}`)
    }

    const editMarkdownHandler = (id: number) => {
        setEditOption({ markdownId: id, editOption: true })
    }

    return (
        <div className=" text-white">
            <PostNabar />
            {
                loading ? <div>
                    <Loader />
                </div> : <div className=" mx-auto bg-gray-300 px-4 sm:px-14 py-4  ">
                    <h1 className="text-black text-2xl mb-2 sm:text-4xl font-bold text-center underline underline-offset-4">{currPageDetails?.tilte}</h1>
                    {
                        data?.length > 0 ? data.map((markdown: any) => {
                            return (
                                <div
                                    key={markdown.id}
                                    className="border-b-2 border-gray-500 py-2 md:max-w-[80%] mx-auto overflow-hidden">
                                    <TextEditor
                                        setEditOption={setEditOption}
                                        setNotesRefresh={setNotesRefresh}
                                        content={markdown.content} editOption={editOption} id={markdown?.id} />
                                    <div className="text-end opacity-40 hover:opacity-100">
                                        <Button
                                            onClick={() => editMarkdownHandler(markdown.id)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6">Edit</Button>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className="flex justify-center items-center text-4xl font-bold mt-20">
                                <h1>Nothing inside</h1>
                            </div>
                    }

                    {
                        currPageDetails?.page_id != undefined && <div className="text-center">
                            <Button
                                onClick={addNewNotes}
                                className="bg-green-400 hover:bg-green-500 text-black">Add new notes</Button>
                        </div>
                    }

                    {/* show the add new page in the last page */}
                    {
                        page.pagecnt === page.pages?.length && <CreatePageBtn setNotesRefresh={setNotesRefresh} />
                    }
                </div>
            }
        </div>
    )
}

export default AdminEdit
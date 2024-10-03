import { getPage } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPages } from "../slices/pageCountSlice";
import { Button } from "@/Components/ui/button";
import PostNabar from "@/Components/Header/PostNabar";
import CreatePageBtn from "@/Components/Common/CreatePageBtn";
import { useLocation } from "react-router-dom";
import TextEditor from "@/Components/Codeblock/TextEditor";
import { GiHamburgerMenu } from "react-icons/gi";
import { CreateMarkdown } from "./CreateMarkdown";
import { IoIosCreate } from "react-icons/io";

interface pageDetails {
    tilte: string,
    page_id: number,
    post_title: string,
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
    const dispatch = useDispatch();
    const location = useLocation();
    const [pageId, setPageId] = useState<number>(0);
    const segments = location.pathname.split("/");
    const postId = segments[2];
    const pageCnt = segments[3];
    const [notesRefresh, setNotesRefresh] = useState(false);
    const [menu, setMenu] = useState<boolean>(false);
    const [notesBoxOpen, setNotesBoxOpen] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchPageDetails = async () => {
            const response = await getPage(postId, pageCnt);
            setCurrPageDetails({
                tilte: response?.data?.page_title,
                page_id: response?.data?.id,
                post_title: response?.data?.post_title,
            })
            setData(response?.data?.markdowns);
            setPageId(response?.data?.id);
            dispatch(setPages(response?.pages));
            setLoading(false);
            setNotesBoxOpen(false);
        }
        fetchPageDetails();
    }, [pageCnt, notesRefresh])

    const editMarkdownHandler = (id: number) => {
        setEditOption({ markdownId: id, editOption: true })
    }

    return (
        <div className=" text-white">
            <PostNabar />
            {
                loading ? <div>
                    <Loader />
                </div> : <div className="mx-auto bg-slate-900 px-4 sm:px-14 pb-4">
                    <div className="font-bold text-start fixed top-12 sm:top-14 left-2 sm:left-8 flex gap-2 items-center z-10">
                        <GiHamburgerMenu
                            onClick={() => setMenu(!menu)}
                            className="cursor-pointer text-white bg-gray-600 text-3xl p-2 rounded-md" />
                        {menu && <h1 className="bg-slate-950 px-4 py-2 rounded-md">{currPageDetails?.post_title}</h1>}
                    </div>
                    <h1 className=" text-2xl sm:text-3xl font-bold text-center underline underline-offset-4 pb-4 italic mt-1">{currPageDetails?.tilte}</h1>
                    <div>
                        {
                            data?.length > 0 && data.map((markdown: any) => {
                                return (
                                    <div
                                        key={markdown.id}
                                        className="border-b-2 border-gray-500 py-2 md:max-w-[80%] mx-auto overflow-hidden">
                                        <TextEditor
                                            setEditOption={setEditOption}
                                            setNotesRefresh={setNotesRefresh}
                                            content={markdown.content} editOption={editOption} id={markdown?.id} />
                                        <div className="text-end opacity-40 hover:opacity-100 flex justify-end">
                                            <IoIosCreate
                                                onClick={() => editMarkdownHandler(markdown.id)}
                                                className="text-3xl text-yellow-400 cursor-pointer"
                                            />

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        currPageDetails?.page_id != undefined && !notesBoxOpen && <div className="text-center my-2">
                            <p className="text-blue-500 font-semibold">Click add button to add notes to this page</p>
                            <Button
                                onClick={() => setNotesBoxOpen(true)}
                                className="bg-green-400 hover:bg-green-500 text-black mt-1">Add Notes</Button>
                        </div>
                    }


                    {/* add new notes */}
                    {
                        notesBoxOpen && <div className="md:max-w-[80%] mx-auto">
                            <CreateMarkdown setNoesBoxOpen={setNotesBoxOpen} setNotesRefresh={setNotesRefresh} postId={postId} pageId={pageId} />
                        </div>
                    }

                    {/* show the add new page in the last page */}
                    {
                        (pageCnt == page.pages?.length || page.pages?.length === undefined) && <>
                            <CreatePageBtn setNotesRefresh={setNotesRefresh} />
                            <p className="text-blue-500 font-semibold text-end">This will add new page</p>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default AdminEdit
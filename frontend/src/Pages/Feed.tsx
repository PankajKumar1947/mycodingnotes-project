import { useState ,useEffect} from "react";
import ViewNotes from "@/Components/Feed/ViewNotes";
import { Button } from "@/Components/ui/button";
import { CiSearch } from "react-icons/ci";
import { getAllNotes, getPostByKeywords } from "..//Services/operations/post";

const keywords=["All","Javascript","Typescript","React","Nodejs","Express","MongoDB","SQL"]
const Feed = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const getNotes = async () => {
            setLoading(true);
            setNotes(await getAllNotes());
            setLoading(false);
        }

        const getPostKeywords=async()=>{
            setLoading(true);
            const response = await getPostByKeywords(searchQuery);
            setNotes(response?.data);
            setLoading(false);
        }
        if(searchQuery=="All" || searchQuery==""){
            getNotes();
        }else{
            getPostKeywords();
        }
    }, [searchQuery])
    
    return (
        <>
            <div className="mx-auto flex flex-col items-center py-8 sm:pt-24">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <h1 className="text-3xl sm:text-6xl  text-center font-black leading-10 bg-gradient-to-r from-blue-600 via-red-500 to-yellow-400 inline-block text-transparent bg-clip-text">
                        Discover and Share <span className="text-indigo-700">NOTES</span> on {' '}
                        <span className="text-blue-800">MyCoding</span>Notes.
                    </h1>
                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-200 font-normal text-center sm:text-xl">
                        Explore and share coding notes — community-driven knowledge at your fingertips.
                    </p>
                </div>
                <div className="flex w-11/12 md:w-8/12">
                    <div className="flex rounded-md w-full">
                        <input
                            type="text"
                            name="q"
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery(e.target.value)}
                            className="w-full p-2 sm:p-3 rounded-md rounded-r-none border-2 border-blue-700 placeholder-current bg-gray-500 text-gray-300 outline-none"
                            placeholder="keyword"
                        />
                        <button
                            className="inline-flex items-center gap-2 bg-blue-700 text-white sm:text-lg font-semibold px-2 sm:py-3 sm:px-6 rounded-r-md"
                        >
                            <span>Find</span>
                            <CiSearch />
                        </button>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-4 flex-wrap px-4 sm:px-10">
                    {keywords.map((keyword) => (
                        <p
                            key={keyword}
                            onClick={() => setSearchQuery(keyword)}
                            className={`cursor-pointer text-xs sm:text-base text-gray-200 px-4 py-1 border-[1px] rounded-3xl ${keyword === searchQuery ? 'bg-indigo-700' : 'text-white'} hover:text-white transition`}
                        >
                            {keyword}
                        </p>
                    ))}
                </div>
            </div>
            <ViewNotes notes={notes} loading={loading}/>

            <div className="flex justify-center mt-10">
                <Button className="px-4 py-2 rounded-md text-white bg-blue-700 hover:bg-blue-600">Load more</Button>
            </div>
        </>
    );
};

export default Feed;

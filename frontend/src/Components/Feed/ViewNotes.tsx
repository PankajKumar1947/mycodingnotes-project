import { useEffect, useState } from "react"
import { Card } from "../Card/Card"
import { getAllNotes } from "../../Services/operations/post";
import FeedLoader from "./FeedLoader";

const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getNotes = async () => {
            setNotes(await getAllNotes());
            setLoading(false);
        }
        getNotes();
    }, [])
    return (
        <div className="w-[90vw] mx-auto   ">
            {
                loading ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                    <FeedLoader />
                    <FeedLoader />
                    <FeedLoader />
                </div> :
                    notes?.length === 0 ? <div className="min-h-[80vh] w-full">
                        <h1 className="text-2xl font-bold text-center">No Notes Found</h1>
                    </div>
                        :
                        <div className="grid md:grid-cols-2  gap-5">
                            {
                                notes?.map((note, ind) => {
                                    return <Card key={ind} note={note} />
                                })}
                        </div>
            }
        </div>
    )
}

export default ViewNotes
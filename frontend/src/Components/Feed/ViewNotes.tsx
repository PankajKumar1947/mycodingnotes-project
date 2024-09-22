
import { Card } from "../Card/Card"

import FeedLoader from "./FeedLoader";

const ViewNotes = ({notes,loading}:any) => {
    
    return (
        <div className="w-[90vw] mx-auto   ">
            {
                loading ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                    <FeedLoader />
                    <FeedLoader />
                    <FeedLoader />
                </div> :
                    notes?.length === 0 ? <div className="min-h-[80vh] w-full">
                        <h1 className="text-2xl font-bold text-center text-white">No Notes Found</h1>
                    </div>
                        :
                        <div className="grid md:grid-cols-2  gap-5">
                            {
                                notes?.map((note:any, ind:number) => {
                                    return <Card key={ind} note={note} />
                                })}
                        </div>
            }
        </div>
    )
}

export default ViewNotes
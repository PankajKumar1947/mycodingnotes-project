import { useEffect, useState } from "react"
import { Card } from "../Components/Card/Card"
import { getAllNotes } from "../Services/operations/post";
import Loader from "../Components/Loaders/Loader";

export const Home = () => {
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
    <>
      <div className="w-[90vw] mx-auto  my-5 ">
        {
          loading ? <Loader /> :
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
    </>
  )
}


import { Navbar } from "../Components/Header/Navbar"


export const CreatePost=()=>{
    return (
        <>
          <Navbar/>
          <div className="sm:w-[90vw] mx-2 sm:mx-auto bg-black mt-2 py-4 rounded-2xl">
            <h1 className="text-2xl text-center font-bold">Create new note</h1>
            <form action="" className="w-[95vw] sm:w-[80vw] mx-auto flex flex-col gap-4 p-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-semibold">Title for note</label>
                <input type="text" className="w-full p-2 bg-black border-[1px] rounded-md" placeholder="Title" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-semibold">Note's image</label>
                <input type="file" className="w-full p-2 bg-black border-[1px] rounded-md" placeholder="Post image" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-semibold">Keywords</label>
                <input type="text" className="w-full p-2 bg-black border-[1px] rounded-md" placeholder="c cpp dsa" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-semibold">Description</label>
                <textarea rows={10} className="w-full p-2 bg-black border-[1px] rounded-md" placeholder="Title" />
              </div>
              
              <input type="submit" value={"Submit"} className="bg-green-600 font-semibold px-4 py-2 rounded-2xl"/>
            </form>

          </div>
        </>
    )
}
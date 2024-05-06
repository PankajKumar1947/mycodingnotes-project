
const PostNabar = () => {
  return (
    <div className="bg-black  py-2">
        <div className="w-[90vw] mx-auto flex justify-between items-center">
            <h1 className="font-bold text-2xl">MyCodingNotes</h1>   
            
            <h2>Topic names (1/11)</h2>
            <div className="flex justify-center gap-2 items-center">
                <button className="border-[1px] px-4 rounded-md">Prev</button>
                <button className="border-[1px] px-4 rounded-md">Next</button>
                <button className="border-[1px] px-4 rounded-md">Jumpto</button>
            </div>
        </div>
    </div>
  )
}

export default PostNabar
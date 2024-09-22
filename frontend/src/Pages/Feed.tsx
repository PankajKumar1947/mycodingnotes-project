import ViewNotes from "@/Components/Feed/ViewNotes";
import { Button } from "@/Components/ui/button";
import { CiSearch } from "react-icons/ci";

const Feed = () => {
    return (
        <>
            <div className="mx-auto flex flex-col items-center py-8 sm:py-24">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center  font-black leading-10">
                        Let's not stress for{' '}
                        <span className="text-blue-800">dfafds</span> designs.
                    </h1>
                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-200 font-normal text-center text-xl">
                        A Community-built Notebook.
                    </p>
                </div>
                <div className="flex w-11/12 md:w-8/12 ">
                    <div className="flex rounded-md w-full">
                        <input
                            type="text"
                            name="q"
                            className="w-full p-2 sm:p-3 rounded-md rounded-r-none  border-2 border-blue-700 placeholder-current bg-gray-500 text-gray-300 outline-none"
                            placeholder="keyword"
                        />
                        <button className="inline-flex items-center gap-2 bg-blue-700 text-white sm:text-lg font-semibold px-2 sm:py-3 sm:px-6 rounded-r-md">
                            <span>Find</span>
                            <CiSearch />
                        </button>
                    </div>
                </div>
            </div>
            <ViewNotes/>

            <div className="flex justify-center mt-10">
                <Button className=" px-4 py-2 rounded-md text-white bg-blue-700">Load more</Button>
            </div>
        </>
    );
};

export default Feed;
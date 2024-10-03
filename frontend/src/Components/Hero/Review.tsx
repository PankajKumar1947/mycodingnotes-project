import { FaHeart } from "react-icons/fa6";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import { createReview } from "@/Services/operations/common";

type Input = {
    name: string;
    email: string;
    message: string;
}

const Review = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = async (data) => {
        await createReview(data);
        reset();
    }

    return (
        <div className="sm:max-w-[93%] sm:mx-auto mt-6 sm:mt-12 flex justify-between flex-wrap rounded-lg">
            <div className="max-w-2xl px-4 lg:pr-24">
                <p className="mb-2 text-indigo-500 text-xl font-semibold">Have Feedback?</p>
                <h3 className="mb-2 sm:mb-5 text-2xl sm:text-3xl font-bold text-blue-600">Share Your Experience with MyCodingNotes</h3>
                <p className="mb-6 sm:mb-16 text-sm sm:text-lg text-gray-300">We’re committed to improving your experience. Share your thoughts, suggestions, or ideas on how MyCodingNotes has helped you or how we can make it better.</p>
                <div className="mb-5 flex font-medium">
                    <div className="mr-4">
                        <FaHeart className="text-red-500 font-bold text-2xl mt-2" />
                    </div>
                    <div className="">
                        <p className="mb-2 text-lg text-indigo-500">Loved MyCodingNotes ?</p>
                        <span className="font-normal text-gray-300">Tell us how you used MycodingNotes to make your notes better.</span>
                    </div>
                </div>
                <div className="mb-5 flex font-medium">
                    <div className="mr-4">
                        <BsCollectionPlayFill className="text-blue-500 font-bold text-2xl mt-2" />
                    </div>
                    <div className="">
                        <p className="mb-2 text-lg text-indigo-500">Organized your notes across pages ?</p>
                        <span className="font-normal text-gray-300">We’d love to hear how our multi-page system helped you manage large sets of notes.</span>
                    </div>
                </div>
                <div className="mb-5 flex font-medium">
                    <div className="mr-4">
                        <FcIdea className="font-bold text-2xl mt-2" />
                    </div>
                    <div className="">
                        <p className="mb-2 text-lg text-indigo-500">Ideas for new features ?</p>
                        <span className="font-normal text-gray-300">We’re constantly evolving. Let us know what you'd like to see added next!</span>
                    </div>
                </div>
            </div>
            <div className="border border-indigo-500 m-4 sm:mt-8 mb-8 max-w-lg  rounded-lg lg:mt-0">
                <div className="relative border-b border-inidigo-500 p-4 sm:py-8 sm:px-8">
                    <h3 className="mb-1 inline-block text-3xl font-medium text-blue-600">Write a Review</h3>
                    <p className="text-gray-300">Let us know what you think!</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 sm:p-8 space-y-4 sm:space-y-8">
                    <input
                        {...register("name", { required: true, maxLength: 20 })}
                        type="text" className=" w-full rounded-lg border  px-2 py-2 border-blue-300 bg-transparent " placeholder="Enter your name" />
                    <span className="text-red-500 text-sm">{errors.name && "required and max length is 20"}</span>

                    <input
                        {...register("email", { required: true, maxLength: 30 })}
                        type="email" className=" w-full  rounded-lg border  px-2 py-2 border-blue-300 bg-transparent " placeholder="Enter your email" />
                    <span className="text-red-500 text-sm">{errors.email && "required and max length is 30"}</span>

                    <div>
                        <label className=" inline-block max-w-full text-gray-300 font-semibold">Your Review</label>
                        <textarea
                            {...register("message", { required: true, maxLength: 200 })}
                            rows={4} className="w-full rounded-lg border  px-2 py-2 border-blue-300 bg-transparent " placeholder="Share your experience with MyCodingNotes..."></textarea>
                        <span className="text-red-500 text-sm">{errors.message && "required and max length is 200"}</span>
                    </div>
                    <button type="submit" className="w-full rounded-lg border border-blue-700 bg-blue-700 p-2 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white flex justify-center items-center gap-2"> <span>Submit</span></button>
                </form>
            </div>
        </div>

    )
}

export default Review
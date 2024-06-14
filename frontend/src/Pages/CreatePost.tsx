import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { NOTES_ENDPOINTS } from "../Services/apis";
import toast from "react-hot-toast";

interface NotesData {
  title: string;
  post_img: string;
  keyword: string;
  description: string;
  keywords:Array<String>;
}

export const CreatePost = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotesData>();

  const onSubmit: SubmitHandler<NotesData> = async (data) => {
    console.log(data)
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;

    // Splitintg keyword string into an array
    const keywordArray = data.keyword.split(' ').filter(keyword => keyword);

    data.keywords=keywordArray;
    data.post_img="url"//dummy url for testing

    try {
      const response = await axios.post(
        NOTES_ENDPOINTS.CREATE_NOTE,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(response)

      if (!response) {
        throw new Error("Error in Creating notes");
      }
      toast.success("Notes created successfully");
      navigate(`/${response.data.data.id}/createmarkdown`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:w-[90vw] mx-2 sm:mx-auto bg-black my-2 py-4 rounded-2xl">
      <h1 className="text-2xl text-center font-bold">Create new note</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[95vw] sm:w-[80vw] mx-auto flex flex-col gap-4 p-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-semibold">Title for note</label>
          <input 
            {...register("title", { required: true })}
            type="text" 
            className="w-full p-2 bg-black border-[1px] rounded-md" 
            placeholder="Title" 
          />
          {errors.title && <span className="text-red-400 font-semibold text-sm">Title is required</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="post_img" className="font-semibold">Note's image</label>
          <input 
            {...register("post_img")}
            type="file" 
            className="w-full p-2 bg-black border-[1px] rounded-md" 
            placeholder="Post image" 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="keyword" className="font-semibold">Keyword</label>
          <input 
            {...register("keyword")}
            type="text" 
            className="w-full p-2 bg-black border-[1px] rounded-md" 
            placeholder="c cpp dsa" 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={10} 
            className="w-full p-2 bg-black border-[1px] rounded-md" 
            placeholder="Description" 
          />
          {errors.description && <span className="text-red-400 font-semibold text-sm">Description is required</span>}
        </div>
        <input type="submit" value="Submit" className="bg-green-600 font-semibold px-4 py-2 rounded-2xl" />
      </form>
    </div>
  );
};

import { Button } from "@/Components/ui/button";
import { createPage } from "@/Services/operations/post";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  title: string;
};

const CreatePageBtn = ({setNotesRefresh}:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const postId = window.location.pathname.split("/")[2];
    try {
      const response = await createPage(postId, data.title);
      if (response) {
        setNotesRefresh((prev:boolean)=>!prev)
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)} // Correct usage
        className="flex justify-end items-center gap-2 mt-4 text-base text-black"
      >
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Enter Title for new Page"
          className="flex-1 p-2 border-black rounded-md border-2 "
        />
        <Button className="bg-green-400 hover:bg-green-500 px-4 text-black">
          Create a new page
        </Button>
      </form>
      <div>
        {errors.title && (
          <span className="text-red-400 font-semibold text-sm">
            Title is required
          </span>
        )}
      </div>
    </>
  );
};

export default CreatePageBtn;

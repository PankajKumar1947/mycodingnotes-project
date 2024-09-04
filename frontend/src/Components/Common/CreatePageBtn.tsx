import { Button } from "@/Components/ui/button";
import { createPage } from "@/Services/operations/post";
import { useState } from "react";

const CreatePageBtn = () => {
  const [pageCreateStatus, setPageCreateStatus] = useState(false);
  const createNewPage = async () => {
    const postId = window.location.pathname.split("/")[2];
    const response = await createPage(postId, "Title for page");
    console.log(response)
    if (response)
      setPageCreateStatus(true);
    console.log(pageCreateStatus)

  }
  return (
    <div className="py-4 flex justify-end">
      <Button
        className="bg-green-400 hover:bg-green-500  px-4 text-black"
        onClick={createNewPage}
      >Create a new page</Button>
    </div>
  )
}

export default CreatePageBtn
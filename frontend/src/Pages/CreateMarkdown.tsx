import { useState } from "react";
import Editor from "@/Components/editor/editor";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export const defaultValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: []
        }
    ]
}

export const CreateMarkdown = () => {
    const navigate=useNavigate();
    const [content, setContent] = useState<string>('');
    const postId = window.location.pathname.split("/")[1];
    const handleSubmit = async () => {
        console.log("content ", content);
        //add this contenxt to the markdown schema
        //refresh the get post for profile page
        navigate(`/adminpost/${postId}`)
        
    }
    return (
        <div className="min-h-[80vh] my-2 w-[90vw] mx-auto ">
            <div className="bg-white text-black overflow-hidden rounded-xl mt-4">
                <Editor initialValue={defaultValue} onChange={setContent} />
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    onClick={handleSubmit}
                    className="bg-green-500 px-10 text-black hover:bg-green-400">Save</Button>
            </div>
        </div>
    )
}
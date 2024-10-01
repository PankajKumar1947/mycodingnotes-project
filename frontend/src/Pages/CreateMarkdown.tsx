import { useState } from "react";
import Editor from "@/Components/editor/editor";
import { Button } from "@/Components/ui/button";
import { createMarkdown } from "@/Services/operations/post";

export const defaultValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: []
        }
    ]
}

export const CreateMarkdown = ({setNoesBoxOpen ,setNotesRefresh ,postId, pageId}:any) => {
    const [content, setContent] = useState<string>('');
    const handleSubmit = async () => {
        try{
            await createMarkdown(postId,parseInt(pageId),content );
            setNoesBoxOpen(false);
            setNotesRefresh((prev:boolean)=>!prev);
        }catch(error){
            console.log("error in creating the markdonw");
        }
    }
    return (
        <div className="min-h-[80vh] my-2 w-full mx-auto ">
            <div className="bg-white text-black overflow-hidden rounded-xl mt-4">
                <h2 className="text-center text-2xl font-bold bg-gray-700 text-blue-400 p-1 border-b-[1px] border-blue-400">Type / to get commands</h2>
                <Editor initialValue={defaultValue} onChange={setContent} />
            </div>
            <div className="flex justify-center mt-2 gap-2"> 
                <Button
                    onClick={() => setNoesBoxOpen(false)}
                    className="bg-red-500 px-10 text-white hover:bg-red-400">Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-green-500 px-10 text-black hover:bg-green-400">Save</Button>
            </div>
        </div>
    )
}
import { useState } from "react";
import Editor from "@/Components/editor/editor";
import { Button } from "@/Components/ui/button";

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
    const [content, setContent] = useState<string>('')
    const handleSubmit = async () => {
        console.log("content ", content);
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
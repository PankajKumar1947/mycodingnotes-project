import { useState } from 'react'
import Editor from "@/Components/editor/editor";
import { generateJSON } from '@tiptap/core';
import { Button } from '../ui/button';
import { defaultExtensions } from '../editor/extensions';
import { updateMarkdown } from '@/Services/operations/post';
import ViewContent from './ViewContent';

const TextEditor = ({ content, editOption, id ,setNotesRefresh,setEditOption}: any) => {
    const defaultValue = generateJSON(content, defaultExtensions);
    const [cont, setContent] = useState<string>(content);

    const updateContent=async()=>{
        try{
            await updateMarkdown(id,cont);
            console.log("content updated");
            setNotesRefresh((prev:boolean)=>!prev);
            setEditOption({
                editOption:false,
            })
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className=" text-black overflow-hidden rounded-xl">
            {
                editOption.editOption && editOption.markdownId === id ? <div className='w-full'>
                    <Editor initialValue={defaultValue} onChange={setContent} />
                    <div className="text-center py-2">
                        <Button
                            onClick={updateContent}
                            className="bg-green-400 hover:bg-green-500 text-black">Update</Button>
                    </div>
                </div> : <ViewContent content={content}/>
            }
        </div>
    )
}

export default TextEditor
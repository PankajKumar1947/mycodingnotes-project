import { useState } from 'react'
import Editor from "@/Components/editor/editor";
import { generateJSON } from '@tiptap/core';
import { Button } from '../ui/button';

import { defaultExtensions } from '../editor/extensions';

const TextEditor = ({ content, editOption, id }: any) => {
    const defaultValue = generateJSON(content, defaultExtensions);
    const [cont, setContent] = useState<string>(content);
    console.log("content = ",cont)

    return (
        <div className=" text-black overflow-hidden rounded-xl mt-4">
            {
                editOption.editOption && editOption.markdownId === id ? <div className='bg-white'>
                    <Editor initialValue={defaultValue} onChange={setContent} />
                    <div className="text-center py-2">
                        <Button
                            className="bg-green-400 hover:bg-green-500 text-black">Update</Button>
                    </div>
                </div> : <div
                    className='p-4'
                    dangerouslySetInnerHTML={{ __html: content }}></div>
            }
        </div>
    )
}

export default TextEditor
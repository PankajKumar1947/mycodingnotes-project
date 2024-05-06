import { useState } from "react";
import { Codeblock } from "../Components/Codeblock/Codeblock";

export const CreateMarkdown=()=>{
    const [input,setInput]=useState();
    return (
        <div>
            <div className="min-h-[80vh] w-[90vw] mx-auto flex justify-center gap-1 ">
                <textarea 
                onChange={(e:any)=>setInput(e.target.value)}
                autoFocus
                name="" id="" cols={30} rows={10} className="bg-gray-800 w-[50%] text-white p-2">

                </textarea>
                <div className="w-[50%] border-[1px] text-sm  text-black">
                    <Codeblock input={input}/>
                </div>
            </div>
        </div>
    )
}
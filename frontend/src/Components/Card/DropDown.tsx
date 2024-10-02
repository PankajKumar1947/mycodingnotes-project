import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { makePrivate } from "@/Services/operations/post";

const DropDown = ({ note }: any) => {
    const navigate = useNavigate();
    const adminPostHandler = () => {
        navigate(`/adminpost/${note?.id}/1`);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger><BsThreeDotsVertical /></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white">
                <DropdownMenuItem
                    onClick={adminPostHandler}
                >Edit</DropdownMenuItem>
                <DropdownMenuItem
                onClick={()=>makePrivate(note?.id)}
                >Make 
                {
                    note?.private ? " Public" : " Private"
                }
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown
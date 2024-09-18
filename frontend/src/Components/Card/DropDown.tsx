import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageCnt } from "../../slices/pageCountSlice";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { makePrivate } from "@/Services/operations/post";

const DropDown = ({ note }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adminPostHandler = () => {
        dispatch(setPageCnt(1));
        navigate(`/adminpost/${note?.id}`);
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
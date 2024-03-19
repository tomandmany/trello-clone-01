import { BoardType } from "@/types";
import StarButton from "../../Buttons/StarButton";

const MenuBar = ({ boardName }: BoardType) => {
    return (
        <div className="flex bg-gray-600/40 py-3 pl-14 backdrop-blur-sm">
            <div className="flex gap-4 items-center">
                <h1 className="text-white font-bold">{boardName}</h1>
                <StarButton />
            </div>
        </div>
    )
}

export default MenuBar
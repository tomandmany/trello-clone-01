import { BoardType } from "@/types";
import StarButton from "../../Buttons/StarButton";

const MenuBar = ({ boardName }: BoardType) => {
    return (
        <div className="flex bg-white/50 py-3 pl-14 backdrop-blur-sm">
            <div className="flex gap-4 items-center">
                <h1 className="text-gray-600 font-bold">{boardName}</h1>
                {/* <StarButton /> */}
            </div>
        </div>
    )
}

export default MenuBar
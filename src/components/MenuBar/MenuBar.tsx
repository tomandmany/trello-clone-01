import StarButton from "../Buttons/StarButton";

const MenuBar = () => {
    return (
        <div className="flex bg-gray-600/40 py-3 pl-14 backdrop-blur-sm">
            <div className="flex gap-4 items-center">
                <h1 className="text-white font-bold">新歓期制作物</h1>
                <StarButton />
            </div>
        </div>
    )
}

export default MenuBar
type SideMenuItemProps = {
    boardName: string;
}

const SideMenuItem = ({ boardName }: SideMenuItemProps) => {
    return (
        <div className="flex items-center px-3 py-2 hover:bg-gray-600 hover:cursor-pointer">
            {/* <img src="" alt="boardIcon" /> */}
            <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-white"></div>
                <h2>{boardName}</h2>
            </div>
            <button>

            </button>
        </div>
    )
}

export default SideMenuItem
import StarButton from "../Buttons/StarButton";

type DropDownMenuItemProps = {
    itemName: string;
    type: 'workspace' | 'star';
}

const DropDownMenuItem = ({ itemName, type }: DropDownMenuItemProps) => {
    if (type === 'workspace') {
        return (
            <>
                {/* <img src="" alt="boardIcon" /> */}
                <button className="flex items-center gap-4 text-sm p-2 rounded-lg hover:bg-zinc-700">
                    <div className="w-10 h-10 bg-white"></div>
                    {itemName}
                </button>
            </>
        )
    } else if (type === 'star') {
        return (
            <>
                {/* <img src="" alt="boardIcon" /> */}
                <button className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-zinc-700">
                    <img className="w-10" src="/bg.jpg" alt="" />
                    {itemName}
                    <StarButton />
                </button>
            </>
        )
    }
}

export default DropDownMenuItem
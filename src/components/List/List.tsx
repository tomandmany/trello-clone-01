// List.tsx
import Card from "../Card/Card";
import EllipsisIcon from "../Icons/EllipsisIcon/EllipsisIcon";
import PlusIcon from "../Icons/PlusIcon/PlusIcon";

type ListProps = {
    listTitle: string;
}

const List = ({ listTitle }: ListProps) => {
    return (
        <div className="bg-black text-gray-200 w-fit rounded-lg min-w-[300px] max-w-[300px] flex flex-col">
            <div className="flex justify-between px-2 pt-2">
                <h3 className="gap-4 px-2 py-4 hover:cursor-pointer">{listTitle}</h3>
                <EllipsisIcon />
            </div>
            <div className="overflow-y-auto p-2 flex flex-col gap-2">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="flex text-sm m-2 p-2 gap-2 hover:bg-gray-700 hover:cursor-pointer rounded-lg items-center">
                <PlusIcon />
                カードを追加
            </div>
        </div>
    );
};

export default List;
// MenuBarButton.tsx
import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem"
import { DownArrow, UpArrow } from "../Icons/ArrowIcon/ArrowIcon"

type MenuBarButtonProps = {
    menuName: string;
    type: 'workspace' | 'star';
    openMenu: 'workspace' | 'star' | null;
    handleOpenMenu: (type: 'workspace' | 'star') => void;
}

const MenuBarButton = ({ menuName, type, openMenu, handleOpenMenu }: MenuBarButtonProps) => {
    const isOpen = openMenu === type;

    const handleDropDown = () => {
        handleOpenMenu(type);
    }

    const workSpaceDropDownMenu = () => {
        return (
            <>
                <div className="pb-3 px-4 border-b">
                    <h4 className="px-2 py-3">現在のワークスペース</h4>
                    <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                </div>
                <div className="pb-3 px-4">
                    <h4 className="px-2 pt-4 pb-2">ワークスペース</h4>
                    <div className="flex flex-col gap-2">
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                        <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                    </div>
                </div>
            </>
        )
    }

    const starDropDownMenu = () => {
        return (
            <div className="px-2">
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
                <DropDownMenuItem type={type} itemName="第140回明大祭実行委員会制作局制作物チェック" />
            </div>
        )
    }

    const renderDropDownMenu = () => {
        if (type === 'workspace') {
            return workSpaceDropDownMenu();
        } else if (type === 'star') {
            return starDropDownMenu();
        }
    }

    return (
        <>
            {
                isOpen ?
                    (
                        <>
                            <button
                                onClick={handleDropDown}
                                className="relative bg-gray-600 hover:bg-gray-700 px-2 my-3 rounded flex items-center gap-2"
                            >
                                {menuName}
                                <UpArrow />
                            </button>
                            <div className="absolute left-44 top-14 bg-zinc-800 w-max max-h-[93vh] z-10 overflow-y-auto rounded-lg py-3">
                                {renderDropDownMenu()}
                            </div>
                        </>
                    )
                    :
                    (
                        <button
                            onClick={handleDropDown}
                            className="hover:bg-gray-600 px-2 my-3 rounded flex items-center gap-2"
                        >
                            {menuName}
                            <DownArrow />
                        </button>
                    )
            }
        </>
    )
}

export default MenuBarButton
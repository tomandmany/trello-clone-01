'use client'

import { useState } from "react"
import { LeftArrow, RightArrow } from "../Icons/ArrowIcon/ArrowIcon";
import SideMenuItem from "./SideMenuItem/SideMenuItem";

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenState = () => {
        setIsOpen(!isOpen);
    }

    if (isOpen) {
        return (
            <div className="absolute h-[calc(100vh-3.5rem)] bg-gray-800/90 w-72 left-0 top-0 text-gray-200 backdrop-blur-lg">
                <div className="flex items-center px-3 py-2 border-b border-gray-500">
                    {/* <img src="" alt="boardIcon" /> */}
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-white"></div>
                        <h2 className="w-[80%]">第140回明大祭実行委員会制作局制作物チェック</h2>
                    </div>
                    <button
                        onClick={handleOpenState}
                        className="hover:cursor-pointer bg-gray-700 hover:bg-gray-500 p-1">
                        <LeftArrow />
                    </button>
                </div>
                <div className="p-3">
                    <h3 >ボード</h3>
                </div>
                <SideMenuItem boardName={'新歓期制作物'} />
                <SideMenuItem boardName={'あいうえお'} />
            </div>
        )
    } else {
        return (
            <div className="absolute h-[calc(100vh-3.5rem)] bg-gray-800/90 w-72 -left-[16.5rem] top-0 backdrop-blur-lg">
                <button
                    onClick={handleOpenState}
                    className="hover:cursor-pointer bg-gray-800 hover:bg-gray-400 w-fit absolute -right-3 top-4 rounded-full border-gray-600 border text-gray-200">
                    <RightArrow />
                </button>
            </div>
        )
    }
}

export default SideMenu
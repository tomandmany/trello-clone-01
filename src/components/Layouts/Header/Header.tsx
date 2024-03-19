// Header.tsx
'use client'
import { useState } from "react";
import MenuBarButton from "../../Buttons/MenuBarButton";

const Header = () => {
    const [openMenu, setOpenMenu] = useState<'workspace' | 'star' | null>(null);

    const handleOpenMenu = (type: 'workspace' | 'star') => {
        setOpenMenu(openMenu === type ? null : type);
    }

    return (
        <header className="flex justify-between h-20 pl-24 pr-6 bg-gray-800 text-gray-300 border-b border-gray-500">
            <div className="flex gap-2">
                <button>明実Trello</button>
                <MenuBarButton menuName='ワークスペース' type='workspace' openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
                <MenuBarButton menuName='お気に入り' type='star' openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
            </div>
            <div className="flex gap-8">
                <button>通知</button>
                <button>アカウント</button>
                <button>設定</button>
            </div>
        </header>
    )
}

export default Header
// components/Header/Header.tsx
'use client'
import { useState, useEffect } from 'react';
import Link from "next/link";
import BellIcon from "@/components/Icons/BellIcon/BellIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon/SettingsIcon";
import MenuIcon from "@/components/Icons/MenuIcon/MenuIcon";
import MenuBarButton from "@/components/Buttons/MenuBarButton";

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // 初期サイズの設定
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? (
                <header className="flex justify-between min-h-20 pl-2 pr-6 bg-gray-800 text-gray-300 border-b border-gray-500">
                    <div className="flex justify-between w-full items-center px-4">
                        <Link href={'/'}>
                            <div className="hover:bg-gray-700 px-2 py-2 rounded flex">明実Trello</div>
                        </Link>
                        <button>
                            <MenuIcon />
                        </button>
                    </div>
                </header>
            ) : (
                <header className="flex justify-between min-h-20 pl-24 pr-6 bg-gray-800 text-gray-300 border-b border-gray-500">
                    <div className="flex gap-2 items-center">
                        <Link href={'/'}>
                            <div className="hover:bg-gray-700 px-2 py-2 rounded flex">明実Trello</div>
                        </Link>
                        <MenuBarButton menuName='ワークスペース' type='workspace' />
                        {/* <MenuBarButton menuName='お気に入り' type='star' /> */}
                    </div>
                    <div className="flex gap-4 items-center">
                        {/* <Link href={'#'}>
              <div className="hover:bg-gray-700 p-2 rounded">
                <BellIcon />
              </div>
            </Link> */}
                        <Link href={'/members/1'}>
                            <button className="w-8 h-8 block bg-gray-400 rounded-full" />
                        </Link>
                        {/* <Link href={'#'}>
              <div className="hover:bg-gray-700 p-2 rounded">
                <SettingsIcon />
              </div>
            </Link> */}
                    </div>
                </header>
            )}
        </>
    )
}

export default Header;
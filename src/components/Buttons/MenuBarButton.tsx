// components/Buttons/MenuBarButton.tsx
'use client'
import { useState, useEffect, useRef } from 'react';
import { WorkspaceType } from "@/types";
import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem"
import { DownArrow, UpArrow } from "../Icons/ArrowIcon/ArrowIcon"

type MenuBarButtonProps = {
    menuName: string;
    type: 'workspace' | 'star';
}

const MenuBarButton = ({ menuName, type }: MenuBarButtonProps) => {
    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
    const [openMenu, setOpenMenu] = useState<'workspace' | 'star' | null>(null);
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces`);
            const data = await res.json();
            setWorkspaces(data);
        }
        fetchWorkspaces();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isOpen = openMenu === type;

    const handleDropDown = () => {
        setOpenMenu(isOpen ? null : type);
    }
    
    const workSpaceDropDownMenu = () => {
        return (
            <div ref={dropDownRef} className="fixed left-0 top-14 bg-zinc-800 w-max h-[93vh] z-10 overflow-y-auto rounded-lg py-3">
                <div className="pb-3 px-4">
                    <h4 className="px-2 pt-4 pb-2">ワークスペース</h4>
                    <div className="flex flex-col gap-2 min-w-[300px]">
                        {workspaces.map((workspace: WorkspaceType) => (
                            <DropDownMenuItem
                                key={workspace.id}
                                workspace={workspace}
                                setOpenMenu={setOpenMenu}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const starDropDownMenu = () => {
        return (
            <div ref={dropDownRef} className="fixed left-0 top-14 bg-zinc-800 w-max h-[93vh] z-10 overflow-y-auto rounded-lg py-3">
                <div className="px-2">
                    {workspaces.map((workspace: WorkspaceType) => (
                        <DropDownMenuItem
                            key={workspace.id}
                            workspace={workspace}
                            setOpenMenu={setOpenMenu}
                        />
                    ))}
                </div>
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
                                className="bg-gray-600 hover:bg-gray-700 p-2 rounded flex items-center gap-2"
                            >
                                {menuName}
                                <UpArrow />
                            </button>
                            {renderDropDownMenu()}
                        </>
                    )
                    :
                    (
                        <button
                            onClick={handleDropDown}
                            className="hover:bg-gray-600 p-2 rounded flex items-center gap-2"
                        >
                            {menuName}
                            <DownArrow />
                        </button>
                    )
            }
        </>
    )
}

export default MenuBarButton;
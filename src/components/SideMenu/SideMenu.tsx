// SideMenu.tsx
'use client'
import { useEffect, useState } from "react";
import { LeftArrow, RightArrow } from "../Icons/ArrowIcon/ArrowIcon";
import SideMenuItem from "./SideMenuItem/SideMenuItem";
import Image from "next/image";
import { WorkspaceType, BoardType } from "@/types"; // BoardType を追加

type SideMenuProps = {
    boardId: string;
};

const SideMenu = ({ boardId }: SideMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceType | undefined>(undefined);
    const [boards, setBoards] = useState<BoardType[]>([]); // ボードの配列

    const handleOpenState = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!boardId) return;

            try {
                // 現在のワークスペースを取得
                const workspaceRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/boards/?ids=${boardId}`);
                if (!workspaceRes.ok) {
                    console.error('Failed to fetch the workspace');
                    return;
                }
                const currentWorkspaceData = await workspaceRes.json();

                if (currentWorkspaceData) {
                    setCurrentWorkspace(currentWorkspaceData);
                    // 属する全てのボードを取得
                    const boardsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`);
                    if (!boardsRes.ok) {
                        console.error('Failed to fetch boards');
                        return;
                    }
                    const boardsData = await boardsRes.json();
                    setBoards(boardsData); // ボードのデータを設定
                } else {
                    console.error('Unexpected data structure for current workspace:', currentWorkspaceData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [boardId]);

    if (isOpen) {
        return (
            <div className="absolute h-[calc(100vh-3.5rem)] bg-gray-800/90 w-72 left-0 top-0 text-gray-200 backdrop-blur-lg">
                <div className="flex items-center px-3 py-2 border-b border-gray-500 justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        {currentWorkspace && (
                            <>
                                <div className="w-[40px] aspect-square relative">
                                    <Image
                                        src={`/${currentWorkspace.iconImgSrc || 'defaultIcon.png'}`}
                                        alt={currentWorkspace.workspaceName || 'Workspace'}
                                        fill
                                        priority
                                    />
                                </div>
                                <h2 className="w-[80%]">{currentWorkspace.workspaceName}</h2>
                            </>
                        )}
                    </div>
                    <button
                        onClick={handleOpenState}
                        className="hover:cursor-pointer bg-gray-700 hover:bg-gray-500 p-1">
                        <LeftArrow />
                    </button>
                </div>
                <div className="p-3">
                    <h3>ボード</h3>
                </div>
                {boards.map(board => (
                    <SideMenuItem
                        key={board.id}
                        id={board.id}
                        boardName={board.boardName}
                        bgImgSrc={board.bgImgSrc}
                        isActive={board.id === boardId}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <div className="absolute h-[calc(100vh-3.5rem)] bg-gray-800/90 w-72 -left-[16.5rem] top-0 backdrop-blur-lg">
                <button
                    onClick={handleOpenState}
                    className="hover:cursor-pointer bg-gray-800 hover:bg-gray-400 w-fit absolute -right-3 top-4 rounded-full border-gray-600 border text-gray-200">
                    <RightArrow />
                </button>
            </div>
        );
    }
};

export default SideMenu;

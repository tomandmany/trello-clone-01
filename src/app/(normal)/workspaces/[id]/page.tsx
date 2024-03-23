'use client'
import React, { useState, useEffect } from 'react';
import { WorkspaceType, BoardType } from "@/types";
import BoardLink from "@/components/Links/BoardLink";
import AddBoardForm from "@/components/AddBoardForm/AddBoardForm";
import Image from 'next/image';

export default function WorkspacePage({ params }: { params: { id: string } }) {
    const workspaceId = params.id;
    const [boards, setBoards] = useState<BoardType[]>([]);
    const [workspaceData, setWorkspaceData] = useState<WorkspaceType | null>(null); // nullを初期値に設定

    useEffect(() => {
        const fetchData = async () => {
            if (!workspaceId) {
                return;
            }

            try {
                const workspaceRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}`);
                if (!workspaceRes.ok) {
                    console.error('Failed to fetch the workspace');
                    return;
                }

                const workspaceData: WorkspaceType = await workspaceRes.json();
                setWorkspaceData(workspaceData);
                const boardsData = await Promise.all(
                    workspaceData.boards.map(async (board: BoardType) => {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${board.id}`);
                        return response.json();
                    })
                );
                setBoards(boardsData);
            } catch (error) {
                console.error('Error fetching workspace or boards:', error);
            }
        };

        fetchData();
    }, [workspaceId]);

    const addBoardToList = (newBoard: BoardType) => {
        setBoards(currentBoards => [...currentBoards, newBoard]);
    };

    return (
        <main className="flex-grow bg-gray-800">
            <div className="w-[90%] mx-auto flex items-center justify-center px-40 py-8 gap-4 flex-wrap">
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    {workspaceData && (
                        <Image
                            src={`/${workspaceData?.iconImgSrc || 'defaultIcon.png'}`} // 'defaultIcon.png' はデフォルトの画像ファイル名に置き換えてください
                            alt={workspaceData?.workspaceName || 'WorkspaceImg'}
                            width={64}
                            height={64}
                            priority
                        />
                    )}
                    <h1 className="text-2xl text-gray-200 whitespace-nowrap">{workspaceData?.workspaceName || 'Loading...'}</h1>
                </div>
                <button className="p-3 bg-sky-400 rounded hover:bg-sky-300 w-fit mx-auto whitespace-nowrap">メンバーを招待</button>
            </div>
            <div className="w-[90%] mx-auto p-6 border-t border-gray-500">
                <h2 className="text-xl mb-4 text-gray-200">ボード</h2>
                <div className="flex gap-4 flex-wrap">
                    <AddBoardForm workspaceId={workspaceId} onBoardAdded={addBoardToList} />
                    {boards.map((board) => (
                        <BoardLink key={board.id} board={board} />
                    ))}
                </div>
            </div>
        </main>
    );
}

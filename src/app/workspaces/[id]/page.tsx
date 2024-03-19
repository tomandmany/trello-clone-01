// app/workspaces/[id]/page.tsx
'use client'
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { WorkspaceType, BoardType } from "@/types"; // BoardTypeをインポートします。
import BoardLink from "@/components/Links/BoardLink";

export default function WorkspacePage() {
    const [workspace, setWorkspace] = useState<WorkspaceType | undefined>(undefined);
    const [boards, setBoards] = useState<BoardType[]>([]); // 全ボードのデータを格納するための状態を追加します。
    const pathname = usePathname();
    const workspaceId = pathname.split('/').pop();

    useEffect(() => {
        async function fetchWorkspace() {
            try {
                if (!workspaceId) {
                    setWorkspace(undefined);
                    return;
                }

                const workspaceRes = await fetch(`http://localhost:8080/workspaces/${workspaceId}`);
                if (!workspaceRes.ok) {
                    console.error('Failed to fetch the workspace');
                    setWorkspace(undefined);
                    return;
                }
                const workspaceData = await workspaceRes.json();
                setWorkspace(workspaceData);

                // ワークスペースに属する全ボードの詳細を取得します。
                const boardsData = await Promise.all(workspaceData.boards.map(async (board: BoardType) => {
                    const response = await fetch(`http://localhost:8080/boards/${board.id}`);
                    return response.json();
                }));

                setBoards(boardsData);
            } catch (error) {
                console.error('Error fetching workspace or boards:', error);
                setWorkspace(undefined);
            }
        }
        fetchWorkspace();
    }, [workspaceId]);

    if (!workspace) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex-grow bg-gray-800">
            <div className="w-[90%] mx-auto flex border-b border-gray-500 items-center justify-center px-40 py-8 gap-4 flex-wrap">
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <div className="w-16 h-16 bg-green-300"></div>
                    <h1 className="text-2xl text-gray-200 whitespace-nowrap">{workspace.workspaceName}</h1>
                </div>
                <button className="p-3 bg-sky-400 rounded hover:bg-sky-300 w-fit mx-auto whitespace-nowrap">メンバーを招待</button>
            </div>
            <div className="w-[90%] mx-auto p-6">
                <h2 className="text-xl mb-4 text-gray-200">ボード</h2>
                <div className="flex gap-4 flex-wrap">
                    <button className="w-[300px] h-[100px] bg-gray-700 hover:bg-gray-600 text-gray-200 flex items-center justify-center rounded">ボードを追加</button>
                    {boards.map((board) => (
                        <BoardLink key={board.id} board={board} />
                    ))}
                </div>
            </div>
        </div>
    );
}
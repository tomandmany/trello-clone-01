// Board.tsx
'use client'
import { BoardType, ListType } from "@/types";
import List from "../List/List";
import MenuBar from "../Layouts/MenuBar/MenuBar";
import SideMenu from "../SideMenu/SideMenu";
import { useEffect, useState } from "react";
import PlusIcon from "../Icons/PlusIcon/PlusIcon";

function Board({ id, boardName }: BoardType) {
    const [lists, setLists] = useState<ListType[]>([]);
    const [newListName, setNewListName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        async function fetchLists() {
            try {
                const boardRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`);
                const boardData = await boardRes.json();
                const listsPromises = boardData.map(async (board: BoardType) => {
                    const listIds = board.lists?.map(list => list.id);
                    const listsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists?ids=${listIds?.join(',')}`);
                    const lists = await listsRes.json();
                    return { boardId: board.id, lists };
                });
                const boardListsData = await Promise.all(listsPromises);
                const lists = boardListsData.find(item => item.boardId === id)?.lists || [];
                setLists(lists);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        }
        fetchLists();
    }, [id]);

    const addList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // リスト名が空欄または空文字の場合は処理を中断
        if (!newListName.trim()) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    boardId: id,
                    listName: newListName.trim()
                })
            });

            if (response.ok) {
                const newList = await response.json();
                setLists([...lists, newList]);
                setNewListName(''); // 入力フィールドを空にする
                setIsAdding(false);
            } else {
                console.error('Error creating list');
            }
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    return (
        <>
            <div className="relative">
                <MenuBar id={id} boardName={boardName} />
                <SideMenu boardId={id} />
            </div>
            <div className="flex pt-10 pl-10 pr-5 overflow-auto">
                <div className="flex justify-start overflow-x-auto pb-10 gap-4">
                    {lists.map(list => (
                        <List key={list.id} id={list.id} listName={list.listName} />
                    ))}
                    {isAdding ? (
                        <form
                            onSubmit={addList}
                            className="bg-gray-900 rounded-lg min-w-[300px] text-left py-3 flex flex-col gap-2 px-2 hover:brightness-110 h-fit"
                        >
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="新しいリスト名を入力"
                                className="bg-gray-600 text-gray-100 rounded-lg px-2 py-1"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-1 px-2 rounded flex items-center justify-center gap-2"
                                disabled={!newListName}
                            >
                                <PlusIcon />
                                リストを追加
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center justify-left gap-2 py-1 pl-2 bg-gray-400/50 text-gray-200 hover:bg-gray-400/70 rounded-lg h-[100px] min-w-[300px]"
                        >
                            <PlusIcon />
                            リストを追加
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Board
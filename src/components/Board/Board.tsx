// Board.tsx
'use client'
import { BoardType, ListType } from "@/types";
import List from "../List/List";
import MenuBar from "../Layouts/MenuBar/MenuBar";
import SideMenu from "../SideMenu/SideMenu";
import { useEffect, useState } from "react";


function Board({ id, boardName }: BoardType) {
    const [lists, setLists] = useState<ListType[]>([]);

    useEffect(() => {
        async function fetchLists() {
            try {
                const boardRes = await fetch('http://localhost:8080/boards');
                const boardData = await boardRes.json();

                const listsPromises = boardData.map(async (board: BoardType) => {
                    const listIds = board.lists?.map(list => list.id);
                    const listsRes = await fetch(`http://localhost:8080/lists?ids=${listIds?.join(',')}`);
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

    return (
        <>
            <div className="relative">
                <MenuBar boardName={boardName} />
                <SideMenu />
            </div>
            <main className="flex pt-10 pl-10 pr-5 overflow-auto" >
                <div className="flex justify-start overflow-x-auto pb-10 gap-4">
                    {
                        lists.map(list =>
                            <List key={list.id} id={list.id} listName={list.listName} />
                        )
                    }
                </div>
            </main>
        </>
    )
}

export default Board
// app/boards/[id]/page.tsx
'use client'
import Board from "@/components/Board/Board";
import { BoardType } from "@/types";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function BoardPage() {
  const [board, setBoard] = useState<BoardType | undefined>(undefined);
  const pathname = usePathname();
  const boardId = pathname.split('/').pop();

  useEffect(() => {
    async function fetchBoard() {
      try {
        if (!boardId) {
          setBoard(undefined);
          return;
        }

        const boardRes = await fetch(`http://localhost:8080/boards/${boardId}`);
        if (!boardRes.ok) {
          // APIのレスポンスが正常でない場合
          console.error('Failed to fetch the board');
          setBoard(undefined);
          return;
        }
        const boardData = await boardRes.json();
        setBoard(boardData);
      } catch (error) {
        console.error('Error fetching board:', error);
        setBoard(undefined);
      }
    }
    fetchBoard();
  }, [boardId]);

  if (!board) {
    // ボードのデータがまだない、または取得に失敗した場合
    return <div>Loading...</div>; // または他のエラー表示
  }

  return (
    <Board key={board.id} id={board.id} boardName={board.boardName} />
  );
}

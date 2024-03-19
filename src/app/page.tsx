'use client'
import Board from "@/components/Board/Board";
import { BoardType } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    async function fetchBoards() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`);
      const data = await res.json();
      setBoards(data as BoardType[]);
    }
    fetchBoards();
  }, []);

  return (
    <>
      {
        boards.map(board =>
          <Board key={board.id} id={board.id} boardName={board.boardName} />
        )
      }
    </>
  );
}

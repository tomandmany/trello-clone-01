// app/boards/[id]/page.tsx
import Board from "@/components/Board/Board";
import { BoardType } from "@/types";

export default async function BoardPage({ params }: { params: { id: string } }) {
  const boardId = params.id;
  if (!boardId) {
    // ボードIDが指定されていない場合の処理
    return <div>Board ID is missing</div>;
  }

  try {
    const boardRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardId}`);
    if (!boardRes.ok) {
      // APIのレスポンスが正常でない場合
      console.error('Failed to fetch the board');
      return <div>Failed to fetch the board</div>;
    }
    const boardData: BoardType = await boardRes.json();
    return (
      <main>
        <Board key={boardData.id} id={boardId} boardName={boardData.boardName} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching board:', error);
    return <div>Error fetching board</div>;
  }
}
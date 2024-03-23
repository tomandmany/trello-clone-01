'use client'
import PlusIcon from "@/components/Icons/PlusIcon/PlusIcon";
import BoardLink from "@/components/Links/BoardLink";
import WorkspaceLink from "@/components/Links/WorkspaceLink";
import { BoardType, MemberType, WorkspaceType } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// app/members/[id]/page.tsx
export default function MemberPage() {
  const [member, setMember] = useState<MemberType | undefined>(undefined);
  const [memberWorkspaces, setMemberWorkspaces] = useState<WorkspaceType[]>([]);
  const [memberBoards, setMemberBoards] = useState<BoardType[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [isWorkspaceAdding, setIsWorkspaceAdding] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [isBoardAdding, setIsBoardAdding] = useState(false);
  const pathname = usePathname();
  const memberId = pathname.split('/').pop();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!memberId) {
          setMember(undefined);
          return;
        }

        const memberRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${memberId}`);
        if (!memberRes.ok) {
          console.error('Failed to fetch the member');
          setMember(undefined);
          return;
        }
        const memberData = await memberRes.json();
        setMember(memberData);

        const workspacesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/participants/?ids=${memberId}`);
        if (!workspacesRes.ok) {
          console.error('Failed to fetch the workspaces');
          setMemberWorkspaces([]);
          return;
        }
        const workspacesData = await workspacesRes.json();
        setMemberWorkspaces(workspacesData);

        const boardsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/participants/?ids=${memberId}`);
        if (!boardsRes.ok) {
          console.error('Failed to fetch the boards');
          setMemberBoards([]);
          return;
        }
        const boardsData = await boardsRes.json();
        setMemberBoards(boardsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMember(undefined);
      }
    }
    fetchData();
  }, [memberId]);

  if (!member) {
    return <div>Loading...</div>;
  }

  const addWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防ぐ
    if (!newWorkspaceName.trim()) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workspaceName: newWorkspaceName.trim(),
          memberId: memberId  // 必要であればメンバーIDも送信する
        })
      });

      if (response.ok) {
        const newWorkspace = await response.json();
        setMemberWorkspaces([...memberWorkspaces, newWorkspace]); // 正しい状態配列を更新
        setNewWorkspaceName(''); // 入力フィールドを空にする
        setIsWorkspaceAdding(false); // フォームを非表示にする
      } else {
        console.error('Error creating workspace');
      }
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  const addBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防ぐ
    if (!newBoardName.trim()) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          boardName: newBoardName.trim(),
          memberId: memberId
          // 必要であればメンバーIDも送信する
        })
      });

      if (response.ok) {
        const newBoard = await response.json();
        setMemberBoards([...memberBoards, newBoard]); // 正しい状態配列を更新
        setNewBoardName(''); // 入力フィールドを空にする
        setIsBoardAdding(false); // フォームを非表示にする
      } else {
        console.error('Error creating board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div className="flex-grow bg-gray-800">
      <div className="w-[90%] mx-auto flex items-center justify-center px-40 py-8 gap-4 flex-wrap">
        <div className="flex items-center gap-10 flex-wrap justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-300"></div>
          <h1 className="text-2xl text-gray-200 whitespace-nowrap">{member.memberName}</h1>
        </div>
      </div>
      <div className="w-[90%] mx-auto p-6 border-t border-gray-500">
        <h2 className="text-xl mb-4 text-gray-200">ワークスペース</h2>
        <div className="flex gap-4 flex-wrap">
          {isWorkspaceAdding ? (
            <form onSubmit={addWorkspace} className="w-[300px] h-[50px] flex">
              <div className='w-full h-full bg-gray-700 mr-1 rounded-lg'>
                <input
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="新しいワークスペース名を入力"
                  className="bg-transparent text-gray-200 px-2 py-1 hover:bg-gray-700 w-full h-full rounded-lg"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                <PlusIcon />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsWorkspaceAdding(true)}
              className="w-[300px] h-[50px] flex items-center justify-center bg-gray-700 text-gray-200 hover:bg-gray-600"
            >
              ワークスペースを追加
            </button>
          )}
          {memberWorkspaces.map((workspace) => (
            <WorkspaceLink key={workspace.id} workspace={workspace} />
          ))}
        </div>
      </div>
      <div className="w-[90%] mx-auto p-6">
        <h2 className="text-xl mb-4 text-gray-200">ボード</h2>
        <div className="flex gap-4 flex-wrap">
          {isBoardAdding ? (
            <form onSubmit={addBoard} className="w-[300px] h-[100px] flex">
              <div className='w-full h-full bg-gray-700 mr-1 rounded-lg'>
                <input
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="新しいボード名を入力"
                  className="bg-transparent text-gray-200 px-2 py-1 hover:bg-gray-700 w-full h-full rounded-lg"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                <PlusIcon />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsBoardAdding(true)}
              className="w-[300px] h-[100px] flex items-center justify-center bg-gray-700 text-gray-200 hover:bg-gray-600"
            >
              ボードを追加
            </button>
          )}
          {memberBoards.map((board) => (
            <BoardLink key={board.id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
}

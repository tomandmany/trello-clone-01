'use client'
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
  const pathname = usePathname();
  const memberId = pathname.split('/').pop();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!memberId) {
          setMember(undefined);
          return;
        }

        const memberRes = await fetch(`http://localhost:8080/members/${memberId}`);
        if (!memberRes.ok) {
          console.error('Failed to fetch the member');
          setMember(undefined);
          return;
        }
        const memberData = await memberRes.json();
        setMember(memberData);

        const workspacesRes = await fetch(`http://localhost:8080/workspaces/participants/?ids=${memberId}`);
        if (!workspacesRes.ok) {
          console.error('Failed to fetch the workspaces');
          setMemberWorkspaces([]);
          return;
        }
        const workspacesData = await workspacesRes.json();
        setMemberWorkspaces(workspacesData);

        const boardsRes = await fetch(`http://localhost:8080/boards/participants/?ids=${memberId}`);
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

  return (
    <div className="flex-grow bg-gray-800">
      <div className="w-[90%] mx-auto flex border-b border-gray-500 items-center justify-center px-40 py-8 gap-4 flex-wrap">
        <div className="flex items-center gap-10 flex-wrap justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-300"></div>
          <h1 className="text-2xl text-gray-200 whitespace-nowrap">{member.memberName}</h1>
        </div>
      </div>
      <div className="w-[90%] mx-auto p-6">
        <h2 className="text-xl mb-4 text-gray-200">ワークスペース</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="w-[300px] h-[50px] bg-gray-700 hover:bg-gray-600 text-gray-200 flex items-center justify-center rounded">ワークスペースを追加</button>
          {memberWorkspaces.map((workspace) => (
            <WorkspaceLink key={workspace.id} workspace={workspace} />
          ))}
        </div>
      </div>
      <div className="w-[90%] mx-auto p-6">
        <h2 className="text-xl mb-4 text-gray-200">ボード</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="w-[300px] h-[100px] bg-gray-700 hover:bg-gray-600 text-gray-200 flex items-center justify-center rounded">ボードを追加</button>
          {memberBoards.map((board) => (
            <BoardLink key={board.id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
}
import { WorkspaceType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function WorkspaceLink({ workspace }: { workspace: WorkspaceType }) {
    return (
        <Link href={`/workspaces/${workspace.id}`} passHref>
            <div className="w-[300px] h-[50px] rounded flex items-center gap-3 hover:bg-gray-600 border-b-2 border-gray-700 px-4 overflow-hidden">
                {workspace.iconImgSrc && (
                    <div className="w-[30px] h-[30px] relative">
                        <Image
                            src={`/${workspace.iconImgSrc}`}
                            alt={workspace.workspaceName}
                            fill
                            className="object-cover rounded"
                        />
                    </div>
                )}
                <p className="text-gray-200 truncate">{workspace.workspaceName}</p>
            </div>
        </Link>
    );
}
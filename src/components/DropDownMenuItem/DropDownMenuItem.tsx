// components/DropDownMenuItem/DropDownMenuItem.tsx
import Image from "next/image";
import { WorkspaceType } from "@/types";
import Link from "next/link";

type DropDownMenuItemProps = {
    workspace: WorkspaceType;
    setOpenMenu: React.Dispatch<React.SetStateAction<'workspace' | 'star' | null>>;
}

const DropDownMenuItem = ({ workspace, setOpenMenu }: DropDownMenuItemProps) => {
    const handleClick = () => {
        setOpenMenu(null);
    }

    return (
        <Link href={`/workspaces/${workspace.id}`} onClick={handleClick}>
            <div className="flex items-center gap-4 text-sm p-2 w-full rounded-lg hover:bg-zinc-700">
                <div className="w-[30px] h-[30px] relative">
                    <Image
                        src={`/${workspace.iconImgSrc}`}
                        alt={workspace.workspaceName}
                        fill
                        className="rounded"
                        style={{ objectFit: "cover" }}
                        priority
                        sizes="30px"
                    />
                </div>
                {workspace.workspaceName}
            </div>
        </Link>
    )
}

export default DropDownMenuItem;
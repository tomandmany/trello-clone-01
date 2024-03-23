import { BoardType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function BoardLink({ board }: { board: BoardType }) {
    return (
        <Link href={`/boards/${board.id}`} passHref>
            <div className="relative w-[300px] h-[100px] overflow-hidden rounded hover:brightness-110">
                <Image
                    src={`/${board.bgImgSrc}`}
                    alt={board.boardName}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    sizes="300px"
                />
                <span className="absolute top-2 left-2 text-gray-200">{board.boardName}</span>
            </div>
        </Link>
    );
}
import { BoardType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function BoardLink({ board }: { board: BoardType }) {
    return (
        <Link href={`/boards/${board.id}`} passHref>
            <div className="relative w-[300px] h-[100px] overflow-hidden rounded">
                <Image layout="fill" src={`/${board.bgImgSrc}`} alt={board.boardName} objectFit="cover" objectPosition="center" />
                <span className="absolute top-2 left-2 text-gray-200">{board.boardName}</span>
            </div>
        </Link>
    );
}
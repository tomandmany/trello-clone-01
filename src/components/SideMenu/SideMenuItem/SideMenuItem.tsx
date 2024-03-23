// SideMenuItem.tsx
import { BoardType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const SideMenuItem = ({ id, boardName, bgImgSrc, isActive }: BoardType & { isActive: boolean }) => {
    return (
        <Link href={`/boards/${id}`}>
            <div className={`flex items-center gap-2 py-2 px-3 hover:bg-gray-700 text-sm ${isActive ? 'bg-gray-500' : ''}`}>
                <div className="w-[32px] aspect-square relative">
                    <Image src={`/${bgImgSrc}`} alt={boardName} fill priority />
                </div>
                {boardName}
            </div>
        </Link>
    );
};

export default SideMenuItem;
'use client'
import React, { useState } from 'react';
import { BoardType } from '@/types'; // 必要に応じてパスを修正してください
import PlusIcon from '../Icons/PlusIcon/PlusIcon';

const AddBoardForm = ({ workspaceId, onBoardAdded }: { workspaceId: string; onBoardAdded: (board: BoardType) => void }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');

    const addBoard = async (newBoardName: string) => {
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
                    workspaceId,
                    boardName: newBoardName.trim(),
                    // クライアント側では背景画像URLを送信しない
                })
            });

            if (response.ok) {
                const newBoard = await response.json();
                onBoardAdded(newBoard); // 新しいボードをリストに追加
                setIsAdding(false);
                setNewBoardName(''); // フォームをリセット
            } else {
                console.error('Error creating board');
            }
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォームのデフォルト送信動作を防ぐ
        await addBoard(newBoardName);
    };

    return (
        <div className="w-[300px] h-[100px] text-gray-200 flex items-center justify-center rounded">
            {isAdding ? (
                <form onSubmit={handleSubmit} className="w-full h-full flex justify-between">
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
                    onClick={() => setIsAdding(true)}
                    className="w-full h-full flex items-center justify-center bg-gray-700 hover:bg-gray-600"
                >
                    ボードを追加
                </button>
            )}
        </div>
    );
};

export default AddBoardForm;

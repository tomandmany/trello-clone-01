// List.tsx
'use client'
import { CardType, ListType } from "@/types";
import Card from "../Card/Card";
import EllipsisIcon from "../Icons/EllipsisIcon/EllipsisIcon";
import PlusIcon from "../Icons/PlusIcon/PlusIcon";
import { useEffect, useState } from "react";

const List = ({ id, listName }: ListType) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [newCardName, setNewCardName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        async function fetchCards() {
            try {
                const listRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`);
                const listData = await listRes.json();

                const cardsPromises = listData.map(async (list: ListType) => {
                    const cardIds = list.cards?.map(card => card.id);
                    const cardsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards?ids=${cardIds?.join(',')}`);
                    const cards = await cardsRes.json();
                    return { listId: list.id, cards };
                });

                const listCardsData = await Promise.all(cardsPromises);

                const cards = listCardsData.find(item => item.listId === id)?.cards || [];
                setCards(cards);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        }

        fetchCards();
    }, [id]);

    const addCard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // カード名が空欄または空文字の場合は処理を中断
        if (!newCardName.trim()) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    listId: id,
                    cardName: newCardName.trim()
                })
            });

            if (response.ok) {
                const newCard = await response.json();
                setCards([...cards, newCard]);
                setNewCardName(''); // 入力フィールドを空にする
                setIsAdding(false);
            } else {
                console.error('Error creating card');
            }
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    return (
        <div className="bg-black text-gray-200 w-fit rounded-lg min-w-[300px] max-w-[300px] flex flex-col h-fit">
            <div className="flex justify-between px-2 pt-2">
                <h3 className="gap-4 px-2 py-4 hover:cursor-pointer">{listName}</h3>
                <EllipsisIcon />
            </div>
            {cards.length > 0 && (
                <div className="overflow-y-auto p-2 flex flex-col gap-2">
                    {cards.map(card => (
                        <Card key={card.id} id={card.id} cardName={card.cardName} />
                    ))}
                </div>
            )}
            {isAdding ? (
                <form className="flex items-center gap-2 m-2" onSubmit={addCard}>
                    <input
                        type="text"
                        value={newCardName}
                        onChange={(e) => setNewCardName(e.target.value)}
                        placeholder="新しいカード名を入力"
                        className="bg-gray-700 text-gray-200 rounded-lg px-2 py-1 flex-grow"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        disabled={!newCardName}
                    >
                        <PlusIcon />
                    </button>
                </form>
            ) : (
                <div className="px-2 my-2">
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center justify-left gap-2 py-1 pl-2 hover:bg-gray-600 rounded-lg w-full"
                    >
                        <PlusIcon />
                        カードを追加
                    </button>
                </div>
            )}
        </div>
    );


};

export default List;
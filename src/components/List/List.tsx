// List.tsx
'use client'
import { CardType, ListType } from "@/types";
import Card from "../Card/Card";
import EllipsisIcon from "../Icons/EllipsisIcon/EllipsisIcon";
import PlusIcon from "../Icons/PlusIcon/PlusIcon";
import { useEffect, useState } from "react";

const List = ({ id, listName }: ListType) => {
    const [cards, setCards] = useState<CardType[]>([]);

    useEffect(() => {
        async function fetchCards() {
            try {
                const listRes = await fetch('http://localhost:8080/lists');
                const listData = await listRes.json();

                const cardsPromises = listData.map(async (list: ListType) => {
                    const cardIds = list.cards?.map(card => card.id);
                    const cardsRes = await fetch(`http://localhost:8080/cards?ids=${cardIds?.join(',')}`);
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

    return (
        <div className="bg-black text-gray-200 w-fit rounded-lg min-w-[300px] max-w-[300px] flex flex-col">
            <div className="flex justify-between px-2 pt-2">
                <h3 className="gap-4 px-2 py-4 hover:cursor-pointer">{listName}</h3>
                <EllipsisIcon />
            </div>
            <div className="overflow-y-auto p-2 flex flex-col gap-2">
                {
                    cards.map(card =>
                        <Card key={card.id} cardName={card.cardName} />
                    )
                }
            </div>
            <div className="flex text-sm m-2 p-2 gap-2 hover:bg-gray-700 hover:cursor-pointer rounded-lg items-center">
                <PlusIcon />
                カードを追加
            </div>
        </div>
    );
};

export default List;
import { CardType } from "@/types";

// Card.tsx
const Card = ({cardName}: CardType) => {
    return (
        <div className="overflow-visible">
            <div className="flex text-sm p-2 gap-2 bg-gray-800 hover:ring-2 hover:ring-rose-400 hover:cursor-pointer rounded-lg items-center">
                {cardName}
            </div>
        </div>
    );
};

export default Card;
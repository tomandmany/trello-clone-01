'use client'
import { useState } from "react";
import { EmptyStar, FilledStar } from "../Icons/StarIcon/StarIcon";

const StarButton = () => {
    const [isFilled, setIsFilled] = useState(false);

    const handleStarState = () => {
        setIsFilled(!isFilled);
    }

    return (
        <button
            onClick={handleStarState}
            className="text-white hover:bg-gray-500 p-1">
            {
                isFilled ? <FilledStar /> : <EmptyStar />
            }
        </button>
    )
}

export default StarButton
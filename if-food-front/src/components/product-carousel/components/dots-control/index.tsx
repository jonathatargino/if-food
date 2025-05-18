import { Box } from "@mui/material";
import { useState } from "react";

interface DotsControlProps {
    isLoaded: boolean;
    slidesPerView: number;
    totalSlidesNumber: number;
    onClick: (slideIndex: number) => void;
}

export function DotsControl({
    isLoaded,
    slidesPerView,
    totalSlidesNumber,
    onClick,
}: DotsControlProps) {
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const numberOfDots = Math.ceil(totalSlidesNumber / slidesPerView);

    const isVisible = isLoaded && totalSlidesNumber > slidesPerView;

    function handleDotClick(dotIndex: number) {
        setActiveDotIndex(dotIndex);
        onClick(dotIndex);
    }

    return (
        <>
            {isVisible && (
                <Box sx={{ display: "flex", padding: "10px 0", justifyContent: "center" }}>
                    {[...Array(numberOfDots).keys()].map((dotIndex) => {
                        return (
                            <button
                                style={{
                                    border: "none",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    margin: "0 5px",
                                    padding: "5px",
                                    cursor: "pointer",
                                    background: activeDotIndex === dotIndex ? "#000" : "#c5c5c5",
                                }}
                                key={dotIndex}
                                type="button"
                                onClick={() => handleDotClick(dotIndex)}></button>
                        );
                    })}
                </Box>
            )}
        </>
    );
}

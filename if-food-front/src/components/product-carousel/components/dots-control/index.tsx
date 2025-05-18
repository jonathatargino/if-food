import { Box } from "@mui/material";

interface DotsControlProps {
    totalSlidesNumber: number;
    currentSlideIndex: number;
    onClick: (slideIndex: number) => void;
    isVisible: boolean;
    slidesPerView: number;
}

export function DotsControl({
    totalSlidesNumber,
    currentSlideIndex,
    onClick,
    isVisible,
    slidesPerView,
}: DotsControlProps) {
    const totalDotsNumber = totalSlidesNumber - (slidesPerView - 1);
    if (!isVisible) return <></>;

    return (
        <>
            <Box sx={{ display: "flex", padding: "10px 0", justifyContent: "center" }}>
                {[...Array(totalDotsNumber).keys()].map((dotIndex) => {
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
                                background: currentSlideIndex === dotIndex ? "#000" : "#c5c5c5",
                            }}
                            key={dotIndex}
                            type="button"
                            onClick={() => onClick(dotIndex)}></button>
                    );
                })}
            </Box>
        </>
    );
}

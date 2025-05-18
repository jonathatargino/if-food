import { ArrowButton } from "../arrow-button";

interface ArrowsControlProps {
    onLeftArrowClick: () => void;
    onRightArrowClick: () => void;
    totalSlidesNumber: number;
    slidesPerView: number;
    currentSlideIndex: number;
    isVisible: boolean;
}

export function ArrowsControl({
    onLeftArrowClick,
    onRightArrowClick,
    isVisible,
    totalSlidesNumber,
    slidesPerView,
    currentSlideIndex,
}: ArrowsControlProps) {
    const shouldShowRightArrow = totalSlidesNumber > currentSlideIndex + slidesPerView;
    const shouldShowLeftArrow = currentSlideIndex > 0;

    if (!isVisible) return <></>;

    return (
        <>
            {shouldShowLeftArrow && (
                <ArrowButton direction="left" onClick={onLeftArrowClick} isDisabled={false} />
            )}
            {shouldShowRightArrow && (
                <ArrowButton direction="right" onClick={onRightArrowClick} isDisabled={false} />
            )}
        </>
    );
}

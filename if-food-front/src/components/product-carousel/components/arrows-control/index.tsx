import { ArrowButton } from "../arrow-button";

interface ArrowsControlProps {
    onLeftArrowClick: () => void;
    onRightArrowClick: () => void;
    isVisible: boolean;
}

export function ArrowsControl({
    onLeftArrowClick,
    onRightArrowClick,
    isVisible,
}: ArrowsControlProps) {
    if (!isVisible) return <></>;

    return (
        <>
            <ArrowButton direction="left" onClick={onLeftArrowClick} isDisabled={false} />
            <ArrowButton direction="right" onClick={onRightArrowClick} isDisabled={false} />
        </>
    );
}

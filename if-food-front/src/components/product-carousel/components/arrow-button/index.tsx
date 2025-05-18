import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ArrowButtonProps {
    onClick: () => void;
    direction: "left" | "right";
    isDisabled: boolean;
}

export function ArrowButton({ onClick, direction, isDisabled }: ArrowButtonProps) {
    const ArrowComponent = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;

    return (
        <ArrowComponent
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-100%)",
                "-webkit-transform": "translateY(-100%)",
                fill: "white",
                cursor: "pointer",
                backgroundColor: "black",
                height: "40px",
                width: "40px",
                marginLeft: "8px",
                borderRadius: "50%",
                opacity: isDisabled ? "0.5" : "1",
                right: direction === "right" ? "5px" : "auto",
                pointerEvents: isDisabled ? "none" : "auto",
            }}
        />
    );
}

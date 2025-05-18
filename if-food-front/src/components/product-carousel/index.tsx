import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ProductCard } from "../ProductCard";
import { Box } from "@mui/material";
import { useState } from "react";
import { DotsControl } from "./components/dots-control";
import { ArrowsControl } from "./components/arrows-control";

interface Product {
    id: string;
    name: string;
    photo_url: string;
    seller_name: string;
    value: number;
}

interface ProductCarouselProps {
    products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: {
            perView: 6,
            spacing: 20,
        },
        slideChanged(slider) {
            setCurrentSlideIndex(slider.track.details.rel);
        },
        created() {
            setIsLoaded(true);
        },
        breakpoints: {
            "(max-width: 1280px)": {
                slides: {
                    perView: 5,
                    spacing: 10,
                },
            },
            "(max-width: 1024px)": {
                slides: {
                    perView: 3,
                    spacing: 10,
                },
            },
            "(max-width: 768px)": {
                slides: {
                    perView: 2,
                    spacing: 10,
                },
            },
            "(max-width: 480px)": {
                slides: {
                    perView: 1,
                    spacing: 5,
                },
            },
        },
    });

    const slidesPerView = instanceRef?.current?.options.slides.perView ?? 0;
    const isControlsVisible = isLoaded && products.length > slidesPerView;

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    marginBottom: isControlsVisible ? "24px" : "0",
                }}>
                <Box ref={sliderRef} className="keen-slider">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} className="keen-slider__slide" />
                    ))}
                </Box>
                <ArrowsControl
                    onLeftArrowClick={() => instanceRef.current?.prev()}
                    onRightArrowClick={() => instanceRef.current?.next()}
                    isVisible={isControlsVisible}
                />
            </Box>
            <DotsControl
                totalSlidesNumber={products.length}
                currentSlideIndex={currentSlideIndex}
                slidesPerView={slidesPerView}
                onClick={(slideIndex) => {
                    instanceRef.current?.moveToIdx(slideIndex);
                }}
                isVisible={isControlsVisible}
            />
        </>
    );
}

import { Card, CardContent } from "@/components/ui/card";

import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useCallback } from "react";

type MyCarouselProps = {
  visibleDays: Date[]
  loadMoreDays: () => void
  SelectDateHandler: (day: Date) => void
}

const Carousel: React.FC<MyCarouselProps> = ({ visibleDays, loadMoreDays, SelectDateHandler }) => {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", dragFree: true});

  const handleScrollEnd = useCallback(() => {
    if (!embla) return;

    const isEnd = embla.canScrollNext() === false;
    if (isEnd) {
      loadMoreDays();
    }
  }, [embla, loadMoreDays]);

  useEffect(() => {
    if (!embla) return;

    embla.on("select", handleScrollEnd);

    // Devuelve una función que explícitamente retorna void
    return () => {
      embla.off("select", handleScrollEnd);
    };
  }, [embla, handleScrollEnd]);

  

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {visibleDays.map((day, index) => (
          <div className="embla__slide" key={index}>
            <div className="p-1">
              <Card
                className="cursor-pointer h-32 active:scale-95"
                onClick={() => SelectDateHandler(day)}

              >
                <CardContent className="flex h-full items-center justify-center p-6">
                  <span className="text-3xl font-semibold select-none" >
                    {new Date(day).toLocaleDateString("es-AR", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;





























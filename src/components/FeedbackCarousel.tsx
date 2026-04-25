import { useEffect, useRef, useState } from "react";

const images = [
  "https://nutriinteligente.online/images/feedback4.png",
  "https://nutriinteligente.online/images/feedback3.png",
  "https://nutriinteligente.online/images/feedback2.png",
  "https://nutriinteligente.online/images/feedback1.png",
  "https://nutriinteligente.online/images/feedback5.png",
];

const FeedbackCarousel = () => {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      setIndex((i) =>
        dx < 0 ? (i + 1) % images.length : (i - 1 + images.length) % images.length
      );
    }
    startX.current = null;
  };

  return (
    <div
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-card"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="aspect-[4/5] w-full flex-shrink-0">
            <img
              src={src}
              alt={`Depoimento real de cliente ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-1.5 bg-background/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackCarousel;

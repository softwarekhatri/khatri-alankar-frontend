import { useState, useEffect } from "react";

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Luxury jewelry collection"
  },
  {
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Elegant gold necklace"
  },
  {
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    alt: "Premium rings collection"
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="absolute inset-0">
      {/* Carousel Images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-opacity duration-300 ${index === currentSlide
                ? 'bg-luxury-gold opacity-100'
                : 'bg-white opacity-50 hover:opacity-75'
              }`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

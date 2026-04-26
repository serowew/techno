import React, { useState, useRef, useEffect, useCallback } from "react";
import EnhancedModal from "./EnhancedModal";
import { tutorsData } from "../data/devs";
import type { Tutor } from "../data/devs";
import "../css/carousel.css";

const AdvancedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [radius, setRadius] = useState(450);
  const [cardSize, setCardSize] = useState({ width: 280, height: 420 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalCards = tutorsData.length;
  const cardAngle = 360 / totalCards;

  useEffect(() => {
    const updateSizes = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setRadius(160);
        setCardSize({ width: 160, height: 260 });
      } else if (vw < 640) {
        setRadius(210);
        setCardSize({ width: 190, height: 300 });
      } else if (vw < 768) {
        setRadius(270);
        setCardSize({ width: 220, height: 350 });
      } else if (vw < 1024) {
        setRadius(360);
        setCardSize({ width: 250, height: 390 });
      } else {
        setRadius(450);
        setCardSize({ width: 280, height: 420 });
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const updateRotation = useCallback(
    (index: number) => {
      const angle = index * cardAngle;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${-angle}deg)`;
      }
    },
    [cardAngle]
  );

  const rotateToCard = (index: number) => {
    const newIndex = (index + totalCards) % totalCards;
    setCurrentIndex(newIndex);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setLastX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - lastX;

    if (diff > 50) {
      rotateToCard(currentIndex - 1);
      setIsDragging(false);
      setLastX(clientX);
    } else if (diff < -50) {
      rotateToCard(currentIndex + 1);
      setIsDragging(false);
      setLastX(clientX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCardClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  useEffect(() => {
    updateRotation(currentIndex);
  }, [currentIndex, updateRotation]);

  const halfW = cardSize.width / 2;
  const halfH = cardSize.height / 2;

  return (
    <>
      <EnhancedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tutorData={selectedTutor || tutorsData[0]}
      />

      <div className="carousel-wrapper">
        {/* HEADER — grouped with carousel */}
        <div className="carousel-header">
       
          <p>Click on any expert card to view their profile</p>
        </div>

        {/* CAROUSEL STAGE — height matches card so no dead space below */}
        <div
          className="carousel-section"
          style={{ height: `${cardSize.height}px` }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="carousel-container">
            <div
              className="carousel-track"
              ref={carouselRef}
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: "50%",
                top: "50%",
                transformOrigin: "center center",
                margin: "-50% 0 0 -50%",
              }}
            >
              {tutorsData.map((tutor, index) => (
                <div
                  key={tutor.id}
                  className="carousel-card"
                  style={{
                    position: "absolute",
                    width: `${cardSize.width}px`,
                    height: `${cardSize.height}px`,
                    left: "50%",
                    top: "50%",
                    marginLeft: `-${halfW}px`,
                    marginTop: `-${halfH}px`,
                    transform: `rotateY(${index * cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="carousel-card-image"
                    draggable={false}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => { e.stopPropagation(); handleCardClick(tutor); }}
                  />
                  <div className="carousel-card-info">
                    <h3 className="carousel-card-name">{tutor.name}</h3>
                    <p className="carousel-card-role">{tutor.role}</p>
                    <p className="carousel-card-description">{tutor.shortDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AdvancedCarousel;
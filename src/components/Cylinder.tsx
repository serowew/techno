 
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ImageData {
  id: number;
  title: string;
  description: string;
  image: string;
  role: string;
}

const imagesData: ImageData[] = [
  {
    id: 1,
    title: "RALPH",
    description:
      "Passionate web developer with expertise in React, TypeScript, and modern web technologies. Ralph creates beautiful and functional user interfaces.",
    image: "pics/ral.jpg",
    role: "WEB DEVELOPER",
  },
  {
    id: 2,
    title: "CHON",
    description:
      "Full-stack developer specializing in backend systems and database architecture. Chon builds scalable solutions for complex problems.",
    image: "pics/chon.png",
    role: "FULL-STACK DEV",
  },
  {
    id: 3,
    title: "ACAL",
    description:
      "UX/UI designer focused on creating intuitive and beautiful interfaces. Acal transforms ideas into compelling visual experiences.",
    image: "pics/acal.png",
    role: "UX DESIGNER",
  },
  {
    id: 4,
    title: "LG",
    description:
      "DevOps engineer with expertise in cloud infrastructure and CI/CD pipelines. LG ensures smooth deployment and system reliability.",
    image: "pics/lg.png",
    role: "DEVOPS ENGINEER",
  },
  {
    id: 5,
    title: "EMI",
    description:
      "Mobile app developer creating cross-platform applications. Emi specializes in React Native and native mobile development.",
    image: "pics/emi.png",
    role: "MOBILE DEV",
  },
  {
    id: 6,
    title: "RALPH",
    description:
      "Versatile developer with full-stack capabilities. Ralph excels at turning concepts into production-ready applications.",
    image: "pics/ral.jpg",
    role: "WEB DEVELOPER",
  },
];

const Cylinder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const totalFaces = 6;
  const cylinderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const activeData = imagesData[currentIndex];

  const updateRotation = (index: number) => {
    const angle = index * 60;
    if (cylinderRef.current) {
      cylinderRef.current.style.transform = `rotateY(${-angle}deg)`;
    }
  };

  
   
const rotate = useCallback(
  (direction: number) => {
    const newIndex = (currentIndex + direction + totalFaces) % totalFaces;

    setAnimating(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimating(true);
        setCurrentIndex(newIndex);
      });
    });
  },
  [currentIndex]
);

  useEffect(() => {
    updateRotation(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimating(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      rotate(1);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, rotate]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleViewProfile = () => {
    navigate(`/catalog?search=${activeData.title.toLowerCase()}`);
  };

  return (
    <>
      <div className="dual-panel">
        {/* ── PANEL 1 : Cylinder ── */}
        <div className="panel panel-left">
          <div className="container">
            <div className="scene">
              <div className="cylinder" ref={cylinderRef}>
                {imagesData.map((imageData, i) => (
                  <div
                    key={i}
                    className={`face ${i === currentIndex ? "face--active" : ""}`}
                    onClick={() => {
                      setAnimating(false);
                      requestAnimationFrame(() =>
                        requestAnimationFrame(() => {
                          setAnimating(true);
                          setCurrentIndex(i);
                        })
                      );
                    }}
                  >
                    <img src={imageData.image} alt={imageData.title} />
                    <div className="overlay">
                      <div className="overlay-content">
                        <div className="overlay-title">{imageData.title}</div>
                        <div className="overlay-line"></div>
                        <div className="overlay-sub">{imageData.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="controls">
                <button onClick={() => rotate(-1)}>◀</button>
                <button onClick={() => rotate(1)}>▶</button>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="dot-nav">
            {imagesData.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentIndex ? "dot--active" : ""}`}
                onClick={() => {
                  setAnimating(false);
                  requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                      setAnimating(true);
                      setCurrentIndex(i);
                    })
                  );
                }}
              />
            ))}
          </div>
        </div>

        {/* ── PANEL 2 : Info Card ── */}
        <div className="panel panel-right">
          <div className={`info-card ${animating ? "info-card--enter" : ""}`} key={currentIndex}>
            {/* Avatar — click to open modal */}
            <div className="info-avatar-wrap">
              <img
                src={activeData.image}
                alt={activeData.title}
                className="info-avatar info-avatar--clickable"
                onClick={() => setModalOpen(true)}
                title="Click to zoom"
              />
              <div className="info-avatar-glow" />
              <span className="info-avatar-hint">🔍</span>
            </div>

            {/* Badge */}
            <span className="info-badge">{activeData.role}</span>

            {/* Name */}
            <h2 className="info-name">{activeData.title}</h2>

            {/* Divider */}
            <div className="info-divider" />

            {/* Description */}
            <p className="info-desc">{activeData.description}</p>

            {/* CTA — navigates to catalog filtered to this tutor */}
            <button className="info-cta" onClick={handleViewProfile}>
              View Profile
            </button>

            {/* Index counter */}
            <span className="info-counter">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalFaces).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {modalOpen && (
        <div
          className="tutor-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="tutor-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="tutor-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="tutor-modal-img-wrap">
              <img
                src={activeData.image}
                alt={activeData.title}
                className="tutor-modal-img"
              />
              <div className="tutor-modal-img-glow" />
            </div>

            <div className="tutor-modal-body">
              <span className="tutor-modal-badge">{activeData.role}</span>
              <h2 className="tutor-modal-name">{activeData.title}</h2>
              <div className="tutor-modal-divider" />
              <p className="tutor-modal-desc">{activeData.description}</p>
              <button
                className="tutor-modal-cta"
                onClick={() => {
                  setModalOpen(false);
                  handleViewProfile();
                }}
              >
                View Full Profile →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cylinder;
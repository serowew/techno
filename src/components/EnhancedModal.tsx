import React from "react";
import "../css/carousel.css";

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorData: {
    name: string;
    role: string;
    image: string;
    bio: string;
    expertise: string[];
   
  };
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({ isOpen, onClose, tutorData }) => {
  if (!isOpen) return null;

 

  return (
    <div className="modal-overlayy" onClick={onClose}>
      <div className="modal-contentt" onClick={(e) => e.stopPropagation()}>
        {/* HEADER WITH IMAGE */}
        <div className="modal-headerr">
          <img src={tutorData.image} alt={tutorData.name} className="modal-header-imagee" />
          <div className="modal-header-overlayy"></div>
          <button className="modal-closee" onClick={onClose}>✕</button>
          <div className="modal-header-contentt">
            <h1 className="modal-titlee">{tutorData.name}</h1>
            <p className="modal-subtitlee">{tutorData.role}</p>
          </div>
        </div>

        {/* BODY */}
        <div className="modal-bodyy">
 

          {/* BIO */}
          <div className="modal-sectionn">
            <h3 className="modal-section-titlee">About</h3>
            <p className="modal-section-contentt">{tutorData.bio}</p>
          </div>

          {/* EXPERTISE */}
          <div className="modal-sectionn">
            <h3 className="modal-section-titlee">Expertise</h3>
            <div className="modal-tagss">
              {tutorData.expertise.map((skill, index) => (
                <span key={index} className="modal-tagg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="modal-dividerr"></div>

          {/* CTA BUTTONS */}
          <div className="modal-ctaa">
            
            <button className="modal-button secondaryy">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedModal;

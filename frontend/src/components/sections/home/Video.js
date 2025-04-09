import React, { useState } from 'react';
import '../../../assets/css/video.css';
import videoimg from '../../../assets/img/JoyeriaPeru/01.png';

const Video = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <section className="video-section">
        <div className="video-content">
          <span className="title-tag">Video de diseño</span>
          <h2 className="video-title">Gama alta<br />Articulos de Joyería.</h2>
          <p className="video-description">
          Descubre piezas únicas que combinan elegancia, distinción y artesanía en cada detalle.
          
          </p>
          <button className="video-btn" onClick={openModal}>Ver video</button>
        </div>

        <div className="video-thumbnail" style={{ backgroundImage: `url(${videoimg})` }}>
          <div className="video-play-btn" onClick={openModal}>
            <i className="fas fa-play"></i>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/EEJFMdfraVY"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Video;

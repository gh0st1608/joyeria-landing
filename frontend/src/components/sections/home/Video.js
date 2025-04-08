import React, { useState } from 'react';
// import './VideoSection.css';
import videoimg from '../../../assets/img/JoyeriaPeru/01.png';

const Video = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <section className="text-block with-pattern">
                <div className="container">
                    <div className="block-text">
                        <div className="section-title">
                            <span className="title-tag">DISEÑO DE JOYAS CON AMOR</span>
                            <h2>Gama alta<br />Artículos de joyería</h2>
                        </div>
                        <a onClick={openModal} className="main-btn">Ver video</a>
                    </div>

                    <div
                        className="video-trigger-wrap"
                        style={{ backgroundImage: `url(${videoimg})` }}
                        onClick={openModal}
                    >
                        <i className="fas fa-play popup-video"></i>
                    </div>
                </div>
            </section>

            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <div className="video-responsive">
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

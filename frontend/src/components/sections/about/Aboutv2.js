import React from "react";

import img1 from '../../../assets/img/banner/01.jpg';
import img2 from '../../../assets/img/banner/02.jpg';
import img3 from '../../../assets/img/about/peru-joyas-about-1.png';
import img4 from '../../../assets/img/about/peru-joyas-about-2.png';

const bannerposts = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
]

const Aboutv2 = () => {
    return (
        <div className="about-section container pt-115 pb-115">
            <div className="about-content subcontainer">
                <div className="about-text">
                    <div>
                        <h3>Misión</h3>
                        <p>Nos compretemos a perfeccionar la artesanía de la joyería con una obsesión por la calidad, fusionando tradición y tecnología para crear piezas únicas y personalizadas. Buscamos emocionar y <strong>ser parte de los momentos más significativos en la vida de nuestros clientes, estableciendo estándares globales de excelencia en diseño y fabricación, con un enfoque constante en la innovación y la satisfación del cliente.</strong></p>
                    </div>
                    <div>
                        <h3>Visión</h3>
                        <p><strong>Ser líder global en joyería, destacando por nuestra inquebrantable dedicación a la calidad y artesanía excepcional.</strong> Creamos joyas personalizadas que celebran momentos especiales, fusionando la tradición con tecnología innovadora para cautivar a una audiencia moderna.</p>
                    </div>
                </div>
                <div className="about-images">
                    <img src={`${bannerposts[2].img}`} alt="images" />
                    <img src={`${bannerposts[3].img}`} alt="images" />
                </div>
                
            </div>
        </div>
    )
};

export default Aboutv2;
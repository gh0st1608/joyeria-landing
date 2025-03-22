import React from "react";
import img1 from '../../../assets/img/about/peru-joyas-about-1.png';
import img2 from '../../../assets/img/about/peru-joyas-about-2.png';


const Aboutv2 = () => {
    return (
        <div className="about-section">
            <div className="about-content">
                <div className="about-text">
                    <div>
                        <h3>Misión</h3>
                        <p>Nos comprometemos a perfeccionar la artesanía de la joyería con una obsesión por la calidad, fusionando tradición y tecnología para crear piezas únicas y personalizadas. Buscamos emocionar y <strong>ser parte de los momentos más significativos en la vida de nuestros clientes, estableciendo estándares globales de excelencia en diseño y fabricación, con un enfoque constante en la innovación y la satisfacción del cliente.</strong></p>
                    </div>
                    <div>
                        <h3>Visión</h3>
                        <p><strong>Ser líder global en joyería, destacando por nuestra inquebrantable dedicación a la calidad y artesanía excepcional.</strong> Creamos joyas personalizadas que celebran momentos especiales, fusionando la tradición con tecnología innovadora para cautivar a una audiencia moderna.</p>
                    </div>
                </div>
                <div className="about-images">
                    <img src={img1} alt="Misión" />
                    <img src={img2} alt="Visión" />
                </div>
            </div>
        </div>
    )
};

export default Aboutv2;

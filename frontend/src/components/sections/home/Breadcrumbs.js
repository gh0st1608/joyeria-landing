import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import breadcrumbimg from '../../../assets/img/bg/04.jpg';
// import './Breadcrumbs.css'; // ✅ Importamos el CSS mejorado

const Breadcrumbs = ({ breadcrumb }) => {
    return (
        <section className="breadcrumb-area" style={{ backgroundImage: `url(${breadcrumbimg})` }}>
            <div className="container">
                <div className="breadcrumb-text">
                    <span>Joyería de diseñador</span>
                    <h2 className="page-title">{breadcrumb.pagename}</h2>
                    <ul className="breadcrumb-nav">
                        <li><Link to="/">Home</Link></li>
                        <li className="active">{breadcrumb.pagename}</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

// Validación de PropTypes
Breadcrumbs.propTypes = {
    breadcrumb: PropTypes.shape({
        pagename: PropTypes.string.isRequired,
    }).isRequired,
};

export default Breadcrumbs;

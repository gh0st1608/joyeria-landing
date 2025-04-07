import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategoryProducts } from "../../servicios/shop/categoryService";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Eliminamos la dependencia del contexto no definido
// y añadimos valores por defecto seguros

const DEFAULT_CATEGORY = {
  title: 'Categoría sin nombre',
  numberofproduct: 0,
  _id: Math.random().toString(36).substr(2, 9)
};

class Category extends Component {
  _isMounted = false; // Para controlar montaje
    
    constructor(props) {
        super(props);
        this.state = {
            category_products: [],
            loading: true,
        };
    }
    
    async componentDidMount() {
        try {
            const category_products = await getCategoryProducts();
            this.setState({ category_products, loading: false });
        } catch (error) {
            console.error("❌ Error al cargar productos", error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { category_products, loading } = this.state;

        // Diccionario de iconos correctos
        const iconMap = [
            'fa-ring', // Anillos
            'fa-gem', // Diamantes
            'fa-necklace', // Collares
            'fa-earrings', // Aretes
        ];

        return (
            <div className="categories-box-layout">
                <div className="container">
                    <div className="categories-box-layout-inner">
                        {loading ? (
                            <p className="loading-text">Cargando categorías...</p>
                        ) : (
                            <div className="categories-container">
                                {category_products.map((item, i) => (
                                    <Link key={i} to="/shop-left" className="categories-box">
                                        <span className="icon-container">
                                            <i className={`fa-solid ${iconMap[i % iconMap.length]}`} />
                                        </span>
                                        <h5 className="title">{item.name}</h5> 
                                        <p>{item.numberofproduct} Productos</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;
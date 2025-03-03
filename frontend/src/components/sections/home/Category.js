import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryProducts } from "../../servicios/shop/categoryService";
import { HomeContext } from 'context/HomeContext';

const categoryposts = [
    { icon: 'flaticon-bracelet', title: 'Golden Pendants', numberofproduct: '12' },
    { icon: 'flaticon-ring', title: 'Diamond Rings', numberofproduct: '27' },
    { icon: 'flaticon-necklace', title: 'Gold Necklaces', numberofproduct: '18' },
    { icon: 'flaticon-earrings', title: 'Designer Earings', numberofproduct: '23' },
];

class Category extends Component {
    static contextType = HomeContext;
    
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
            console.log("📢 Products received:", category_products);
            this.setState({ category_products, loading: false });
        } catch (error) {
            console.error("❌ Error loading products", error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { category_products, loading } = this.state;

        return (
            <div className="categories-box-layout">
                <div className="container">
                    <div className="categories-box-layout-inner">
                        <div className="row">
                            {category_products.map((item, i) => {
                                // Lógica para cambiar el icono basado en el índice
                                let iconClass;
                                if (i === 0) {
                                    iconClass = 'flaticon-ring'; // Para la primera iteración
                                } else if (i === 1) {
                                    iconClass = 'flaticon-bracelet'; // Para la segunda iteración
                                } else if (i === 2) {
                                    iconClass = 'flaticon-necklace'; // Para las siguientes iteraciones
                                } else {
                                    iconClass = 'flaticon-earrings'; // Para las siguientes iteraciones
                                }


                                return (
                                    <div key={i} className="col-lg-3 col-sm-6">
                                        <Link to="/shop-left" className="categories-box">
                                            <span className="icon">
                                                <i className={iconClass} /> {/* Usamos iconClass aquí */}
                                            </span>
                                            <h5 className="title">{item.name}</h5> {/* Cambié 'name' por 'title' */}
                                            <p>15 Productos</p> {/* Cambié '10 Productos' por el valor dinámico */}
                                            <span className="overlay-icon">
                                                <i className={iconClass} /> {/* Usamos iconClass aquí también */}
                                            </span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;

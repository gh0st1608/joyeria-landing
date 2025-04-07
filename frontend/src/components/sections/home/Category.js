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
      error: null
    };
  }
  
  async componentDidMount() {
    this._isMounted = true;
    await this.loadCategoryProducts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadCategoryProducts = async () => {
    try {
      const category_products = await getCategoryProducts();
      
      // Verificamos y saneamos los datos antes de guardarlos
      const safeProducts = Array.isArray(category_products) 
        ? category_products.map(item => ({
            ...DEFAULT_CATEGORY,
            ...item,
            title: item.title || DEFAULT_CATEGORY.title
          }))
        : [DEFAULT_CATEGORY];

      if (this._isMounted) {
        this.setState({ 
          category_products: this.limitCategories(safeProducts),
          loading: false,
          error: null 
        });
      }
    } catch (error) {
      console.error("Error al cargar productos", error);
      if (this._isMounted) {
        this.setState({ 
          loading: false, 
          error: "No se pudieron cargar las categorías. Intente nuevamente más tarde." 
        });
      }
    }
  };

  limitCategories = (categories) => {
    const { maxCategories } = this.props;
    return maxCategories ? categories.slice(0, maxCategories) : categories;
  };

  categoryIcons = {
    rings: 'fa-ring',
    diamonds: 'fa-gem',
    necklaces: 'fa-necklace',
    earrings: 'fa-earrings',
    pendants: 'fa-gem',
    bracelets: 'fa-bracelet',
    default: 'fa-gem'
  };

  getCategoryIcon = (categoryTitle = '') => {
    const lowerTitle = categoryTitle.toLowerCase();
    
    if (lowerTitle.includes('anillo') || lowerTitle.includes('ring')) {
      return this.categoryIcons.rings;
    }
    if (lowerTitle.includes('diamante') || lowerTitle.includes('diamond')) {
      return this.categoryIcons.diamonds;
    }
    if (lowerTitle.includes('collar') || lowerTitle.includes('necklace')) {
      return this.categoryIcons.necklaces;
    }
    if (lowerTitle.includes('arete') || lowerTitle.includes('earring')) {
      return this.categoryIcons.earrings;
    }
    
    return this.categoryIcons.default;
  };

  renderCategoryCard = (category, index) => {
    const productCount = category.numberofproduct || 0;
    const iconClass = `fa-solid ${this.getCategoryIcon(category.name)}`;
    
    return (
      <Link 
        key={category.id || `category-${index}`}
        to={{
          pathname: "/shop-left",
          search: `?category=${encodeURIComponent(category.name)}`,
          state: { fromCategories: true }
        }}
        className="category-card"
        aria-label={`Ver ${productCount} productos de ${category.name}`}
      >
        <div className="card-icon">
          <i className={iconClass} />
        </div>
        <div className="card-body">
          <h3 className="card-title">{category.name}</h3>
          <p className="card-count">
            {productCount} Producto{productCount !== 1 ? 's' : ''}
          </p>
        </div>
      </Link>
    );
  };

  render() {
    const { category_products, loading, error } = this.state;

    return (
      <section className="categories-section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="categories-heading" className="section-title">Categorías</h2>
            <p className="section-subtitle">Explora nuestra colección</p>
          </div>
          
          {error && (
            <div className="error-message" role="alert">
              <p>{error}</p>
              <button 
                className="btn-retry" 
                onClick={this.loadCategoryProducts}
                aria-label="Reintentar cargar categorías"
              >
                Reintentar
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="spinner" aria-hidden="true"></div>
              <p>Cargando categorías...</p>
            </div>
          ) : (
            <div className="categories-grid">
              {category_products.length > 0 
                ? category_products.map(this.renderCategoryCard)
                : <p>No se encontraron categorías</p>
              }
            </div>
          )}
        </div>
      </section>
    );
  }
}

Category.propTypes = {
  maxCategories: PropTypes.number
};

Category.defaultProps = {
  maxCategories: null
};

export default Category;
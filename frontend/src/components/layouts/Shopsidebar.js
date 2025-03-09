import React, { useState } from "react";

const Sidebar = ({ onSearchChange, onFilterChange }) => {
  const [price, setPrice] = useState(500); // Estado para el precio seleccionado
  const [selectedColors, setSelectedColors] = useState([]); // Estado para los colores seleccionados

  // Manejar el cambio de precio y actualizar el filtro
  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
    onFilterChange({ price: newPrice, colors: selectedColors });
  };

  // Manejar el cambio en los checkboxes de color
  const handleColorChange = (e) => {
    const color = e.target.value;
    let updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(updatedColors);
    onFilterChange({ price, colors: updatedColors });
  };

  return (
    <div className="shop-sidebar">
      
      {/* Buscador */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search your keyword..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Filtro de Precio */}
      <div className="price-filter">
        <h3>Precio</h3>
        <div className="price-slider">
          
          {/* Etiquetas flotantes de los valores */}
          <div className="price-markers">
            <span className="price-marker">S/ 20</span>
            <span className="price-marker">S/ 1,000</span>
          </div>

          {/* Control deslizante */}
          <input
            type="range"
            min="20"
            max="1000"
            step="10"
            value={price}
            onChange={handlePriceChange}
          />

          {/* Burbuja con el precio actual */}
          <div className="price-value">S/ {price}</div>
          
        </div>
      </div>

      {/* Filtro de Color */}
      <div className="color-filter">
        <h3>Color</h3>
        <div className="color-options">
          {["Red", "Green", "Brown", "Grey", "Orange"].map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={selectedColors.includes(color)}
                onChange={handleColorChange}
              />
              {color}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;

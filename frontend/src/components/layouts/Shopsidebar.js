import React, { Component } from "react";
import PriceRange from "./RangoPrecio";

const colorOptions = [
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Brown", value: "brown" },
  { name: "Grey", value: "grey" },
  { name: "Orange", value: "orange" },
];

class Shopsidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColors: [],
    };
  }

  handleColorChange = (color) => {
    this.setState((prevState) => {
      const { selectedColors } = prevState;
      const updatedColors = selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color];

      this.props.onFilterChange(updatedColors); // Enviar colores a Content.js
      return { selectedColors: updatedColors };
    });
  };

  render() {
    return (
      <div className="sidebar">
        <div className="widget search-widget mb-40">
          <h5 className="widget-title">Buscar</h5>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Palabra clave..."
              onChange={(e) => this.props.onSearchChange(e.target.value)}
            />
            <button type="submit">
              <i className="far fa-search" />
            </button>
          </form>
        </div>

        <div className="widget socail-widget mb-40">
          <h5 className="widget-title">Precio</h5>
          <PriceRange />
        </div>

        <div className="widget socail-widget mb-40">
          <h5 className="widget-title">Color</h5>
          <div className="filter-color">
            <form>
              {colorOptions.map((item, i) => (
                <label key={i} className="checkbox">
                  <input
                    type="checkbox"
                    onChange={() => this.handleColorChange(item.value)}
                    checked={this.state.selectedColors.includes(item.value)}
                  />
                  <span className="custom-box" style={{ backgroundColor: item.value }} />
                  {item.name}
                </label>
              ))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Shopsidebar;

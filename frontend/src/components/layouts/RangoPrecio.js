import React, { useState } from "react";

const PriceRange = () => {
  const [value, setValue] = useState(200);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  const calculatePosition = () => {
    const percentage = ((value - 20) / (1000 - 20)) * 100;
    return `calc(${percentage}% - 20px)`; // Ajusta para centrar el marcador
  };

  return (
    <div className="range-container">
      <div className="labels">
        <span>$20</span>
        <span>$1,000</span>
      </div>
      <div
        className="current-value"
        style={{ left: calculatePosition() }}
      >
        ${value}
      </div>
      <input
        type="range"
        min="20"
        max="1000"
        step="1"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default PriceRange;
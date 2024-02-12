import React from "react";
import "../styles/Checkbox.css";

const Checkbox = ({ checked, onChange }) => {
  return (
    <label className="checkbox-btn">
      <label htmlFor="checkbox"></label>
      <input id="checkbox" type="checkbox" checked={checked} onChange={(e) => onChange(e)}/>
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;

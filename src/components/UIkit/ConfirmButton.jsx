import React from "react";

const ConfirmButton = (props) => {
  return (
    <button onClick={() => props.onClick()} className="confirm-button">
      {props.label}
    </button>
  );
};

export default ConfirmButton;

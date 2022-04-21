import React from "react";

const ProviderButton = (props) => {
  return (
    <button>
      <span class="provider-img">{props.img}</span>
      <span class="provider-label">{props.label}</span>
    </button>
  );
};

export default ProviderButton;

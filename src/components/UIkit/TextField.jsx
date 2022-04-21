import React from "react";

const TextField = (props) => {
  return (
    <div class="tfl">
      <label>
        <span class="text">{props.label}</span>
        <input
          class={props.class}
          type={props.type}
          onChange={(e) => props.onChange(e)}
        />
      </label>
    </div>
  );
};

export default TextField;

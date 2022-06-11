import React, { useState, useEffect } from "react";
import ContentListItem from "./ContentListItem";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const PhaseListItem = (props) => {
  const phase = props.phase;
  const tempProcedure = props.clumps["temp_procedure"];
  const clumpId = tempProcedure[phase].id;

  return (
    <>
      <ol className="phase-container">
        <div className="phase-name-wrapper">
          <h3>
            <span>
              <KeyboardArrowRightRoundedIcon />
            </span>
            {phase}
          </h3>
        </div>
        {tempProcedure[phase].content &&
          tempProcedure[phase].content.map((contents, index) => (
            <ContentListItem
              contents={contents}
              clumpId={clumpId}
              key={index}
            />
          ))}
      </ol>
    </>
  );
};
export default PhaseListItem;

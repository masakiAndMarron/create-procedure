import React from "react";
import ContentListItem from "./ContentListItem";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const PhaseListItem = (props) => {
  const phase = props.phase;
  const tempProcedure = props.clumps["temp_procedure"];

  return (
    <>
      <ol className="phase-container">
        <div className="phase-name-wrapper">
          <h3>{phase}</h3>
        </div>
        {tempProcedure[phase] &&
          tempProcedure[phase].map((contents, index) => (
            <ContentListItem contents={contents} key={index} />
          ))}
      </ol>
    </>
  );
};
export default PhaseListItem;

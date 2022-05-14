import React, { useState, useEffect } from "react";
import ContentListItem from "./ContentListItem";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const PhaseListItem = (props) => {
  const [phaseCount, setPhaseCount] = useState(0);
  const phase = props.phase;
  const tempProcedure = props.clumps["temp_procedure"];

  useEffect(() => {
    setPhaseCount(phaseCount + 1);
    console.log(phaseCount);
  }, []);

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
        {tempProcedure[phase] &&
          tempProcedure[phase].map((contents, index) => (
            <ContentListItem contents={contents} key={index} />
          ))}
      </ol>
    </>
  );
};
export default PhaseListItem;

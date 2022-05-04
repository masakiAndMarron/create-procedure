import React from "react";
import ContentListItem from "./ContentListItem";

const PhaseListItem = (props) => {
  const phase = props.phase;
  const tempProcedure = props.clumps["temp_procedure"];

  return (
    <>
      <h3>{phase}</h3>
      {tempProcedure[phase] &&
        tempProcedure[phase].map((contents, index) => (
          <ContentListItem contents={contents} key={index} />
        ))}
    </>
  );
};
export default PhaseListItem;

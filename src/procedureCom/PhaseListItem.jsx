import React from "react";
import ContentListItem from "./ContentListItem";

const PhaseListItem = (props) => {
  const procedureType = props.procedureType;
  const setTitle = props.setTitle;
  const setClump = props.setClump;
  const titleId = props.titleId;
  const phase = props.phase;
  const tempProcedure = props.clumps[procedureType];
  const clumpId = tempProcedure[phase].id;
  const contentList = props.clumps[procedureType][phase];

  return (
    <>
      <ol className="phase-container">
        <div className="phase-name-wrapper">
          <div className="phase-name">
            <h3>{phase}</h3>
          </div>
        </div>
        {tempProcedure[phase].contents &&
          tempProcedure[phase].contents.map((value, index) => (
            <ContentListItem
              procedureType={procedureType}
              setTitle={setTitle}
              titleId={titleId}
              setClump={setClump}
              clumpId={clumpId}
              content={value.content}
              id={value.id}
              contentList={contentList}
              key={value.id}
            />
          ))}
      </ol>
    </>
  );
};
export default PhaseListItem;

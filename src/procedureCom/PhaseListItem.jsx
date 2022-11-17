import React from "react";
import ContentListItem from "./ContentListItem";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const PhaseListItem = (props) => {
  const [contentVisible, setContentVisible] = useState(true);
  const procedureType = props.procedureType;
  const setTitle = props.setTitle;
  const setClump = props.setClump;
  const titleId = props.titleId;
  const phase = props.phase;
  const tempProcedure = props.clumps[procedureType];
  const clumpId = tempProcedure[phase].id;
  const contentList = props.clumps[procedureType][phase];

  const onContentVisible = () => {
    setContentVisible(true);
  };

  const offContentVisible = () => {
    setContentVisible(false);
  };

  return (
    <>
      <ol className="phase-container">
        <div className="phase-name-wrapper">
          <div className="phase-name">
            <div className="open-icon">
              {contentVisible ? (
                <KeyboardArrowDownIcon
                  onClick={() => {
                    offContentVisible();
                  }}
                />
              ) : (
                <KeyboardArrowRightIcon
                  onClick={() => {
                    onContentVisible();
                  }}
                />
              )}
            </div>
            <h3>{phase}</h3>
          </div>
        </div>
        {contentVisible && (
          <div className="content-list-wrapper">
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
          </div>
        )}
      </ol>
    </>
  );
};
export default PhaseListItem;

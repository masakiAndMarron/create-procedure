import React, { useEffect, useState, useCallback } from "react";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { Divider, styled } from "@mui/material";
import { deleteContent } from "../reducs/procedures/deleteFirestore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CustomDeleteIcon = styled(DeleteOutlineSharpIcon)({
  width: "30px",
  height: "30px",
  verticalAlign: "middle",
  paddingBottom: "3px",
});

const CustomCheckIcon = styled(CheckCircleOutlineIcon)({
  width: "58px",
  height: "62px",
  color: "#b3b3b3",
  cursor: "pointer",
  userSelect: "none",
});
const ActiveCustomCheckIcon = styled(CheckCircleOutlineIcon)({
  width: "58px",
  height: "62px",
  color: "green",
  cursor: "pointer",
  userSelect: "none",
});

const ContentListItem = (props) => {
  const [checkButton, setCheckButton] = useState(false),
    [skipButton, setSkipButton] = useState(false);
  const procedureType = props.procedureType;
  const setTitle = props.setTitle;
  const setClump = props.setClump;
  const titleId = props.titleId;
  const clumpId = props.clumpId;
  const contentId = props.id;
  const content = props.content;
  const contentList = props.contentList;

  const changeCheckButton = () => {
    setCheckButton(true);
    setSkipButton(false);
  };

  const changeSkipButton = () => {
    setSkipButton(true);
    setCheckButton(false);
  };

  return (
    <>
      <li className="content-container">
        <div className="content">{content}</div>
        <div className="procedure-in-button">
          {checkButton ? (
            <ActiveCustomCheckIcon onClick={() => setCheckButton(false)} />
          ) : (
            <CustomCheckIcon onClick={() => changeCheckButton()} />
          )}

          {skipButton ? (
            <div
              className="skip-button active"
              onClick={() => setSkipButton(false)}
            >
              Skip
            </div>
          ) : (
            <div className="skip-button" onClick={() => changeSkipButton()}>
              Skip
            </div>
          )}
        </div>
        {procedureType === "temp_procedure" && (
          <div className="content-delete">
            <CustomDeleteIcon
              onClick={() =>
                deleteContent(
                  titleId,
                  clumpId,
                  contentId,
                  contentList,
                  setTitle,
                  setClump
                )
              }
            />
          </div>
        )}
      </li>
      <Divider />
    </>
  );
};

export default ContentListItem;

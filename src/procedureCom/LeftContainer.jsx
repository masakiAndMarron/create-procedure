import React, { useState, useEffect } from "react";
import {
  createTempProcedure,
  getTempProcedureId,
  addContent,
  getClumpId,
} from "../reducs/procedures/createFirestore";
import { TextField, Button, styled } from "@mui/material";

const CustomContentField = styled(TextField)({
  height: "200px",
  width: "310px",
});

export const CustomButton = styled(Button)({
  marginLeft: "24px",
});

const LeftContainer = (props) => {
  const [clumpId, setClumpId] = useState(""),
    [contentErrorFlag, switchContentErrorFlag] = useState(false);

  const setTitleId = props.setTitleId;
  const setClump = props.setClump;
  const setPhase = props.setPhase;
  const setContent = props.setContent;
  const title = props.title;
  const titleId = props.titleId;
  const clumps = props.clumps;
  const phase = props.phase;
  const content = props.content;

  useEffect(() => {
    if (titleId === "") {
      getTempProcedureId(setTitleId);
    }
  }, []);

  useEffect(() => {
    if (titleId !== "") {
      getClumpId(titleId, setClumpId);
    }
  }, [titleId]);

  return (
    <div className="left-container">
      <div className="width-adjustment">
        <div className="top-wrapper">
          <div className="title-field">
            {titleId === "" ? (
              <>
                <TextField
                  label="Title"
                  id="outlined-size-small"
                  size="small"
                  value={title}
                  onChange={(e) => props.inputTitle(e)}
                />
                <CustomButton
                  variant="contained"
                  onClick={() =>
                    createTempProcedure(
                      title,
                      "Title",
                      titleId,
                      setTitleId,
                      clumps,
                      setClump
                    )
                  }
                >
                  作成
                </CustomButton>
              </>
            ) : (
              <>
                <TextField
                  disabled
                  id="outlined-disabled"
                  size="small"
                  value="作成中・・・"
                />
                <CustomButton variant="contained" disabled>
                  作成
                </CustomButton>
              </>
            )}
          </div>
          <div className="phase-field">
            <TextField
              label="Phase"
              id="outlined-size-small"
              size="small"
              value={phase}
              onChange={(e) => props.inputPhase(e)}
            />
            <CustomButton
              variant="contained"
              onClick={() =>
                createTempProcedure(
                  phase,
                  "Phase",
                  titleId,
                  setClumpId,
                  setPhase,
                  clumps,
                  setClump
                )
              }
            >
              追加
            </CustomButton>
          </div>
        </div>
        <div className="second-wrapper">
          <div className="content-field">
            <CustomContentField
              id="standard-multiline-static"
              label="Content"
              multiline
              rows={7}
              variant="standard"
              value={content}
              onChange={(e) => props.inputContent(e)}
            />
            <CustomButton
              variant="contained"
              onClick={() =>
                addContent(
                  titleId,
                  clumpId,
                  content,
                  setContent,
                  switchContentErrorFlag,
                  clumps,
                  setClump
                )
              }
            >
              追加
            </CustomButton>
          </div>
          {contentErrorFlag && (
            <div className="error-message">※フェーズを入力してください</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;

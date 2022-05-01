import React, { useState, useEffect } from "react";
import {
  createTempProcedure,
  getTempProcedureId,
  addContent,
} from "../reducs/procedures/oparation";
import "../assets/procedure.css";
import { TextField, Button, styled } from "@mui/material";

const CustomContentField = styled(TextField)({
  height: "200px",
  width: "310px",
});

const CustomButton = styled(Button)({
  marginLeft: "24px",
});

const LeftContainer = (props) => {
  const [titleId, setTitleId] = useState(""),
    [clumpId, setClumpId] = useState("");

  useEffect(() => {
    getTempProcedureId(setTitleId);
  }, []);

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
                  value={props.title}
                  onChange={(e) => props.inputTitle(e)}
                />
                <CustomButton
                  variant="contained"
                  onClick={() =>
                    createTempProcedure(
                      props.title,
                      "Title",
                      titleId,
                      setTitleId
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
              value={props.phase}
              onChange={(e) => props.inputPhase(e)}
            />
            <CustomButton
              variant="contained"
              onClick={() =>
                createTempProcedure(props.phase, "Phase", titleId, setClumpId)
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
              value={props.content}
              onChange={(e) => props.inputContent(e)}
            />
            <CustomButton
              variant="contained"
              onClick={() => addContent(titleId, clumpId, props.content)}
            >
              追加
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;
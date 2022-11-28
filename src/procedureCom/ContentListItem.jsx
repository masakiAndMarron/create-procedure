import React, { useState, useContext } from "react";
import { ResultClump } from "../procedureListCom/ProcedureDetail";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { Divider, styled } from "@mui/material";
import { deleteContent } from "../reducs/procedures/deleteFirestore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useCallback } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";

const CustomDeleteIcon = styled(DeleteOutlineSharpIcon)({
  width: "30px",
  height: "30px",
  verticalAlign: "middle",
  paddingBottom: "3px",
});

const ContentListItem = (props) => {
  const [checkButton, setCheckButton] = useState(false),
    [skipButton, setSkipButton] = useState(false),
    [memo, setMemo] = useState("");
  const { clumpResult, setClumpResult } = useContext(ResultClump);
  const procedureType = props.procedureType;
  const setTitle = props.setTitle;
  const titleId = props.titleId;
  const setClump = props.setClump;
  const clumpId = props.clumpId;
  const contentId = props.contentId;
  const content = props.content;
  const contentList = props.contentList;

  const inputMemo = useCallback(
    (event) => {
      setMemo(event.target.value);
    },
    [setMemo]
  );

  useEffect(() => {
    if (procedureType === "procedure") {
      Object.keys(clumpResult["procedure"]).map((phaseName) => {
        const content = clumpResult["procedure"][phaseName].contents.filter(
          (content) => {
            return content.id === contentId ? (content.memo = memo) : content;
          }
        );
      });
      setClumpResult(clumpResult);
    }
  }, [memo]);

  const upDateResultProcedureButton = () => {
    let judge = "no select";
    Object.keys(clumpResult["procedure"]).map((phaseName) => {
      const content = clumpResult["procedure"][phaseName].contents.filter(
        (content) => {
          if (content.id === contentId) {
            if (checkButton) {
              judge = "check";
            } else if (skipButton) {
              judge = "skip";
            }
            content.result = judge;
          }
          return content;
        }
      );
    });
    setClumpResult(clumpResult);
  };

  useEffect(() => {
    if (procedureType === "procedure") {
      upDateResultProcedureButton();
    }
  }, [checkButton]);

  useEffect(() => {
    if (procedureType === "procedure") {
      upDateResultProcedureButton();
    }
  }, [skipButton]);

  const changeCheckButton = () => {
    setCheckButton(true);
    setSkipButton(false);
  };

  const changeSkipButton = () => {
    setSkipButton(true);
    setCheckButton(false);
  };

  const offCheckButton = () => {
    setCheckButton(false);
  };

  const offSkipButton = () => {
    setSkipButton(false);
  };

  return (
    <>
      <li className="content-container">
        <div className="content-list">
          <div className="content">{content}</div>
          {procedureType === "procedure" && (
            <TextField
              id="outlined-basic"
              label="Memo"
              variant="outlined"
              onChange={(e) => inputMemo(e)}
            />
          )}
        </div>
        {/* 表示している手順書が本番用だったらチェック・スキップボタンを表示する*/}
        {procedureType === "procedure" && (
          <div className="procedure-in-button">
            {/* チェックボタンがtrueだったら、専用の画面を表示する */}
            {checkButton ? (
              <div className="check-button active">
                <span onClick={() => offCheckButton()}>
                  <DoneOutlineOutlinedIcon />
                </span>
              </div>
            ) : (
              <div className="check-button">
                <span onClick={() => changeCheckButton()}>
                  <DoneOutlineOutlinedIcon />
                </span>
              </div>
            )}

            {/* スキップボタンがtrueだったら、専用の画面を表示する */}
            {skipButton ? (
              <div
                className="skip-button active"
                onClick={() => offSkipButton()}
              >
                <span>Skip</span>
              </div>
            ) : (
              <div className="skip-button" onClick={() => changeSkipButton()}>
                <span>Skip</span>
              </div>
            )}
          </div>
        )}
        {/* 表示している手順書が作成用だったらコンテンツ削除機能の付いたゴミ箱を表示する*/}
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

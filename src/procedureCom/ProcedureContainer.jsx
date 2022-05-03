import React, { useState, useCallback } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import { AppBar, Toolbar } from "@mui/material";
import "../assets/procedure.css";

const ProcedureContainer = () => {
  const [title, setTitle] = useState(""),
    [phase, setPhase] = useState(""),
    [content, setContent] = useState("");

  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const inputPhase = useCallback(
    (event) => {
      setPhase(event.target.value);
    },
    [setPhase]
  );

  const inputContent = useCallback(
    (event) => {
      setContent(event.target.value);
    },
    [inputPhase]
  );

  return (
    <div>
      {/* <AppBar>
        <Toolbar></Toolbar>
      </AppBar> */}
      <div className="container-wrapper">
        <LeftContainer
          inputTitle={inputTitle}
          inputPhase={inputPhase}
          inputContent={inputContent}
          setPhase={setPhase}
          setContent={setContent}
          title={title}
          phase={phase}
          content={content}
        />
        <RightContainer />
      </div>
    </div>
  );
};

export default ProcedureContainer;

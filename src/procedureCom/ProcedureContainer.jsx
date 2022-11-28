import React, { useState, useCallback, createContext } from "react";
import { ResultClump } from "../procedureListCom/ProcedureDetail";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import "../assets/procedure.css";

const ProcedureContainer = () => {
  const [title, setTitle] = useState(""),
    [titleId, setTitleId] = useState(""),
    [clumps, setClump] = useState(""),
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
    <div className="container-frame">
      <div className="container-wrapper">
        <LeftContainer
          inputTitle={inputTitle}
          inputPhase={inputPhase}
          inputContent={inputContent}
          setTitleId={setTitleId}
          setPhase={setPhase}
          setContent={setContent}
          setClump={setClump}
          title={title}
          titleId={titleId}
          clumps={clumps}
          phase={phase}
          content={content}
        />
        <ResultClump.Provider value={""}>
          <RightContainer
            setTitle={setTitle}
            setClump={setClump}
            title={title}
            titleId={titleId}
            clumps={clumps}
          />
        </ResultClump.Provider>
      </div>
    </div>
  );
};

export default ProcedureContainer;

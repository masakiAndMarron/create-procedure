import React, { useState, createContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { readProcedure } from "../reducs/procedures/readFirestore";
import { createLog } from "../reducs/procedures/createFirestore";
import PhaseListItem from "../procedureCom/PhaseListItem";
import "../assets/procedure.css";

export const ResultClump = createContext();

const ProcedureDetail = () => {
  const [title, setTitle] = useState(""),
    [clumps, setClump] = useState(""),
    [clumpResult, setClumpResult] = useState("");

  const clumpResultSet = {
    clumpResult,
    setClumpResult,
  };

  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("procedure/detail/")[1];

  useEffect(() => {
    readProcedure(id, setTitle, setClump, setClumpResult);
  }, []);

  return (
    <>
      {title !== "" && <h2>{title}</h2>}
      <div className="procedure-detail-wrapper">
        {clumps !== "" &&
          clumpResult !== "" &&
          Object.keys(clumps["procedure"]).map((phaseName) => (
            <ResultClump.Provider value={clumpResultSet}>
              <PhaseListItem
                procedureType={"procedure"}
                setTitle={setTitle}
                titleId={id}
                setClump={setClump}
                clumps={clumps}
                phase={phaseName}
                key={clumps["procedure"][phaseName].id}
              />
            </ResultClump.Provider>
          ))}
        <div className="procedure-complete-button">
          <button onClick={() => createLog(title, clumpResult)}>
            作業完了
          </button>
        </div>
      </div>
    </>
  );
};

export default ProcedureDetail;

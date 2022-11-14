import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { readProcedure } from "../reducs/procedures/readFirestore";
import PhaseListItem from "../procedureCom/PhaseListItem";
import "../assets/procedure.css";

const ProcedureDetail = (props) => {
  const [title, setTitle] = useState(""),
    [clumps, setClump] = useState("");

  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("procedure/detail/")[1];

  useEffect(() => {
    readProcedure(id, setTitle, setClump);
  }, []);

  useEffect(() => {}, [clumps]);
  if (clumps !== "") {
    Object.keys(clumps["procedure"]).forEach((key) => {
      console.log(clumps["procedure"][key].contents);
    });
  }

  return (
    <>
      {title !== "" && <h2>{title}</h2>}
      <div className="procedure-detail-wrapper">
        {clumps !== "" &&
          Object.keys(clumps["procedure"]).map((phaseName) => (
            <PhaseListItem
              procedureType={"procedure"}
              setTitle={setTitle}
              titleId={id}
              setClump={setClump}
              clumps={clumps}
              phase={phaseName}
              key={clumps["procedure"][phaseName].id}
            />
          ))}
      </div>
    </>
  );
};

export default ProcedureDetail;

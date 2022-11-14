import React, { useState, useEffect } from "react";
import { readProcedureList } from "../reducs/procedures/readFirestore";
import IndividualProcedure from "./IndividualProcedure";
import "../assets/procedure.css";

const ProcedureListContainer = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    readProcedureList(setTitles, titles);
  }, []);

  return (
    <>
      {titles !== "" &&
        titles.map((phase) => (
          <IndividualProcedure
            id={phase.id}
            title={phase.title}
            key={phase.id}
          />
        ))}
    </>
  );
};

export default ProcedureListContainer;

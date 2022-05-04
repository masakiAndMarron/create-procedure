import React, { useEffect, useState } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";
import PhaseListItem from "./PhaseListItem";

const RightContainer = () => {
  const [title, setTitle] = useState(""),
    [clumps, setClump] = useState("");

  useEffect(() => {
    readTempProcedure(title, clumps, setTitle, setClump);
  }, []);

  return (
    <main className="right-container-wrapper">
      <article>
        <h2>{title && <div>{title}</div>}</h2>
        {clumps !== "" &&
          Object.keys(clumps["temp_procedure"]).map((phases, index) => (
            <PhaseListItem clumps={clumps} phase={phases} key={index} />
          ))}
      </article>
    </main>
  );
};

export default RightContainer;

import React, { useEffect, useState } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";
import PhaseListItem from "./PhaseListItem";

const RightContainer = (props) => {
  const title = props.title;
  const clumps = props.clumps;
  const setClump = props.setClump;
  const setTitle = props.setTitle;

  useEffect(() => {
    readTempProcedure(setTitle, setClump);
  }, []);

  return (
    <main className="right-container-wrapper">
      <article>
        <div className="title-wrapper">
          <h2>{title && <div>{title}</div>}</h2>
          <span>を作成中・・・</span>
        </div>
        {clumps !== "" &&
          Object.keys(clumps["temp_procedure"]).map((phases, index) => (
            <PhaseListItem clumps={clumps} phase={phases} key={index} />
          ))}
      </article>
    </main>
  );
};

export default RightContainer;

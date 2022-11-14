import React, { useEffect, useState } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";
import PhaseListItem from "./PhaseListItem";
import { CustomButton } from "./LeftContainer";
import { createProcedure } from "../reducs/procedures/createFirestore";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const RightContainer = (props) => {
  const title = props.title;
  const titleId = props.titleId;
  const clumps = props.clumps;
  const setClump = props.setClump;
  const setTitle = props.setTitle;
  const dispatch = useDispatch();

  const fetchProcedureList = () => {
    createProcedure();
    dispatch(push("/procedureList"));
  };

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
        <div className="procedure-wrapper">
          {clumps !== "" &&
            Object.keys(clumps["temp_procedure"]).map((phases) => (
              <PhaseListItem
                procedureType={"temp_procedure"}
                setTitle={setTitle}
                titleId={titleId}
                setClump={setClump}
                clumps={clumps}
                phase={phases}
                key={clumps["temp_procedure"][phases].id}
              />
            ))}
        </div>
      </article>
      <div className="decide-button-area">
        <CustomButton variant="contained" onClick={() => fetchProcedureList()}>
          作成
        </CustomButton>
      </div>
    </main>
  );
};

export default RightContainer;

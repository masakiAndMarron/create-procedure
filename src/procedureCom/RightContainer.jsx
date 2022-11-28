import React, { useEffect } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";
import PhaseListItem from "./PhaseListItem";
import { CustomButton } from "./LeftContainer";
import { createProcedure } from "../reducs/procedures/createFirestore";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const RightContainer = (props) => {
  let dispatch = useDispatch();
  const title = props.title;
  const titleId = props.titleId;
  const clumps = props.clumps;
  const setClump = props.setClump;
  const setTitle = props.setTitle;

  useEffect(() => {
    readTempProcedure(setTitle, setClump);
  }, []);

  const createFetchProcedure = (titleId) => {
    createProcedure(titleId);
    dispatch(push("/procedureList"));
  };

  return (
    <main className="right-container-wrapper">
      <article>
        {title !== "" && (
          <div className="title-wrapper">
            <h2>{title && <div>{title}</div>}</h2>
            <span>を作成中・・・</span>
          </div>
        )}
        {clumps !== "" && Object.keys(clumps["temp_procedure"]).length > 0 && (
          <div className="procedure-wrapper">
            {Object.keys(clumps["temp_procedure"]).map((phases) => (
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
        )}
      </article>
      <div className="decide-button-area">
        <CustomButton
          variant="contained"
          onClick={() => createFetchProcedure(titleId)}
        >
          作成
        </CustomButton>
      </div>
    </main>
  );
};

export default RightContainer;

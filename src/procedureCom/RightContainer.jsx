import React, { useEffect, useState } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";
import PhaseListItem from "./PhaseListItem";

const RightContainer = (props) => {
  const [title, setTitle] = useState(""),
    [clumps, setClump] = useState("");

  useEffect(() => {
    readTempProcedure(title, clumps, setTitle, setClump);
  }, []);

  //オブジェクトが完全にclumpsにセットされる前にこれが呼び出されている。

  return (
    <main className="right-container-wrapper">
      <article>
        <h2>{title && <div>{title}</div>}</h2>
        {clumps !== "" &&
          Object.keys(clumps["temp_procedure"]).map((phases) => (
            <PhaseListItem phase={phases} key={phases.length} />
            // フェーズコンポーネントにphaseを渡す。
            //コンテンツコンポーネントにcontentを渡す。
          ))}
      </article>
    </main>
  );
};

export default RightContainer;

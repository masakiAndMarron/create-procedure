import React, { useEffect, useState } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";

const RightContainer = (props) => {
  const [title, setTitle] = useState(""),
    [clump, setClump] = useState({});

  useEffect(() => {
    readTempProcedure(title, clump, setTitle, setClump);
  }, []);

  if (clump) {
    console.log(Object.entries(Object.keys(clump)));
  }

  return (
    <main className="right-container-wrapper">
      <article>
        <h2>{title && <div>{title}</div>}</h2>
        {clump && (
          <>
            <section>
              <h3></h3>
              <ol>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </section>
          </>
        )}
      </article>
    </main>
  );
};

export default RightContainer;

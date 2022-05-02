import React, { useEffect, useState } from "react";
import { readTempProcedure } from "../reducs/procedures/readFirestore";

const RightContainer = (props) => {
  const [title, setTitle] = useState(""),
    [clump, setClump] = useState({});

  useEffect(() => {
    readTempProcedure(title, clump, setTitle, setClump);
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default RightContainer;

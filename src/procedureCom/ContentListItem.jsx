import React from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

const ContentListItem = (props) => {
  return (
    <>
      <li>
        <div>{props.contents}</div>
        <div>
          <DeleteForeverTwoToneIcon />
        </div>
      </li>
    </>
  );
};

export default ContentListItem;

import React from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Divider } from "@mui/material";

const ContentListItem = (props) => {
  return (
    <>
      <li className="content-container">
        <div className="content">{props.contents}</div>
        <div className="content-delete">
          <DeleteForeverTwoToneIcon />
        </div>
      </li>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ContentListItem;

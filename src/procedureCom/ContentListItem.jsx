import React from "react";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { Divider, styled } from "@mui/material";

const CustomDeleteIcon = styled(DeleteOutlineSharpIcon)({
  width: "30px",
  height: "30px",
  verticalAlign: "middle",
  paddingBottom: "3px",
});

const ContentListItem = (props) => {
  return (
    <>
      <li className="content-container">
        <div className="content">{props.contents}</div>
        <div className="content-delete">
          <CustomDeleteIcon />
        </div>
      </li>

      <Divider />
    </>
  );
};

export default ContentListItem;

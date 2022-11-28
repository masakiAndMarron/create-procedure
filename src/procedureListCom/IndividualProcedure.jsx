import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { readProcedure } from "../reducs/procedures/readFirestore";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import { push } from "connected-react-router";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Avatar from "@mui/material/Avatar";
import { deleteProcedure } from "../reducs/procedures/deleteFirestore";

const IndividualProcedure = (props) => {
  const id = props.id;
  const title = props.title;
  const setTitles = props.setTitles;
  const createdAt = props.createdAt;
  const dispatch = useDispatch();

  const buttons = [
    <DeleteOutlinedIcon onClick={() => deleteProcedure(id, setTitles)} />,
    <BorderColorOutlinedIcon />,
  ];

  const fetchProcedureDetail = () => {
    readProcedure(id);
    dispatch(push("/procedure/detail/" + id));
  };

  return (
    <>
      <ListItem>
        <ListItemIcon onClick={() => fetchProcedureDetail()}>
          <IconButton>
            <Avatar>
              <OpenInFullIcon />
            </Avatar>
          </IconButton>
        </ListItemIcon>
        <ListItemText
          sx={{ marginLeft: "20px;" }}
          primary={title}
          secondary={"作成日時：" + createdAt}
        ></ListItemText>
        {buttons.map((button) => (
          <>
            <ListItemIcon>
              <IconButton>{button}</IconButton>
            </ListItemIcon>
          </>
        ))}
      </ListItem>
    </>
  );
};

export default IndividualProcedure;

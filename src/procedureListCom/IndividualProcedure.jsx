import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import { readProcedure } from "../reducs/procedures/readFirestore";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Procedure = styled("div")(({ theme }) => ({}));

const IndividualProcedure = (props) => {
  const id = props.id;
  const title = props.title;
  const dispatch = useDispatch();

  const fetchProcedureDetail = () => {
    readProcedure(id);
    dispatch(push("/procedure/detail/" + id));
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Procedure className="procedure-flame">
          <List>
            <ListItem>
              <ListItemIcon>
                <FolderIcon
                  className="procedure-icon"
                  onClick={() => fetchProcedureDetail()}
                />
              </ListItemIcon>
              <ListItemText>{title}</ListItemText>
            </ListItem>
          </List>
        </Procedure>
      </Grid>
    </Box>
  );
};

export default IndividualProcedure;

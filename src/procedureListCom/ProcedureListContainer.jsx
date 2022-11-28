import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { readProcedureList } from "../reducs/procedures/readFirestore";
import { styled, alpha } from "@mui/material/styles";
import IndividualProcedure from "./IndividualProcedure";
import InputBase from "@mui/material/InputBase";
import "../assets/procedure.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import { searchProcedureList } from "../reducs/procedures/readFirestore";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "25%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const ProcedureListContainer = () => {
  const [titles, setTitles] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const navItems = [
    <AccessTimeIcon />,
    <AddIcon onClick={() => fetchCreateProcedure()} />,
    <LogoutIcon />,
  ];
  const dispatch = useDispatch();

  const fetchCreateProcedure = () => {
    dispatch(push("/create/procedure"));
  };

  const onEnter = (event) => {
    if (event.key === "Enter") {
      searchProcedureList(setTitles, searchWord);
    }
  };

  const inputSearchWord = useCallback(
    (event) => {
      setSearchWord(event.target.value);
    },
    [setSearchWord]
  );

  useEffect(() => {
    readProcedureList(setTitles, titles);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar display={"flex"}>
            <Typography variant="h6" component="div" width={"35%"}>
              MUI
            </Typography>
            <Search onKeyDown={(e) => onEnter(e)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => inputSearchWord(e)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box flex={"1"} textAlign={"end"}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          paddingTop={"80px"}
          width={"70%"}
          margin={"0 auto"}
        >
          <Typography>
            {titles !== "" &&
              titles.map((phase, index) => {
                if (index % 2 !== 0) {
                  return (
                    <>
                      <List sx={{ backgroundColor: "whitesmoke" }}>
                        <IndividualProcedure
                          id={phase.id}
                          title={phase.title}
                          setTitles={setTitles}
                          createdAt={phase.created_at}
                          key={phase.id}
                          index={index}
                        />
                      </List>
                      <Divider />
                    </>
                  );
                } else {
                  return (
                    <>
                      <List>
                        <IndividualProcedure
                          id={phase.id}
                          title={phase.title}
                          setTitles={setTitles}
                          createdAt={phase.created_at}
                          key={phase.id}
                          index={index}
                        />
                      </List>
                      <Divider />
                    </>
                  );
                }
              })}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProcedureListContainer;

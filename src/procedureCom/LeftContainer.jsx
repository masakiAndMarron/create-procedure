import React from "react";
import "../assets/procedure.css";
import { TextField, Button } from "@mui/material";

const LeftContainer = () => {
  return (
    <div className="left-container">
      <div>
        <div className="top-wrapper">
          <div className="title-field">
            <TextField label="Title" id="outlined-size-small" size="small" />
            <Button variant="contained">作成</Button>
          </div>
          <div className="phase-field">
            <TextField label="phase" id="outlined-size-small" size="small" />
            <Button variant="contained">追加</Button>
          </div>
        </div>
        <div className="second-wrapper">
          <div className="content-field">
            <TextField
              id="standard-multiline-static"
              label="Content"
              multiline
              rows={4}
              variant="standard"
            />
            <Button variant="contained">追加</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;

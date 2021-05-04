import styled from "styled-components";
import Popover from '@material-ui/core/Popover';
import React from "react";
import Card from '@material-ui/core/Card';
import ContentPane from "./ContentPane";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2)
    }
  }));
  

function Event({details}) {



    let startTime = details.startTime.getHours() +(details.startTime.getMinutes() /60);
    let endTime = details.endTime.getHours() + (details.endTime.getMinutes() / 60);
    let length = endTime - startTime;

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log("click");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return(
        <EventStyle details={details} startTime = {startTime} endTime = {endTime} length = {length}>
            <Label onClick={handleClick}>{details.name}</Label>
            <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          PaperProps={{
            style: { width: '300px' },
          }}
        >
            <ContentPane details = {details}/>
               
         
        </Popover>
        </EventStyle>
    );
}


const EventStyle = styled.div`
    grid-column: ${(props) => props.details.startCol} / span ${(props) => props.details.span};
    grid-row: ${(props) => (props.startTime -9) * 4 + 2} / span ${(props) => (props.length * 4)};
    background-color: ${(props) => props.details.color};

    display: flex;
    justify-content: center;

   // margin-left: 1px;
   //border: 1px solid black;
   margin: 1px;
   
  
`;

//NOTE: width and height are placed at 100% to help with pop-over clicking.
//This may cause placement weirdness. 
//This was necessary because popover does not work if it's inside the element that's triggering it (e.g. EventStyle)
const Label = styled.p`
  font-size: 14px;
  text-align: center;
  width: 100%;
  height: 100%;
  

`;



export default Event;
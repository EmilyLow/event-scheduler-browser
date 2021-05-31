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
  

function Event({details, settings, deleteEvent, handleClick}) {



    let startTimeValue = details.start_time.getHours() +(details.start_time.getMinutes() /60);
    let endTimeValue = details.end_time.getHours() + (details.end_time.getMinutes() / 60);
    let length = endTimeValue - startTimeValue;

    const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleClick = (event, pDetails) => {
    //     console.log("click");
    //     console.log("Details", pDetails);
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? "simple-popover" : undefined;

    return(
      
        <EventStyle onClick={ e => handleClick(e, details)} details={details} startTimeValue = {startTimeValue} endTimeValue = {endTimeValue} length = {length} startHour = {settings.startHour}>

            <Label>{details.event_name}</Label>
            {/* <Label onClick={ e => handleClick(e, details)}>{details.event_name}</Label> */}
            {/* <Popover
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
            <ContentPane details = {details} startTimeValue = {details.start_time} endTimeValue = {details.end_time} deleteEvent={deleteEvent}/>
               
         
        </Popover> */}
        </EventStyle>
    );
}


const EventStyle = styled.div`
    grid-column: ${(props) => props.details.start_col} / span ${(props) => props.details.span};
    grid-row: ${(props) => (props.startTimeValue - props.startHour) * 4 + 2} / span ${(props) => (props.length * 4)};
    background-color: ${(props) => props.details.color};

    display: flex;
    justify-content: center;

   // margin-left: 1px;
   //border: 1px solid black;
   margin: 1px;
   
  
`;

//TODO: Fix overflow. I think it isn't working because it has a seperate div from event? Or a seperate height at least because I made the height bigger for more clickable area. 
//I think it wouldn't push it past the bottom if wasn't doing the height workaround
//NOTE: width and height are placed at 100% to help with pop-over clicking.
//This may cause placement weirdness. 
//This was necessary because popover does not work if it's inside the element that's triggering it (e.g. EventStyle)
const Label = styled.p`
  font-size: 14px;
  text-align: center;
  width: 100%;
  height: 100%;

  overflow: hidden;
  overflow-y: hidden
  

`;



export default Event;
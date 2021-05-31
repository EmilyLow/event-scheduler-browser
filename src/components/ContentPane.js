import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Popover from '@material-ui/core/Popover';
import React from "react";
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Location from '@material-ui/icons/LocationOn';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Subject from '@material-ui/icons/Subject';
import Button from "@material-ui/core/Button";

// <Divider style={{width:'100%'}} light/>

function ContentPane({details, deleteEvent}) {

    console.log(details);

   
    
    function militaryToStan (milHour, minutes) {
        let minString = minutes;
        if(minString === 0) {
            minString = "00";
        }
        if (milHour <= 12) {
            return "" + milHour + ":" + minString + " AM";
        }
        else {
            return "" + (milHour - 12) + ":" + minString +  " PM";
        }
    }

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    let formattedStart;
    let formattedEnd;
    let formattedDate;
    let formattedTime;

    if(Object.keys(details).length != 0) {
        // console.log("In if");
        // console.log(details);
        let startTimeValue = details.start_time;
        let endTimeValue = details.end_time;
        // console.log(startTimeValue);
        formattedStart = militaryToStan(startTimeValue.getHours(), startTimeValue.getMinutes());
        formattedEnd = militaryToStan(endTimeValue.getHours(), endTimeValue.getMinutes());
        formattedDate = "" + days[startTimeValue.getDay()] + ", " +(startTimeValue.getMonth() + 1) + "/" + startTimeValue.getDate() + "/" + startTimeValue.getFullYear();
        formattedTime = formattedStart + " to " + formattedEnd + ", " + formattedDate;
    }


    function deleteAction() {
        deleteEvent(details);
    }

    return(<EventDiv>
        <Grid container>
             <Grid item xs={12}> <Typography variant={'h5'}>{details.event_name}</Typography> </Grid>
             <Grid item xs={12}><Typography variant={'subtitle1'}> {formattedTime}</Typography> </Grid>

             <Grid item xs={12}> <Divider style={{marginBottom:'8px'}} /> </Grid>

     

            { details.location !== "" && <Grid item xs = {2}><Location/> </Grid>}
            { details.location !== "" && <Grid item xs = {10}><Typography variant = {'body1'}>{details.location}</Typography></Grid>}

            { details.speaker !== "" && <Grid item xs = {2}><PeopleAlt/> </Grid>}
            { details.speaker !== "" && <Grid item xs = {10}><Typography variant = {'body1'}>{details.speaker}</Typography></Grid>}

            { details.summary !== "" && <Grid item xs = {2}><Subject/> </Grid>}
            { details.summary !== "" && <Grid item xs = {10}><Typography variant = {'body1'}>{details.summary}</Typography></Grid>}
           <Grid><Button item xs = {4} variant="outlined" onClick={() => { deleteAction() }}>Delete</Button></Grid> 
        </Grid>
            
    </EventDiv>)
}

const EventCard = styled(Card)`
    margin: 5px;

`;

const EventDiv = styled.div`
    margin: 8px;

`;



export default ContentPane;
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

// <Divider style={{width:'100%'}} light/>

function ContentPane({details, startTimeValue, endTimeValue}) {
    // console.log("Content Pane,", details);
    // console.log("startTimeValue", startTimeValue);
    // console.log("endTimeValue", endTimeValue);

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


    const formattedStart = militaryToStan(startTimeValue.getHours(), startTimeValue.getMinutes());
    const formattedEnd = militaryToStan(endTimeValue.getHours(), endTimeValue.getMinutes());
    const formattedDate = "" + days[startTimeValue.getDay()] + ", " +(startTimeValue.getMonth() + 1) + "/" + startTimeValue.getDate() + "/" + startTimeValue.getFullYear();
    const formattedTime = formattedStart + " to " + formattedEnd + ", " + formattedDate;


    return(<EventDiv>
        <Grid container>
             <Grid item xs={12}> <Typography variant={'h5'}>{details.name}</Typography> </Grid>
             <Grid item xs={12}><Typography variant={'subtitle1'}> {formattedTime}</Typography> </Grid>

             <Grid item xs={12}> <Divider style={{marginBottom:'8px'}} /> </Grid>

     

            { details.location !== "" && <Grid item xs = {2}><Location/> </Grid>}
            { details.location !== "" && <Grid item xs = {10}><Typography variant = {'body1'}>{details.location}</Typography></Grid>}

            { details.speaker !== "" && <Grid item xs = {2}><PeopleAlt/> </Grid>}
            { details.speaker !== "" && <Grid item xs = {10}><Typography variant = {'body1'}>{details.speaker}</Typography></Grid>}

            { details.summary !== "" && <Grid item xs = {2}><Subject/> </Grid>}
            { details.summary !== "" && <Grid item xs = {10}><Typography variant = {'body1'}>{details.summary}</Typography></Grid>}
            
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
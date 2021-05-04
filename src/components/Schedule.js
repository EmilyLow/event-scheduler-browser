import styled from "styled-components";

import testDataDates from "../testDataDates";
import Event from "./Event";

function Schedule() {

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    
    let hours = [];

    let {settings} = testDataDates;
  
    for (let i = 0; i < settings.dayNum; i++) {
       for (let j = 0; j < settings.hourNum; j++) {
           //Note! Changing from 0 start to 1 start here.
           //Consider if this should be done elsewhere, based off how Date() works. 
           //Removing that for now
        hours.push(<Hour  key = {"hour" + i + j} day={i} hour={j}/>)
     }
    }

    let hourLabels = [];
    for (let i = 0; i < settings.hourNum; i++) { 
        hourLabels.push(<HourLabel key = {"hourlabel" + i} hour = {i}> {militaryToStan(i + settings.startHour)}</HourLabel>);
    }

    function militaryToStan (milHour) {
        if (milHour <= 12) {
            return "" + milHour + " AM";
        }
        else {
            return "" + (milHour - 12) + " PM";
        }
    }


    //Check overlap function
    //Give column based on overlap
    //Maybe give a length property based off of number of rows?
    // console.log("Settings:", settings)

    let dayLabels = [];
    let labelDate = settings.startDate;
    // console.log(labelDate);
    for(let i = 0; i < settings.dayNum; i++) {
        // console.log("No changes" + labelDate);
        

        if (i > 0) {
            const currentDate = labelDate.getDate();
            labelDate.setDate(currentDate + 1);
        }
        // console.log("i=" + i);
        // console.log(labelDate);
        
        let  dayNum = labelDate.getDate();
        let  dayString = days[labelDate.getDay()];
        // console.log("Day Num: " + dayNum);
        // console.log("DayString: " + dayString);

       dayLabels[i] = <DayLabel key = {"dl" + i} day = {i}>

            <DayH>{dayString}</DayH>
            <DayH>{dayNum}</DayH>
            </DayLabel>
    }  
    return(
        
        <ScheduleContainer settings={settings} num={3}> 
           
           
            {dayLabels}
            {hourLabels}
            {hours}
            {testDataDates.events.map(listing => {
                return <Event key = {listing.name + listing.startTime.getTime() + listing.endTime.getTime() + listing.startCol} details = {listing}/>;
            })}
        </ScheduleContainer>
    );
}

export default Schedule;


const ScheduleContainer = styled.div`
    display: grid;
    grid-template-columns: 50px repeat(calc(12 * ${(props) => props.settings.dayNum}), 16px);
    grid-template-rows: 80px repeat(${(props) => props.settings.hourNum * 4}, 10px);

  
`;

const Hour = styled.div`

    grid-column-start: ${(props) => props.day * 12 + 2};
    grid-column-end: span 12;
    grid-row-start: ${(props) => props.hour *4 + 2};
    grid-row-end: span 4;

    outline: 1px solid gray;
    margin-top: 1px;
    margin-left: 1px;

`

const HourLabel = styled.div`

    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: ${(props) => props.hour *4 + 2};
    grid-row-end: span 4;

    
    display: flex;
    justify-content: center;
    align-items: center;

    background: 
    linear-gradient(grey, grey) top right / 50% 1px ;
    background-repeat:no-repeat;

`;

const DayLabel = styled.div`

    grid-column-start: ${(props) => props.day * 12 + 2};
    grid-column-end: span 12;
    grid-row-start: 1;
    grid-row-end: span 1;

    

    background: 
    linear-gradient(grey, grey)  bottom left / 1px 50% ;
   background-repeat:no-repeat;

   display: flex;
   flex-direction: column;
  justify-content: space-evenly;
   align-items: center;

 
`

const DayH = styled.h3`

    margin: 0;
`;
import styled from "styled-components";
import axios from 'axios';
import { useEffect, useState } from "react";


import Event from "./Event";

function Schedule(props) {
    //Note! Date is incrementing by 4 days for some reason. 


    let {settings} = props;
    // console.log("Settings Schedule date: ", settings.startDate.getDate());
    // console.log("Settings: ", settings);


    const [eventsList, setEventsList] = useState([]);

    const url = 'http://localhost:3001/events';

  useEffect(() => {
    getEvents();
    

  }, []);

  //!Why this does't work feels worth figuring out for later
//   useEffect(() => {
//       console.log(eventsList);
//   }, eventsList);


//I don't think this will work so ignoring it for now
  function defunctOrganizeEvents(rawEvents, targetDate) {

    //! Need to create a "clean" version of array. One without col info
    let cleanEvents = [];
    rawEvents.forEach(event => {
        let newEvent = {...event, start_col: 0, span: 0};
        cleanEvents.push(newEvent);
    })

    //Assume they have already been selected for correct day
    let dayNum = dateDiff(settings.startDate, targetDate);
    let colOffset = 2;
    let baseColumn = dayNum * 12 + colOffset;
    const targetCopy = new Date(targetDate);
    //May not be necessary
    targetCopy.setMinutes(0);
    targetCopy.setHours(0);
    let hoursArray = [];
    //Create a date for each hour of the day
    for (let i = 0; i < settings.hourNum; i++) {
        let hour = new Date(targetCopy);
        hour.setHours(settings.startHour + i);
        hoursArray.push(hour);
    }
    // console.log(hoursArray);
    
    //Since on hour mark, I'll say it intersects at start of hour, but not at end
    for(let i = 0; i < hoursArray.length; i++) {
        let intersects = [];

        cleanEvents.forEach(event => {
            //This works but creates a problem. Food trucks and talk both intersect merchants without intersecting each other
        //Creating a false (3). So I think it makes sense to check at moments and not ranges?
            // let hoursPlus = new Date(hoursArray[i]);
            // hoursPlus.setHours(hoursPlus.getHours() +1);
            // if(event.start_time < hoursPlus && event.end_time > hoursArray[i]) {
            //     intersects.push(event);
            // } 

            if(event.start_time <= hoursArray[i] && event.end_time > hoursArray[i]) {
                intersects.push(event);
                //! Wait, I need to include the index and not the actual event
                //Or something
            }
            
        })
        // console.log("For hour :", hoursArray[i].getHours());
        // console.log("Intersects are", intersects);
        let numInt = intersects.length;
        for(let j = 0; j < numInt; j++) {
            if(intersects.length == 1) {

            }
        }
    }

  }

  function checkIntersect(event1, event2) {
      let maxStart = max(event1.start_time, event2.start_time);
      let minEnd = min(event1.end_time, event2.end_time);

      if(maxStart <= minEnd) {
          return true;
      } else {
          return false;
      }
  }

  function max(date1, date2) {
    if(date1 > date2) {
        return date1;
    } else {
        return date2;
    }
  }

  function min(date1, date2) {
    if(date1 < date2) {
        return date1;
    } else {
        return date2;
    }
  }


  //Note! Currently thinks foodTrucks and talk intersect. 
  //They probably technically do, on the last minute.
  //So I should get it to not count things that start and end at the exact same time as intersecting
  
  function organizeEvents(rawEvents, targetDate) {
    let dayNum = dateDiff(settings.startDate, targetDate);
    let colOffset = 2;
    let baseColumn = dayNum * 12 + colOffset;

    let cleanEvents = [];
    rawEvents.forEach(event => {
        let newEvent = {...event, start_col: 0, span: 0};
        cleanEvents.push(newEvent);
    });

    let addedEvents = [];

    for(let i = 0; i < cleanEvents.length; i++) {
        
        let intIndex = [];
        for(let j = 0; j < addedEvents.length; j++) {
            if(checkIntersect(cleanEvents[i], addedEvents[j])) {
                intIndex.push(j);
            }
        }
        
        //Verified the if works
        if(intIndex.length === 0) {
            cleanEvents[i].span = 12;
            cleanEvents[i].start_col = baseColumn;
            addedEvents.push(cleanEvents[i]);
        } else {
            let defaultSpan = 12/(intIndex.length +1);
            for(let j = 0; j < intIndex.length ; j++) {
                let addedIndex = intIndex[j];
                let intEvent = addedEvents[addedIndex];

                //This is where it starts to get iffy
                //Later will need to come back and add case for when events > 4
                

                //Just going to pretend that the latest col-position is always best first

                //Possibly I'm editing a copy here
                //Makes the span smaller, but not larger
                if(!(intEvent.span > 0 && intEvent.span < defaultSpan)) {
                    intEvent.span = defaultSpan;
                }

                //This will need editing, currently it assumes last is right
                //Using j here just so they all end up in a different place
                intEvent.start_col = baseColumn + j * defaultSpan;

            }
            //Now place the current event
            cleanEvents[i].span = defaultSpan;
            cleanEvents[i].start_col = baseColumn + intIndex.length * defaultSpan;
            addedEvents.push(cleanEvents[i]);
        }
    }
    // console.log(addedEvents);
    return addedEvents;
  }

  function dateDiff(first, second) {
    let firstCopy = new Date(first);
    let secondCopy = new Date(second);

    firstCopy.setMinutes(0);
    firstCopy.setHours(0);
    secondCopy.setMinutes(0);
    secondCopy.setHours(0);


    return Math.round((secondCopy-firstCopy)/(1000*60*60*24));
}

  function getEventsOnDay(rawEvents, targetDate) {
      let month = targetDate.getMonth();
      let date = targetDate.getDate();
    

      let eventsOnDay = [];

      rawEvents.forEach(event => {
        //   console.log(event.start_time.getMonth());

          if(event.start_time.getMonth() === month && event.start_time.getDate() === date) {
          
              eventsOnDay.push(event);
          }
      })

      return eventsOnDay;
  }
  
  const convertToDate = (rawEvents) => {
      let postEvents = [];

      rawEvents.forEach(event => {
        //   console.log(event);
          let newEvent = {...event};
            
            newEvent.start_time = new Date(event.start_time);
            newEvent.end_time = new Date(event.end_time);
            // console.log(newEvent);
            postEvents.push(newEvent);
      })
      return postEvents;
  }

  const getEvents = () => {
    axios.get(url)
    .then((response => {
        let editedData = convertToDate(response.data)
    
      setEventsList(convertToDate(response.data));
        
      //Do experiments with single day stuff here
      
        let onDay = getEventsOnDay(editedData, new Date(2021, 4, 8));
        // console.log(onDay);
        let organized = organizeEvents(onDay, new Date(2021, 4, 8));
        // console.log(organized);

        //Temporarily, just to see it.
        setEventsList(organized);
        
    }))
    .catch(error => console.error(`Error: ${error}`))
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

    
    let hours = [];

   
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

    
    
    let labelDate = new Date(settings.startDate.getTime());
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
            {/* {testDataDates.events.map(listing => {
                return <Event key = {listing.name + listing.startTime.getTime() + listing.endTime.getTime() + listing.startCol} details = {listing}/>;
            })} */}
             {eventsList.map(listing => { 
                    return <Event key = {listing.id} details = {listing}/>;
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
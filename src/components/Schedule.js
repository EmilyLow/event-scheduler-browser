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
    testMethod();
    

  }, []);

  //!Why this does't work feels worth figuring out for later
//   useEffect(() => {
//       console.log(eventsList);
//   }, eventsList);

 let testData8 = [{
    "id": 100,
    "event_name": "Open Panel",
    "speaker": "",
    "summary": "",
    "location": "Conference Room E",
    "start_time": "2021-05-08 22:00:00.000Z",
    "end_time": "2021-05-08 23:30:00.000Z",
    "start_col": 14,
    "span": 8,
    "color": "#B0E5B2"
  },
  {
    "id": 99,
    "event_name": "Talk E",
    "speaker": "Dr. Nicholas Carson",
    "summary": "Etiam ut consequat orci.",
    "location": "Conference Room A",
    "start_time": "2021-05-08 21:00:00.000Z",
    "end_time": "2021-05-08 23:00:00.000Z",
    "start_col": 22,
    "span": 4,
    "color": "#ffec6e"
  },
  {
    "id": 97,
    "event_name": "Talk C",
    "speaker": "Dr. Nathaniel Riley",
    "summary": "",
    "location": "Conference Room D",
    "start_time": "2021-05-08 20:00:00.000Z",
    "end_time": "2021-05-08 22:00:00.000Z",
    "start_col": 14,
    "span": 4,
    "color": "#ffec6e"
  },
  {
    "id": 98,
    "event_name": "Talk D",
    "speaker": "Dr. Daniel Parsons ",
    "summary": "",
    "location": "Conference Room C",
    "start_time": "2021-05-08 20:00:00.000Z",
    "end_time": "2021-05-08 22:00:00.000Z",
    "start_col": 18,
    "span": 4,
    "color": "#ffec6e"
  }];

  function testMethod() {
      console.log("Test Method");

    let objects = [ {
        "id": 49,
        "event_name": "Opening Ceremony",
        "speaker": "Eric Delgado",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "location": "Lobby",
        "start_time": "2021-05-07 22:30:00.000Z",
        "end_time": "2021-05-08 00:00:00.000Z",
        "start_col": 2,
        "span": 12,
        "color": "#A3F8A3"
      },
      {
        "id": 50,
        "event_name": "Meet and Greet",
        "speaker": "Lila Tucker",
        "summary": "Sed vulputate fermentum tellus viverra placerat. Donec vulputate tortor justo, ut congue urna pharetra vel.",
        "location": "Conference Room A",
        "start_time": "2021-05-08 00:00:00.000Z",
        "end_time": "2021-05-08 02:00:00.000Z",
        "start_col": 2,
        "span": 6,
        "color": "#A8EBF3"
      },
      {
        "id": 51,
        "event_name": "VIP Salon",
        "speaker": "Lynn Lambert",
        "summary": "Sed sit amet tempus libero.",
        "location": "",
        "start_time": "2021-05-08 00:00:00.000Z",
        "end_time": "2021-05-08 02:00:00.000Z",
        "start_col": 8,
        "span": 6,
        "color": "#F3B0A8"
      }];

    let objects2 = convertToDate(objects);
    // console.log(object2);

    //Error
    let result = checkPhysicalInt(objects2[2], objects2[1]);
    //   console.log(result);

    // let timeResult = checkTimeInt(objects2[2], objects2[1]);
    // console.log(timeResult);
  }
  //This checks for an intersection in grid placement.
  
  function checkPhysicalInt(event1, event2) {
    let error = false;
    //Error check
    if(event1.start_col === 0 || event2.start_col === 0 || event1.span === 0 || event2.span === 0) {
        console.log("Error! Undefined physical placement");
    }

    if(event1.event_name === "Talk D" && event2.event_name === "Talk E") {
        error = true;
    };




    if(checkTimeInt(event1, event2) === false) {
        return false;
    } else {
        //Verified these give correct end values
        let end_col1 = event1.start_col + event1.span - 0.1;
        let end_col2 = event2.start_col + event2.span - 0.1;

        let maxStart = max(event1.start_col, event2.start_col);
        let minEnd = min(end_col1, end_col2);

        if(maxStart <= minEnd) {
            // if(error) console.log("true");
            return true;
        } else {
            // if(error) console.log("false");
            return false;
        }
    }
  }

  //This checks for an intersection in time, aka vertical overlap
  function checkTimeInt(event1, event2) {
      let maxStart = max(event1.start_time, event2.start_time);

     let end1Copy = new Date(event1.end_time);
     let end2Copy = new Date(event2.end_time);
      //Bumping back by one minute in calculations, to prevent intersections when things start and end in same hour
      //Converted to new Date for readability when logging
      let altEnd1 = new Date(end1Copy.setMinutes(end1Copy.getMinutes() -1));
      let altEnd2 = new Date(end2Copy.setMinutes(end2Copy.getMinutes() -1));

      let minEnd = min(altEnd1, altEnd2);

      

      if(maxStart <= minEnd) {
          return true;
      } else {
          return false;
      }
  }

  function max(value1, value2) {
    if(value1 > value2) {
        return value1;
    } else {
        return value2;
    }
  }

  function min(value1, value2) {
    if(value1 < value2) {
        return value1;
    } else {
        return value2;
    }
  }


  //Note! Currently only works if < 5 events. Need to add case for > 5 intersections. 
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
    //    console.log(cleanEvents[0]);

    for(let i = 0; i < cleanEvents.length; i++) {
       

        let intIndex = [];
        for(let j = 0; j < addedEvents.length; j++) {
            if(checkTimeInt(cleanEvents[i], addedEvents[j])) {
                intIndex.push(j);
            }
        }
     
        // console.log(intIndex);
       
        
        //Length of intIndex is the number of intersections
        if(intIndex.length === 0) {
            cleanEvents[i].span = 12;
            cleanEvents[i].start_col = baseColumn;
            addedEvents.push(cleanEvents[i]);
        } else {
            let defaultSpan = 12/(intIndex.length +1);
             //Add new event to addedEvents, and add it's index to the list of intersections
             //Once the current event is added, it is now one of the intersecting events
             addedEvents.push(cleanEvents[i]);
             intIndex.push(addedEvents.length-1)

             //! New
             let slots = new Array(intIndex.length).fill(0);
           
            for(let j = 0; j < intIndex.length ; j++) {

               
                let addedIndex = intIndex[j];
                //Current intersecting event that is being placed
                let intEvent = addedEvents[addedIndex];


                //Makes the span smaller, but not larger
                if(!(intEvent.span > 0 && intEvent.span < defaultSpan)) {
                    intEvent.span = defaultSpan;
                }

                //This will need editing, currently it assumes last is right
                //Using j here just so they all end up in a different place
                // intEvent.start_col = baseColumn + j * defaultSpan;

                //Alt version
                
                //Check each slot
                
               //Place based on empty slots
               //Put in first empty slot in the array
               //Note, potential problme where it reaches end of "slots" without finding a valid place. Error message that?

              for(let x = 0; x < slots.length; x++) {
                  if(slots[x] === 0) {
                      
                      let blocked = false;

                      let origCol = intEvent.start_col;
                      intEvent.start_col = baseColumn + x * defaultSpan;
                  
                      for(let y = 0; y < addedIndex; y++) {
                        if(checkPhysicalInt(addedEvents[y], intEvent)) {
                           blocked = true;
                        }
                    }
                    
                    if (!blocked) {
                        
                        //Place event here
                        //Set columns
                        
                        //Set slot to full
                        slots[x] = 1;

                        //break
                        break;
                        
                    } else if (x === slots.length -1) {
                        console.log("Error, found no open slot");
                        console.log("Erorr on: ", intEvent);
                        intEvent.start_col = origCol;
                    } else {
                        intEvent.start_col = origCol;
                    }
                    

                  }
              }
            

            }
         
        }
    }
    console.log(addedEvents);
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

         //!Temporarily removed while messing with algo
    //   setEventsList(convertToDate(response.data));
    
        let editedData = convertToDate(response.data)

        //Using testData to debug
       let editedData2 = convertToDate(testData8);
    
       
        
      //Do experiments with single day stuff here
      
        let onDay = getEventsOnDay(editedData, new Date(2021, 4, 7));
        // console.log(onDay);
        let organized = organizeEvents(onDay, new Date(2021, 4, 7));
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
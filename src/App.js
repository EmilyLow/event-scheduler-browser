import {useState, useEffect} from "react";
import axios from 'axios';
import styled from "styled-components";

import Schedule from "./components/Schedule";
import InputForm from "./components/InputForm";
import SettingsForm from "./components/SettingsForm";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import presetEvents from "./presetEvents";

/*
  Note:
  Stringify and parse turn a date object into a string when parsed back. This is not new.

*/

function App() {
  
  const [settings, setSettings] = useState({ 
    dayNum: 3,
    hourNum: 13,
    startHour: 9,
    startDate: new Date(2021, 4, 7)
  });
 
  const [eventsList, setEventsList] = useState([]);


  // const url = 'http://localhost:3001';

  // const url = 'https://event-scheduler-backend-el.herokuapp.com';

  useEffect(() => {

    //TODO: Add reset button
    if(localStorage.events === undefined || localStorage.events === JSON.stringify([])) {
      localStorage.setItem("events", JSON.stringify(presetEvents));
    }

    if(localStorage.settings === undefined) {
      localStorage.setItem("settings", JSON.stringify(settings));
    }


    getEvents();
    getSettings();

  }, []);

 
  useEffect(() => {
    triggerSettingsReorder();
  }, [settings]);


 const getSettings = () => {
 
    
     let stored = JSON.parse(localStorage.settings);


    let newSettings = {...stored, startDate: new Date(stored.startDate)};

  
     setSettings(newSettings);

 }

 //TODO: Test update and look at newSettings input
 const updateSettings =  (newSettings) => {

 
  let id = newSettings.id;

  let renamed = {
    id: id,
    day_number: newSettings.dayNum,
    hour_number: newSettings.hourNum,
    start_hour: newSettings.startHour,

    start_date: newSettings.startDate
  }

    
     setSettings(renamed);
     localStorage.setItem("settings", JSON.stringify(renamed));


 };

 //Here
const getEvents = () => {
  
  let data = JSON.parse(localStorage.events);
  // console.log(data);

  // let converted = convertToDate(data);

  // console.log("Converted", converted);

   setEventsList(convertToDate(data));
      
  
}

//  const getWithoutUpdate = /* async */ () => {

//   //?? await
//   // let results = await JSON.parse(localStorage.events);
//    let results = JSON.parse(localStorage.events);


//    return results;
//  }

 const deleteWithoutUpdate = async (event) => {
  let id = event.id;

  let currentEvents = JSON.parse(localStorage.events);

  for(let i = 0; i < currentEvents.length; i++) {
    if(currentEvents[i].id === id) {
      currentEvents.splice(i, 1);
      break;
    }
  }

  
  localStorage.events = JSON.stringify(currentEvents);

 }

 //TODO: Do I need this with local storage?
 //This creates a promise to update the event, and does not actually update it directly. 
//  const updateEvent = (event) => {
//    let id = event.id;
   

//   return axios.put(url + "/events/" + id, event)
//    .then((response) => {

//    })
//    .catch(error => console.error(`Error: ${error}`))
//  }

 const deleteEvent = (event) => {

   let id = event.id;

   let currentEvents = JSON.parse(localStorage.events);

   for(let i = 0; i < currentEvents.length; i++) {
     if(currentEvents[i].id === id) {
       Array.splice(i, 1);
       break;
     }
   }
 
   //TODO The order for this is wrong maybe? Depend on how reorder works with local storage
   localStorage.events = JSON.stringify(currentEvents);
  
    triggerDeleteReorder(event);
   
 }


 const  addEvent = (event) => {
 
  let currentEvents = JSON.parse(localStorage.events);

  let formEvent = {
    event_name: event.title,

    speaker: event.speaker,
    summary: event.description,
    location: event.location,
    start_time: event.start_time,
    end_time: event.end_time,
    color: getRandomColor()
  };

  let newEvents = [...currentEvents, formEvent];

  localStorage.events = JSON.stringify(newEvents);

  //Feeding it the right thing?
  triggerReorder(newEvents);
  
}


  
   function  triggerReorder(newEvent) {
   

    let formNewEvent = convertToDate([newEvent])[0];
    let appEvents = convertToDate(localStorage.events);
    
    let onDay = getEventsOnDay(appEvents, formNewEvent.start_time);
    let organized = organizeEvents(onDay);


    localStorage.events = JSON.stringify(organized);


    setEventsList(organized);

  }

  async function triggerSettingsReorder() {



      let winnowedList = await checkAndDeleteEvents(eventsList);

      let organized = reorganizeAll(winnowedList);

     
 
      localStorage.events = JSON.stringify(organized);


      setEventsList(organized);

    

  }

  //Checks and deletes dates that are out of bounds
  async function checkAndDeleteEvents(initList) {


    let finalList = []
    
    for(let i = 0; i < initList.length; i++) {
        let cEvent = initList[i];

        if(checkInBounds(cEvent)) {
          finalList.push(cEvent);
        } else {
          await deleteWithoutUpdate(cEvent);

        }


    }

    return finalList;

  }

  

  //Reorganizes all dates
  function reorganizeAll(unorganizedList) {
    let startDate = new Date(settings.startDate);
    let allEvents = [];
    for(let i = 0; i <settings.dayNum; i++) {
      let currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      let eventSubset = getEventsOnDay(unorganizedList, currentDate);
      let organizedSubset = organizeEvents(eventSubset);

      allEvents = [...allEvents, ...organizedSubset];
    }

    return allEvents;
  }


  function checkInBounds(event) {



    let startTime = event.start_time.getHours() + (event.start_time.getMinutes() / 60);
    let endTime = event.end_time.getHours() + (event.end_time.getMinutes() / 60);

    let scheduledStart = settings.startHour;

    let scheduledEnd = settings.startHour + settings.hourNum;


    //Checks if the hours of the day are in bounds
    if(startTime < scheduledStart || endTime < scheduledStart) {
      return false;
    } else if (startTime > scheduledEnd || endTime > scheduledEnd) {
      return false; 
    }


  let startDate = new Date(event.start_time);
  let endDate = new Date(event.end_time);

  let scheduleStartDay = new Date(settings.startDate);
  scheduleStartDay.setHours(0);
  scheduleStartDay.setMinutes(0);

  let scheduleEndDay = new Date(scheduleStartDay);
  //This is 0 AM on the day after
  scheduleEndDay.setDate(scheduleStartDay.getDate() + settings.dayNum);


  
    if(startDate < scheduleStartDay || endDate < scheduleStartDay) {
      console.log(startDate);
      console.log(scheduleStartDay);
      console.log("False 3");
      return false;
    } else if(startDate > scheduleEndDay || endDate > scheduleEndDay) {

      return false;
    }


    return true;
  }

  async function triggerDeleteReorder(deletedEvent) {
    
    let remainingEvents = JSON.parse(localStorage.events);

    let formRemainingEvents = convertToDate(remainingEvents);
    
    let remainingOnDay = getEventsOnDay(formRemainingEvents, deletedEvent.start_time);

    let organized = organizeEvents(remainingOnDay);


    setEventsList(organized);
   
    localStorage.events = JSON.parse(organized);
  }




const convertToDate = (rawEvents) => {
  let postEvents = [];

  rawEvents.forEach(event => {

      let newEvent = {...event};
        

        newEvent.start_time = new Date(event.start_time);
        newEvent.end_time = new Date(event.end_time);
  
        postEvents.push(newEvent);
  })
  return postEvents;
}

  //Note, assumes all events are on a single day
  function organizeEvents(rawEvents) {

    if(rawEvents.length === 0) {
      return [];
    }


   
    let dayNum = dateDiff(settings.startDate, rawEvents[0].start_time);

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
            if(checkTimeInt(cleanEvents[i], addedEvents[j])) {
                intIndex.push(j);
            }
        }
     
       
        
        //Length of intIndex is the number of intersections
        if(intIndex.length === 0) {
            cleanEvents[i].span = 12;
            cleanEvents[i].start_col = baseColumn;
            addedEvents.push(cleanEvents[i]);
        } else {
            let defaultSpan;
            if(intIndex.length < 4) {
              defaultSpan = 12/(intIndex.length +1);
            } else if (intIndex.length < 6) {
              defaultSpan = 2;
            } else if (intIndex.length < 12) {
              defaultSpan = 1;
            } else {
              defaultSpan = 0;
              console.log("Error: No more than twelve events can intersect.");
            }
            

             //Add new event to addedEvents, and add it's index to the list of intersections
             //Once the current event is added, it is now one of the intersecting events
             addedEvents.push(cleanEvents[i]);
             intIndex.push(addedEvents.length-1)

  
             let slots = new Array(intIndex.length).fill(0);
           
             for(let j = 0; j < intIndex.length ; j++) {

               
                let addedIndex = intIndex[j];
                //Current intersecting event that is being placed
                let intEvent = addedEvents[addedIndex];


                //Makes the span smaller, but not larger
                if(!(intEvent.span > 0 && intEvent.span < defaultSpan)) {
                    intEvent.span = defaultSpan;
                }


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
                        //Set slot to full
                        slots[x] = 1;

                        break;
                        
                    } else if (x === slots.length -1) {
                        console.log("Error, found no open slot");
                     
                        intEvent.start_col = origCol;
                    } else {
                        intEvent.start_col = origCol;
                    }

                  }
              }
            }
         
        }
    }
    return addedEvents;
  }

  //This checks for an intersection in grid placement. 
  function checkPhysicalInt(event1, event2) {

    //Error check
    if(event1.start_col === 0 || event2.start_col === 0 || event1.span === 0 || event2.span === 0) {
        console.log("Error! Undefined physical placement");
    }

    if(checkTimeInt(event1, event2) === false) {
        return false;
    } else {
        //Subtracted by 0.1 so shared boundaries don't count as intersection.
        let end_col1 = event1.start_col + event1.span - 0.1;
        let end_col2 = event2.start_col + event2.span - 0.1;

        let maxStart = max(event1.start_col, event2.start_col);
        let minEnd = min(end_col1, end_col2);

        if(maxStart <= minEnd) {
            return true;
        } else {
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


 //Currently a promise
  let eventsOnDay = [];

  rawEvents.forEach(event => {
   

      if(event.start_time.getMonth() === month && event.start_time.getDate() === date) {
      
          eventsOnDay.push(event);
      }
  })

  return eventsOnDay;
}

 function getRandomColor() {
  //  let colors = ["#ffb3ba", //pink
  //  "#ffdfba", //orange-peach
  //  "#ffffba", //yellow
  //  "#baffc9", //light green
  //  "#bae1ff" ]; //blue

   let colors = [
    "#A3F8A3", //darker green
    "#A8EBF3", //blue
    "#F3B0A8", //darker pink
    "#ffec6e", //yellow
    "#ffdfba", //orange-peach



   ];

   let num = Math.floor(Math.random() * colors.length);

   return colors[num];
 }

 //Tab formatting code
 const [value, setValue] = useState(0);

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };

  return (
    <LayoutDiv>
      <ScheduleDiv>
        <StyledH1>Event Scheduler</StyledH1>
        <Schedule settings = {settings} eventsList = {eventsList} deleteEvent={deleteEvent}/>
      </ScheduleDiv>
      {/* <FormDiv>
        <SettingsForm settings = {settings} updateSettings = {updateSettings} />
        <InputForm addEvent = {addEvent} settings={settings}/>
      </FormDiv> */}
      
        <FormDiv >
            <Tabs value = {value} onChange={handleChange} indicatorColor={"primary"} textColor="primary">

              <Tab label="Events"/>
                
              
              <Tab label="Settings"/>
              
              
            </Tabs>
            <TabPanel value={value} index={0}>
              <InputForm addEvent = {addEvent} settings={settings}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SettingsForm settings = {settings} updateSettings = {updateSettings} />
            </TabPanel>
          </FormDiv>
  
      
         
        
        
     
      
    </LayoutDiv>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
     
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
    
    >
      {value === index && (
        <Box >
          
          {children}
        </Box>
      )}
    </div>
  );
}

export default App;

const StyledH1 = styled.h1`
  margin-bottom: 30px;

`;

const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
`;

const FormDiv = styled.div`
  margin-left: 80px;

  margin-top: 120px;
`;

const FormDivDiv = styled.div`
 

`;

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: row;


`;
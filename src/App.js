import {useState, useEffect} from "react";
import axios from 'axios';
import styled from "styled-components";

import Schedule from "./components/Schedule";
import InputForm from "./components/InputForm";
import SettingsForm from "./components/SettingsForm";


function App() {
  
  const [settings, setSettings] = useState({ 
    dayNum: 3,
    hourNum: 13,
    startHour: 9,
    startDate: new Date(2021, 6, 7)
  });
 
  const [eventsList, setEventsList] = useState([]);


  const url = 'http://localhost:3001';

  useEffect(() => {
    getEvents();
    getSettings();

  }, []);

//!Why this does't work feels worth figuring out for later
//   useEffect(() => {
//       console.log(eventsList);
//   }, eventsList);

 const getSettings = () => {
   axios.get(url + "/settings")
   .then((response => {
    
     //Note, not sure what to do about settings id, if it's best to always use 1
     let newSettings = {
      id: response.data[0].id,
      dayNum: response.data[0].day_number,
      hourNum: response.data[0].hour_number,
      startHour: response.data[0].start_hour,
      startDate: new Date(response.data[0].start_date)
     }
    
     setSettings(newSettings);
   
   }))
   .catch(error => console.error(`Error: ${error}`))
 }

 const updateSettings = (newSettings) => {
 
  let id = newSettings.id;

  let renamed = {
    id: id,
    day_number: newSettings.dayNum,
    hour_number: newSettings.hourNum,
    start_hour: newSettings.startHour,
    //I think this does it automatically
    start_date: newSettings.startDate
  }

  axios.put(url + "/settings/" + id, renamed)
  .then((response) => {

    //Maybe not best practice
    setSettings(newSettings);

  })
  .catch(error => console.error(`Error: ${error}`))

 };

const getEvents = () => {
  
  axios.get(url + "/events")
  .then((response => {

    setEventsList(convertToDate(response.data));
      
  }))
  .catch(error => console.error(`Error: ${error}`))
}

 const getWithoutUpdate = async () => {
  //  console.log("Get Without Update Called");
   let results;

   await axios.get(url + "/events")
   .then((response) => {
    // console.log("Get Without Update Then");
    results = response.data;
   })
   .catch(error => console.error(`Error: ${error}`))

   return results;
 }

 //This creates a promise to update the event, and does not actually update it directly. 
 const updateEvent = (event) => {
   let id = event.id;
   

  return axios.put(url + "/events/" + id, event)
   .then((response) => {
    // console.log("Update");
    // console.log(response)
   })
   .catch(error => console.error(`Error: ${error}`))
 }

 const deleteEvent = (event) => {
  //  console.log("Delete", event);
   let id = event.id;

   axios.delete(url + "/events/" + id)
   .then((response) => {
    triggerDeleteReorder(event);
   })
   .catch(error => console.error(`Error: ${error}`))
 }


 const  addEvent = (event) => {
 

  let formEvent = {
    event_name: event.title,

    speaker: event.speaker,
    summary: event.description,
    location: event.location,
    start_time: event.start_time,
    end_time: event.end_time,
    color: getRandomColor()
  };

  axios.post(url + "/events", formEvent)
  .then((response => {
    
    triggerReorder(response.data);
  }))
  .catch(error => console.error(`Error: ${error}`))
}


  
   function  triggerReorder(newEvent) {
   

    let formNewEvent = convertToDate([newEvent])[0];
    let appEvents = [...eventsList, formNewEvent];
 
    let onDay = getEventsOnDay(appEvents, formNewEvent.start_time);
    let organized = organizeEvents(onDay);

    let promiseArray = [...organized];
  

    let  promises = organized.map(async event => {
 
      return await updateEvent(event);;
    })

    Promise.all(promises)
    .then(() => {
      getEvents();
    })

  }

  async function triggerDeleteReorder(deletedEvent) {
    
    let remainingEvents =  await getWithoutUpdate();
    let formRemainingEvents = convertToDate(remainingEvents);
    
    let remainingOnDay = getEventsOnDay(formRemainingEvents, deletedEvent.start_time);

    let organized = organizeEvents(remainingOnDay);

    let promises = organized.map(async event => {
      return await updateEvent(event);
    })

    Promise.all(promises)
    .then(() => {
      getEvents();
    })
  }

  function localStringToUTCString(localString) {

    let dateObject = new Date(localString);
    let utcString = dateObject.toISOString();

    return utcString;
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

  //TODO: Currently only works if < 5 events. Need to add case for > 5 intersections. 
  function organizeEvents(rawEvents) {

   //ToDO: Edit this so its based off listed startDate. But it should be? Hm
   //Answer: The column is static. So if calendar start date adjusts, events will be based off their previous placement. 
   //So solution is actually to "organize events" after a settings change
    let dayNum = dateDiff(settings.startDate, rawEvents[0].start_time);
    // console.log("Day num", dayNum);
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
                        // console.log("Erorr on: ", intEvent);
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


  let eventsOnDay = [];

  rawEvents.forEach(event => {
   

      if(event.start_time.getMonth() === month && event.start_time.getDate() === date) {
      
          eventsOnDay.push(event);
      }
  })

  return eventsOnDay;
}

 function getRandomColor() {
   let colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff" ];

   let num = Math.floor(Math.random() * colors.length);

   return colors[num];
 }


  return (
    <LayoutDiv>
      <ScheduleDiv>
        <StyledH1>Convention Schedule</StyledH1>
        <Schedule settings = {settings} eventsList = {eventsList} deleteEvent={deleteEvent}/>
      </ScheduleDiv>
      <FormDiv>
        <SettingsForm settings = {settings} updateSettings = {updateSettings} />
        <InputForm addEvent = {addEvent} settings={settings}/>
      </FormDiv>
      
    </LayoutDiv>
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
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: row;


`;
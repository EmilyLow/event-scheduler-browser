import styled from "styled-components";

import Schedule from "./components/Schedule";

import axios from 'axios';
import { useEffect } from "react";

function App() {
  const url = 'http://localhost:3001/events'

  useEffect(() => {
    getEvents();
  }, []);
  

  const getEvents = () => {
    axios.get(url)
    .then((response => {
      console.log(response.data);
    }))
    .catch(error => console.error(`Error: ${error}`))
  }



  return (
    <ScheduleDiv>
        <StyledH1>Convention Schedule</StyledH1>
        <Schedule/>
      
      
    </ScheduleDiv>
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
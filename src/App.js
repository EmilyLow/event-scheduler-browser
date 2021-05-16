import {useState} from "react";

import styled from "styled-components";

import Schedule from "./components/Schedule";
import InputForm from "./components/InputForm";
import SettingsForm from "./components/SettingsForm";


function App() {
  
  const [settings, setSettings] = useState({ 
    dayNum: 3,
    hourNum: 13,
    startHour: 9,
    startDate: new Date(2021, 4, 7)
  });
 
  console.log("App settings", settings);



  return (
    <LayoutDiv>
      <ScheduleDiv>
        <StyledH1>Convention Schedule</StyledH1>
        <Schedule settings = {settings}/>
      </ScheduleDiv>
      <FormDiv>
        <SettingsForm setSettings={setSettings}/>
        <InputForm/>
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
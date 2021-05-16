import styled from "styled-components";

import Schedule from "./components/Schedule";
import InputForm from "./components/InputForm";
import SettingsForm from "./components/SettingsForm";


function App() {
  



  return (
    <LayoutDiv>
      <ScheduleDiv>
        <StyledH1>Convention Schedule</StyledH1>
        <Schedule/>
      </ScheduleDiv>
      <FormDiv>
        <SettingsForm/>
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
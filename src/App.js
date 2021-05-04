import styled from "styled-components";

import Schedule from "./components/Schedule";

function App() {
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
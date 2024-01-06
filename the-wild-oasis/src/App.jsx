import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';

import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellowgreen;
`;

const StyledApp = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello</H1>

        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Check out')}>Check out</Button>

        <Input type='number' placeholder='Number of guests' />
      </StyledApp>
    </>
  );
}

export default App;

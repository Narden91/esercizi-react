import React, {useState} from 'react';
import {Hello} from "./components/Hello";
import {UserPage} from "./components/UserPage/UserPage";
import {ActiveView} from "./interfaces";
import {Navbar, Nav, Container} from 'react-bootstrap';


export const cssLayoutCommon: React.CSSProperties = {
  padding: '.2rem',
  backgroundColor: "burlywood"
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.HELLO_PAGE);

  const onClickView = (idView: ActiveView) => {
    setActiveView(idView);
  };

  return (

      <>
      <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand> Exercises </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => onClickView(ActiveView.HELLO_PAGE)}> Exercise 1 </Nav.Link>
              <Nav.Link onClick={() => onClickView(ActiveView.USER_PAGE)}> Exercise 2 and Exercise 3 </Nav.Link>
            </Nav>
          </Container>
      </Navbar>

      {activeView === ActiveView.HELLO_PAGE && <Hello />}
      {activeView === ActiveView.USER_PAGE  && <UserPage />}
      </>

      

  );
};

export default App;

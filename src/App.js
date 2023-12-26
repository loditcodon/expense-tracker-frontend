import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import bg from './img/bg.png'
import AuthService from "./services/auth.service";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgotpassword from "./components/Auth/Forgotpassword";

import {MainLayout} from './styles/Layouts'
import Orb from './components/Orb/Orb'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income'
import Expenses from './components/Expenses/Expenses';
import Userinfo from './components/Profile/Userinfo';
import Expenseslimit from './components/Expenseslimit/Expenseslimit';
import Statistical from './components/Statistical/Statistical';
import { useGlobalContext } from './context/globalContext';
import AccountBox from "./components/Auth/index"
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import "./styles.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const global = useGlobalContext();
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [navigate, location.pathname]);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4: 
        return <Expenses />;
      case 5: 
        return <Expenseslimit />;
      case 6: 
        return <Statistical />;
      case 7: 
        return <Userinfo />;
      default: 
        return <Dashboard />;
    }
  }
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      {currentUser ? (
        <React.StrictMode>
          <GlobalStyle />
          <GlobalProvider>
            <AppStyled bg={bg} className="App">
              {orbMemo}
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  {displayData()}
                </main>
              </MainLayout>
            </AppStyled>
          </GlobalProvider>
        </React.StrictMode>
      ) : (
        <>
          <AppContainer>
            <AccountBox />
          </AppContainer>
          
        </>
      )}
    </div>
  );
};
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;
const AppStyled = styled.div`
height: 100vh;
background-image: url(${props => props.bg});
position: relative;
main{
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 0;
  }
}
`;

export default App;

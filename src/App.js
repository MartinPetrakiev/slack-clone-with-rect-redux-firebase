import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Header from './components/Header';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import slackLogo from './img/slack_logo.png';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <img src={slackLogo} alt='' />
          <Spinner
            name='ball-spin-fade-loader'
            color='#303d4b' fadeIn='none'
          />
        </AppLoadingContainer>
      </AppLoading>
    )
  }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <Header />
              <AppBody className="body">
                <Sidebar />
                <Switch>
                  <Route path="/" exact>
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContainer = styled.div`
    text-align: center;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
          height: 100px;
          padding: 20px;
          margin-bottom: 40px;
    }

`;

const AppBody = styled.div`
    display: flex;
    height: 100vh;
    color: black
`;



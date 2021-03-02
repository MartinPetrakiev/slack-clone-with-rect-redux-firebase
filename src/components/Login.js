import { Button } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import logo from '../img/slack_logo.png';

function Login() {
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    };

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src={logo} alt=""/>
                <h1>Sign In</h1>
                <p>martins.slack.com</p>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </LoginInnerContainer>
        </LoginContainer>
    );
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    >img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }

    >button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;
    }

`;

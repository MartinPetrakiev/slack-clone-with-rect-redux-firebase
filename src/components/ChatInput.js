import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId, chatRef }) {
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);
    const sendMessage = e => {
        e.preventDefault();
        if (!channelId) {
            return alert('Please enter a channel first!');
        }

        db.collection('rooms')
            .doc(channelId)
            .collection('messages')
            .add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL
            });
        chatRef.current.scrollIntoView({
            behavior: 'smooth'
        });
        setInput('');
    };
    return (
        <ChatInputContainer>
            <form>
                <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName ? channelName : ''}`} />
                <Button type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    margin: 80px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }
    
    > form > input {
        position: fixed;  
        width: 60%;
        bottom: 10px;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 15px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`;
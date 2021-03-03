import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    );

    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    );

    chatRef?.current?.scrollIntoView({
        behavior: 'smooth'
    });
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [roomId, loading])
    return (
        <ChatContainer className="chat">
            <img src="" alt="" />
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HederLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlined />
                        </HederLeft>
                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                    </p>
                        </HeaderRight>
                    </Header>
                    <ChatMessages>
                        {roomMessages?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data();
                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        })}
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>
                    <ChatInput
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                    />
                </>
            )}

        </ChatContainer>
    );
}

export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 35px;
    ::-webkit-scrollbar {
     width: 8px;
     background-color: lightgray;
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--slack-color);
    }
`;
const Header = styled.div`
    position: fixed;
    width: 80%;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    background-color: white;
`;
const HederLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        /* text-transform: lowercase; */
        margin-right: 5px;
    }
    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;
const HeaderRight = styled.div`
    position: fixed;
    right: 20px;
    > p {
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }

`;
const ChatMessages = styled.div`
    margin-top: 5%;
    
`;
const ChatBottom = styled.div`
    margin: 100px;
`;


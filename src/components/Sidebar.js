import React from 'react';
import styled from 'styled-components';
import {
    FiberManualRecord,
    Create,
    InsertComment,
    Inbox,
    Drafts,
    BookmarkBorder,
    PeopleAlt,
    Apps,
    FileCopy,
    ExpandLess,
    ExpandMore,
    Add,
} from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Sidebar() {
    const [channels, loading, error] = useCollection(db.collection('rooms'));
    const [user] = useAuthState(auth);
    return (
        <SidebarConteriner className="sidebar">
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Slack</h2>
                    <h3>
                        <FiberManualRecord/>
                        {user?.displayName}
                    </h3>
                </SidebarInfo>
                <Create />
            </SidebarHeader>
            <SidebarOption Icon={InsertComment} title="Threads" />
            <SidebarOption Icon={Inbox} title="Mentions & reactions" />
            <SidebarOption Icon={Drafts} title="Saved" />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOption Icon={PeopleAlt} title="People & user groups" />
            <SidebarOption Icon={Apps} title="Apps" />
            <SidebarOption Icon={FileCopy} title="File browser" />
            <SidebarOption Icon={ExpandLess} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMore} title="Channels" />
            <hr />
            <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

            {channels?.docs.map((doc) =>
                <SidebarOption
                    key={doc.id}
                    id={doc.id}
                    title={doc.data().name}
                />
            )}
        </SidebarConteriner>
    )
}

export default Sidebar;

const SidebarConteriner = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #3a5470;
    max-width: 260px;
    margin-top: 60px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    display: none;  /* Remove scrollbar space */
}

    > hr {
        margin-top: 5px;
        margin-bottom: 5px;
        border: 0;
        height: 0;
        border-top: 1px solid #3a5470;
        border-bottom: 1px solid #3a5470;
    }

`;
const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #3a5470;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #3a5470;
        font-size: 18px;
        background-color: white;
        border-radius: 50%;
    }
`;
const SidebarInfo = styled.div`
    flex: 1;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    >h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }

`;

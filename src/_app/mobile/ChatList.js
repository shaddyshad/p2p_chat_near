import React, { useState } from 'react';
/**@jsx jsx */
import {jsx, css} from '@emotion/react'
import {Typography, Button, Divider } from 'antd'
// icons
import {PlusOutlined} from '@ant-design/icons'
import {
    Avatar,
    List,
    ListItemText,
    ListItemAvatar,
    ListItem
} from '@material-ui/core'
import NewThread from './components/NewThread';

const {Title} = Typography

const ChatList = ({threads, selectThread,reload}) => {
    const [draw, setDraw] = useState(false) 


    const firstChars = str => {
        // return the first chars 
        let split = str.split(" ");
        let ff = split.map(s => s[0].toUpperCase());
        let ft = ff.slice(0,2);

        return ft.join("")
    }

    const createThread = () => {
        // show the create thread drawer 
        setDraw(true)
    }


    return (
        <div css={css`
            height: 100%;
        `}>
            <div css={css`
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding-bottom: 1rem;
            `}>
                <Title level={3}>Threads</Title>
                <Button type="text" icon={<PlusOutlined />} onClick={createThread}>New Thread</Button>
            </div>

            <List>
                {
                    threads.map((thread, i) => (
                        <>
                            <ListItem key={i} button onClick={() => selectThread(thread)}>
                                <ListItemAvatar>
                                    <Avatar >{firstChars(thread)}</Avatar>

                                </ListItemAvatar>
                                <ListItemText primary={thread} />
                            </ListItem>
                            <Divider />
                        </>
                    ))
                }
            </List>

            {/* New thread  */}
            <NewThread 
                show={draw}
                close={() =>setDraw(false)}
                reload={reload}
            />
        </div>
    )
}

export default ChatList;
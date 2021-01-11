import React from 'react';
/**@jsx jsx */
import {jsx, css} from '@emotion/react'
import {Typography, Button} from 'antd'
// icons
import {PlusOutlined} from '@ant-design/icons'
import {
    Avatar,
    List,
    ListItemText,
    ListItemAvatar,
    ListItem
} from '@material-ui/core'
import {
    deepOrange,
    deepPurple,
    red
} from '@material-ui/core/colors'
import {
    makeStyles
} from '@material-ui/core/styles'

const {Title} = Typography

const useStyles = makeStyles((theme) => ({
    normal: {}
}))

const ChatList = ({threads}) => {
    const classes = useStyles()

    const firstChars = str => {
        // return the first chars 
        let split = str.split(" ");
        let ff = split.map(s => s[0].toUpperCase());

        return ff.join("")
    }

    const selectThread = (name) => {
        console.log(name)
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
                <Button type="text" icon={<PlusOutlined />}>New Thread</Button>
            </div>

            <List>
                {
                    threads.map((thread, i) => (
                        <ListItem key={i} button onClick={() => selectThread(thread)}>
                            <ListItemAvatar>
                                <Avatar >{firstChars(thread)}</Avatar>

                            </ListItemAvatar>
                            <ListItemText primary={thread} />
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default ChatList;
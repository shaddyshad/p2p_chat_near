import React from 'react' 
import {Drawer, Typography, Divider } from 'antd'
import {
    List,
    ListSubheader,
    ListItemText,
    ListItem,
    ListItemIcon
} from '@material-ui/core'

import {PlusCircleFilled} from '@ant-design/icons'

const {Title} = Typography 

const ThreadInfo = ({members, show, close, threadName}) => {
    return (
        <Drawer 
            title={threadName}
            placement="top"
            closable="false"
            onClose={close}
            visible={show}
            height="100%"
        >
            <Title level={4} type="secondary">Thread Info</Title>
            <Divider />

            <List 
                component="nav"
                aria-labelledby="member-list"
                subheader={
                    <ListSubheader>
                        <Title type="secondary" level={5}>MEMBERS</Title>
                    </ListSubheader>
                }
            >
                {
                    members.map((member, i) => (
                        <ListItem key={i}>
                            <ListItemIcon><PlusCircleFilled /></ListItemIcon>
                            <ListItemText>{`<${member}>`}</ListItemText>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    )
}

export default ThreadInfo;
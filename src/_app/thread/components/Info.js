import React from 'react' 
import {Layout, Typography, Divider} from 'antd'
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import {List, ListSubheader, ListItemText, ListItem, ListItemIcon} from '@material-ui/core'
// icons
import {PlusCircleFilled} from '@ant-design/icons'

const {Header} = Layout
const {Text, Title} = Typography 

const Info = ({members}) => {
    return (
        <div>
            <Header className="header" style={{backgroundColor: '#f0f2f5', paddingTop: '1rem'}}>
                <Title level={5}>Thread Info</Title>
            </Header>
            <Divider />

            <div css={css`
                padding: 1rem;
            `}>
                <List
                    component='nav'
                    aria-labelledby="members-list"
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
            </div>
        </div>
    )
}

export default Info 
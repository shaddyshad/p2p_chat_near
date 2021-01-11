import React, { useState } from 'react';
import 'regenerator-runtime/runtime'
import {login, logout} from '../utils'
import getConfig from '../config'
import {Button, Typography} from 'antd'
import {LoginOutlined} from '@ant-design/icons'
import {Layout, Menu, Row, Col, Divider, Input, Space} from 'antd'
import {
    SearchOutlined,
    CommentOutlined,
    PlusCircleFilled,
    PlusOutlined,
    LogoutOutlined,
    SendOutlined
} from '@ant-design/icons'
import {List, ListItem, ListItemText, ListSubheader, ListItemIcon} from '@material-ui/core'

const {Title, Text} = Typography
const {Sider, Content, Header} = Layout
const {TextArea} = Input 

export default () => {
    const [showGroupInput, setShowGroupInput] = useState(false);

    if(!window.walletConnection.isSignedIn()){
        // return the signin page 
        return (
            <main className="has-text-centered">
                <Title>Welcome to NEAR Chat</Title>

                <p>
                    To make use of the blockchain network, you need to signin with your 
                    NEAR account. Click the signin button below.
                </p>
                <p>
                    <Button type="primary" size="large" shape="rounded" icon={<LoginOutlined />} onClick={login}>Signin</Button>
                </p>
            </main>
            
        )
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsed={true}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{height: '100%'}}>
                    <Menu.Item key="1" icon={<CommentOutlined />} />
                    <Menu.Item key="2" icon={<SearchOutlined />} />
                    <Menu.ItemGroup style={{position: 'absolute', bottom: 10, width: '100%'}}>
                        <Menu.Divider/>
                        <Menu.Item key={3} icon={<LogoutOutlined />} onClick={logout} />
                    </Menu.ItemGroup>
                    
                </Menu>
            </Sider>
            <Content >
                <Row style={{height: '100%'}}>
                    <Col span="4">
                        <div style={{paddingTop: '1rem'}}>
                            <Input.Search 
                                placeholder="Search (non-functional)"
                            />
                            <div style={{paddingTop:'2rem'}}>
                                <List component="nav"
                                    aria-labelledby="groups-listing"
                                    subheader={
                                        <ListSubheader component="div">
                                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                                <Title level={4}>Threads</Title>
                                                <Button
                                                    type="text"
                                                    icon={<PlusOutlined />}
                                                    onClick={() => setShowGroupInput(!showGroupInput)}
                                                />
                                            </div>
                                        </ListSubheader>
                                    }
                                >
                                    {
                                        showGroupInput ? (
                                            <ListItem key="1">
                                                <Space>
                                                    <Input
                                                        placeholder="Thread Name"
                                                    />
                                                    <Button type="primary"> Add</Button>
                                                </Space>
                                            </ListItem>
                                        ): null
                                    }
                                </List>
                            </div>
                        </div>
                    </Col>
                    <Divider type="vertical" style={{ height: '100%', margin: 0}} />
                    <Col span="13">
                        <Header className="header" style={{backgroundColor: '#f0f2f5', paddingTop: '1rem'}}>
                            <Title level={5}># Thread Name</Title>
                            <div style={{maxWidth: '15rem', display: 'flex', justifyContent: 'space-between'}}>
                                <Text type="secondary" style={{lineHeight: '2.2rem'}}>6 Members</Text>
                                <Button type="text" icon={<PlusOutlined />}>Add member</Button>
                            </div>
                        </Header>
                        <Divider />

                        <div className="msg-input" style={{position: 'absolute', bottom: '1rem', width: '100%', padding: '1rem'}}>
                            <TextArea 
                                placeholder="Type a message"
                                autoSize={{minRows: 3, maxRows: 4}}
                                style={{borderRadius: 10}}
                            />
                            <Button type="primary" shape="circle" icon={<SendOutlined />} style={{position: 'absolute', bottom: 25, right: 30}}/>
                        </div>
                    </Col>
                    <Divider type="vertical" style={{ height: '100%', margin: 0}}/>
                    <Col span="6">
                        <Header className="header" style={{backgroundColor: '#f0f2f5', paddingTop: '1rem'}}>
                            <Title level={5}>Thread Info</Title>
                        </Header>
                        <Divider />
                        <div style={{padding: '1rem'}}>
                            <List 
                                component="nav"
                                aria-labelledby="member-list"
                                subheader={
                                    <ListSubheader>
                                        <Title type="secondary" level={5}>MEMBERS</Title>
                                    </ListSubheader>
                                }
                            >   
                                <ListItem key="1">
                                    <ListItemIcon>
                                        <PlusCircleFilled />
                                    </ListItemIcon>
                                    <ListItemText primary="Shaddy Shad" />
                                </ListItem>
                            </List>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}


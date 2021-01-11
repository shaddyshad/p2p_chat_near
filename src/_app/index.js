import React from 'react';
import 'regenerator-runtime/runtime'
import {login, logout} from '../utils'
import getConfig from '../config'
import {Button, Typography} from 'antd'
import {LoginOutlined} from '@ant-design/icons'
import {Layout, Menu, Row, Col, Divider} from 'antd'
import {
    SearchOutlined,
    CommentOutlined,
    UserOutlined,
    PlusOutlined
} from '@ant-design/icons'
import {List, ListItem, ListItemText, ListSubheader} from '@material-ui/core'

const {Title, Text} = Typography
const {Sider, Content, Header} = Layout

export default () => {
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
                        <Menu.Item key={3} icon={<UserOutlined />} onClick={logout} />
                    </Menu.ItemGroup>
                    
                </Menu>
            </Sider>
            <Content >
                <Row style={{height: '100%'}}>
                    <Col span="3">
                        <div style={{paddingTop: '2rem'}}>
                            <List component="nav"
                                aria-labelledby="groups-listing"
                                subheader={
                                    <ListSubheader component="div">
                                        <div style={{display:'flex', justifyContent: 'space-between'}}>
                                            <Title level={4}>Threads</Title>
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}

                                            />
                                        </div>
                                    </ListSubheader>
                                }
                            >

                            </List>
                        </div>
                    </Col>
                    <Divider type="vertical" style={{ height: '100%', margin: 0}} />
                    <Col span="14">
                        <Header className="header" style={{backgroundColor: '#f0f2f5', paddingTop: '1rem'}}>
                            <Title level={5}># Thread Name</Title>
                            <div style={{maxWidth: '15rem', display: 'flex', justifyContent: 'space-between'}}>
                                <Text type="secondary" style={{lineHeight: '2.2rem'}}>6 Members</Text>
                                <Button type="text" icon={<PlusOutlined />}>Add member</Button>
                            </div>
                        </Header>
                        <Divider />
                    </Col>
                    <Divider type="vertical" style={{ height: '100%', margin: 0}}/>
                    <Col span="6">
                        <Header className="header" style={{backgroundColor: '#f0f2f5', paddingTop: '1rem'}}>
                            <Title level={5}>Thread Info</Title>
                        </Header>
                        <Divider />
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}


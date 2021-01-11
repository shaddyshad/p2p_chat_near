import React from 'react'
import {Layout, Menu, Input} from 'antd'
import {
    SearchOutlined,
    CommentOutlined,
    UserOutlined
} from '@ant-design/icons'
import {logout} from '../utils'

const {Sider, Content} = Layout


export default ({children}) => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsed={true}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{height: '100%', backgroundColor: '#00264A'}}>
                    <Menu.Item key="1" icon={<CommentOutlined />} />
                    <Menu.Item key="2" icon={<SearchOutlined />} />
                    <Menu.ItemGroup style={{position: 'absolute', bottom: 10, width: '100%'}}>
                        <Menu.Divider/>
                        <Menu.Item key={3} icon={<UserOutlined />} onClick={logout} />
                    </Menu.ItemGroup>
                    
                </Menu>
            </Sider>
            <Content>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsed={false}>
                        <Menu theme='dark' mode="inline" style={{height: '100%', marginTop: '18px'}} openKeys={['110']} defaultSelectedKeys={['1']}>
                            <Menu.SubMenu title="Groups" key="110">
                                <Menu.Item key="1"># Group 1</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}
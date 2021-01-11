import React, { useState } from 'react'
import {Layout, Menu} from 'antd'
import {logout} from '../utils'
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import {
    BottomNavigation, 
    BottomNavigationAction,
    AppBar,
    Toolbar,
    Typography,
    InputBase
} from '@material-ui/core'
import {makeStyles, fade} from '@material-ui/core/styles'

// icons
import {
    CommentOutlined,
    UserOutlined,
    SearchOutlined
} from '@ant-design/icons'

const {Sider, Content} = Layout

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'absolute',
        bottom: '1rem',
        zIndex: 10
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        },
    },
    searchIcon: {
        padding: theme.spacing(0,2),
        height: '100%',
        position: "absolute",
        pointerEvents: "none",
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1,1,1,0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus':{
                width: '20ch'
            }
        }
    },
    appBar: {
        backgroundColor: 'rgb(0, 38, 74)'
    }
}))


export default ({children}) => {
    const [value, setValue] = useState(0)
    const classes = useStyles();

    return (
        <div css={css`
            min-height: 100vh;
        `}>
            <div className="is-hidden-tablet">
                {/* Topbar mobile */}
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchOutlined />
                            </div>
                            <InputBase 
                                placeholder="Search..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                  }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                {/* Bottom bar mobile */}
                <BottomNavigation
                    value={value}
                    onChange={(e, v) => setValue(v)}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Chats" icon={<CommentOutlined />} />
                    <BottomNavigationAction label="Profile" icon={<UserOutlined/>} />
                </BottomNavigation>
            </div>
            <Layout style={{minHeight: '100vh'}} className="is-hidden-mobile">
                <Sider collapsed={true} className="is-hidden-mobile">
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{height: '100%', backgroundColor: '#00264A'}}>
                        <Menu.Item key="1" icon={<CommentOutlined />} />
                        <Menu.ItemGroup style={{position: 'absolute', bottom: 10, width: '100%'}}>
                            <Menu.Divider/>
                            <Menu.Item key={3} icon={<UserOutlined />} onClick={logout} />
                        </Menu.ItemGroup>
                        
                    </Menu>
                </Sider>
                <Content>
                    {children}
                </Content>
        </Layout>
        </div>
        
    )
}
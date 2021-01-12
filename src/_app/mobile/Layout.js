import React, { useState } from 'react'
/** @jsx jsx */
import {jsx, css} from '@emotion/react'
import {
    BottomNavigation, 
    BottomNavigationAction,
    AppBar,
    Toolbar,
    InputBase
} from '@material-ui/core'
import {makeStyles, fade} from '@material-ui/core/styles'

// icons
import {
    CommentOutlined,
    UserOutlined,
    SearchOutlined
} from '@ant-design/icons'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'absolute',
        bottom: '10rem',
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


export default ({children, selected, setSelected, threads}) => {
    const classes = useStyles();

    return (
        <div css={css`
            min-height: 100vh;
        `}>
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
                <div css={css`
                    height: 100%;
                    padding: 1rem;
                `}>
                    {children}
                </div>
                {/* Bottom bar mobile */}
                <BottomNavigation
                    value={selected}
                    onChange={(e, v) => setSelected(v)}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Chats" icon={<CommentOutlined />} />
                    <BottomNavigationAction label="Profile" icon={<UserOutlined/>} />
                </BottomNavigation>
        </div>
        
    )
}
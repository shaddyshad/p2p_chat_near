import React, { useState, useEffect } from 'react' 
/**@jsx jsx */
import {jsx, css} from '@emotion/react'
import {makeStyles} from '@material-ui/core/styles'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from '@material-ui/core'

// icons 
import {LeftOutlined, PlusOutlined, SendOutlined} from '@ant-design/icons'
import {Input, Button as AntButton, Comment} from 'antd'
import moment from 'moment'


const {TextArea} = Input 

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'rgb(0, 38, 74)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: theme.palette.common.white
    },
}))

const ChatView = ({threadName, selectThread}) => {
    const classes = useStyles();
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [sent,setSent] = useState(0)

    const sendMessage = () => {
        let ts = moment().format()

        window.contract.send_message({topic: threadName, message, ts})
            .then(() => {
                setMessage("")
                setSent(sent + 1)
            }).catch(console.error)
    }

    // get the mesages
    useEffect(() => {
        if(window.walletConnection.isSignedIn()){
            window.contract.get_messages({topic: threadName})
                .then(messages => {
                    let {Ok} = messages
                    setMessages(Ok.map(msg => JSON.parse(msg)))
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [threadName, sent])

    const back = () => {
        // deselect thread name 
        selectThread(null)
    }

    return (
        <div css={css`
            height: 100%;
        `}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label='back' onClick={back}>
                        <LeftOutlined />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{threadName}</Typography>
                    <Button color="inherit" startIcon={<PlusOutlined />}>Add member</Button>
                </Toolbar>
            </AppBar>

            {/* content */}

            <div css={css`
                padding: 1rem;
                overflow: auto;
            `}>
                {
                    messages.map((msg, i) => (
                        <Comment 
                            key={i}
                            author={`<${msg.sender}>`}
                            content={<p>{msg.message}</p>}
                            datetime={<span>{moment(msg.ts).fromNow()}</span>} 
                        />
                    ))
                }
            </div>

            <div css={css`
                position: absolute;
                bottom: 0;
                width: 100%;
            `}>
                <TextArea 
                    placeholder="Type a message"
                    autoSize={{minRows: 3, maxRows: 5}}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />

                <AntButton size="large" type="primary" shape="circle" icon={<SendOutlined />} style={{position: 'absolute', bottom: 20, right: 20}} onClick={sendMessage} />
            </div>
        </div>
    )
}

export default ChatView;
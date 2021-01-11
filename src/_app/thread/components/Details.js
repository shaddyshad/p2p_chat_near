import React, { useEffect, useState } from 'react' 
import {Layout, Typography, Button, Divider, Input, Comment } from 'antd'
/** @jsx jsx */
import {jsx, css} from '@emotion/react'

// icons 
import {PlusOutlined, SendOutlined} from '@ant-design/icons'
import moment from 'moment'


const {Header} = Layout 
const {Text, Title} = Typography
const {TextArea} = Input 

const Details = ({threadName, members}) => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const sendMessage = () => {
        let ts = moment().format()

        window.contract.send_message({topic: threadName, message, ts})
            .then(() => {
                console.log("Message sent")
            }).catch(console.error)
    }

    // get the mesages
    useEffect(() => {
        if(window.walletConnection.isSignedIn()){
            window.contract.get_messages({topic: threadName})
                .then(messages => {
                    let {Ok} = messages
                    // setMessages(Ok)
                    console.log(Ok)
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div>
            <Header className="header" style={{backgroundColor: '#f0f2f5', paddingTop: '1rem'}}>
                <Title level={5}># {threadName}</Title>

                <div css={css`
                    maxWidth: 15rem;
                    display: flex;
                    justifyContent: space-between;
                `}>
                    <Text type="secondary" style={{lineHeight: '2.2rem'}}> {members.length} Member(s)</Text>
                    <Button type="text" icon={<PlusOutlined />}>Add member</Button>
                </div>
            </Header> 
            <Divider />

            <div css={css`
                overflow: auto;
                padding: 1rem;
            `}>
                {
                    messages.map((message, i) => (
                       <Comment
                            author={`<${message.sender}>`}
                            content={<p>{message.message}</p>}
                            key={i}
                            datetime={<span>{moment(message.ts).fromNow()}</span>}
                       />
                    ))
                }
            </div>

            <div css={css`
                position: absolute;
                bottom: 1rem;
                width: 100%;
                padding: 1rem;
            `}>
                <TextArea
                    placeholder="Type a message"
                    autoSize={{minRows: 3, maxRows: 5}}
                    style={{borderRadius: 10}}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />

                <Button type="primary" shape="circle" icon={<SendOutlined />} style={{position: 'absolute', bottom: 30, right: 30}} onClick={sendMessage} />
            </div>
        </div>
    )
}

export default Details;
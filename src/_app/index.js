import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime'
import {login} from '../utils'
import Layout from './Layout'
import {Row, Col, Divider} from 'antd'
import ThreadListing from './thread/ThreadListing'
import ThreadDetails from './thread/ThreadDetails';
import {Button, Typography, Descriptions} from 'antd'
import moment from 'moment'

import {LoginOutlined, LogoutOutlined} from '@ant-design/icons'
/**@jsx jsx */
import {jsx, css} from '@emotion/react'
import {trackPromise, usePromiseTracker} from 'react-promise-tracker'
import MobileLayout from './mobile/Layout'
import ChatList from './mobile/ChatList'
import ChatView from './mobile/ChatView'

const {Title, Text} = Typography

export default () => {
    if(!window.walletConnection.isSignedIn()){
        // return the signin page 
        return (
            <main className="has-text-centered"
                css={css`
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%)
                `}
            >
                <Title>Welcome to KaChat App</Title>

                <Title level={5}>
                    Hosted on NEAR blockchain network. 
                </Title>
                <p>
                    To make use of the blockchain network, you need to signin with your 
                    NEAR account. Click the signin button below 
                    <Text type="secondary">(There's a free account option available).</Text>
                </p>
                <p>
                    <Button type="primary" size="large" shape="rounded" icon={<LoginOutlined />} onClick={login}>Signin</Button>
                </p>
            </main>
            
        )
    }

    /** Fetch threads from the contract */
    const [threads, setThreads] = useState([])
    const [selectedThread, setSelectedThread] = useState(null)
    const [done, setDone] = useState(true)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if(window.walletConnection.isSignedIn()){
            // fetch the threads available for this client 
            window.contract.get_threads({member: window.accountId})
                .then(threads => {
                    setThreads(threads);
                })
        }
    }, [])

    const selectThread = thread => setSelectedThread(thread)

    // create a new thread 
    const createThread = threadName => {
        if(window.walletConnection.isSignedIn()){
            let ts = moment().format();
            setDone(false);

            // create a new thread 
            trackPromise(window.contract.new_thread({topic: threadName, ts})
                .then(() => {
                    // add it to threads and select it 
                    setThreads([...threads, threadName]);
                    setSelectedThread(threadName);
                    setDone(true);
                    
                })
                .catch(err => {
                    console.error(err);
                    setDone(true);
                }))
        }
    }

    const {promiseInProgress} = usePromiseTracker()


    return (
        <div>
            {/* mobile layout */}
            <div className="is-hidden-tablet">
                {
                    selectedThread ? (
                        <ChatView threadName={selectedThread} selectThread={selectThread} />
                    ): (
                        <MobileLayout
                            selected={selected}
                            setSelected={setSelected}
                        >
                            {
                                selected === 0 ? (
                                    <ChatList
                                        threads={threads}
                                        createNewThread={createThread}
                                        selectThread={selectThread}
                                    />
                                ): (
                                    <div css={css`
                                        padding: 1rem
                                    `}>
                                        <div css={css`
                                            display: flex;
                                            justify-content: space-between;
                                            padding-bottom: 1rem;
                                        `}>
                                            <Title level={3}>Profile</Title>
                                            <Button type="text" icon={<LogoutOutlined />}>Signout</Button>
                                        </div>
                                        <Descriptions title="Profile Info">
                                            <Descriptions.Item label="User Id"> {window.accountId}</Descriptions.Item>
                                        </Descriptions>
                                    </div>
                                )
                            }
                        </MobileLayout>
                    )
                }
            </div>
            {/* Desktop layout */}
            <div className="is-hidden-mobile">
                <Layout>
                    <Row style={{height: '100%'}}>
                        <Col xs={{span: 24}} lg={{span: 4}}>
                            <ThreadListing 
                                threads={threads}
                                onSelect={selectThread}
                                createNewThread={createThread}
                                done={done}
                                loading={promiseInProgress}
                            />
                        </Col>
                        <Divider type="vertical" style={{ height: '100%', margin: 0}} />
                        <Col xs={{span: 24}} lg={{span: 17}}>
                            <ThreadDetails
                                threadName={selectedThread}
                            />
                        </Col>
                    </Row>
                </Layout>
            </div>
            
            
        </div>
        
    )
}


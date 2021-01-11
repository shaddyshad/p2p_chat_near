import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime'
import {login} from '../utils'
import Layout from './Layout'
import {Row, Col, Divider} from 'antd'
import ThreadListing from './thread/ThreadListing'
import ThreadDetails from './thread/ThreadDetails';

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

    /** Fetch threads from the contract */
    const [threads, setThreads] = useState([])
    const [selectedThread, setSelectedThread] = useState(null)

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
            // create a new thread 
            window.contract.new_thread({topic: threadName})
                .then(() => {
                    // add it to threads and select it 
                    setThreads([...threads, threadName]);
                    setSelectedThread(threadName);
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <Layout>
            <Row style={{height: '100%'}}>
                <Col xs={{span: 24}} lg={{span: 4}}>
                    <ThreadListing 
                        threads={threads}
                        onSelect={selectThread}
                        createNewThread={createThread}
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
    )
}


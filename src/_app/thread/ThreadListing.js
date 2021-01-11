import React,{useState, useEffect} from 'react';
/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import {Input, Typography, Button, Space} from 'antd'
import {
    List,
    ListItem,
    ListSubheader,
    ListItemText
} from '@material-ui/core'

// icons 
import {PlusOutlined} from '@ant-design/icons'

const {Search} = Input 
const {Title, Text} = Typography

const ThreadListing = ({threads, onSelect, createNewThread, done, loading}) => {
    const [search, handleSearch] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [threadName, setThreadName] = useState("");

    const createThread = () => {
        createNewThread(threadName) 
    }

    useEffect(() => {
        setShowInput(!done);
    }, [!done])

    return (
        <div
            css={css`
                padding: 1em;
            `}
        >
            <Search placeholder="Search" valu={search} onChange={handleSearch} />

            <section
                css={css`
                    padding-top: 2rem;
                `}
            >
                <List 
                    aria-labelledby="threads-listing"
                    subheader={
                        <ListSubheader>
                            <div css={{display: 'flex', justifyContent: 'space-between'}}>
                                <Title level={4}>Threads</Title>
                                <Button type="text" icon={<PlusOutlined />} onClick={() => setShowInput(true)} />
                            </div>
                        </ListSubheader>
                    }
                >
                    {
                        threads.length === 0 ? (
                            <Text type="secondary">0 threads available</Text>
                        ): (
                            <>
                                {
                                    threads.map((thread, i) => (
                                        <ListItem key={i} button onClick={() => onSelect(thread)}>
                                            <ListItemText primary={`# ${thread}`}/>
                                        </ListItem>
                                        ))
                                }
                            </>
                        )
                        
                    }

                    {/* Input form for new thread */}
                    {
                        showInput ? (
                            <ListItem>
                                <Space>
                                    <Input type="text" placeholder="Thread name" value={threadName} onChange={e => setThreadName(e.target.value)} />
                                    <Button type="primary" onClick={createThread} loading={loading}>Create </Button>
                                </Space>
                            </ListItem>
                        ): null 
                    }

                </List>
            </section>
        </div>
    )
}


export default ThreadListing;
import React, { useEffect, useState } from 'react' 
import {Layout, Typography, Button, Divider} from 'antd'
/** @jsx jsx */
import {jsx, css} from '@emotion/react'

// icons 
import {PlusOutlined} from '@ant-design/icons'


const {Header} = Layout 
const {Text, Title} = Typography

const Details = ({threadName, members}) => {
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
        </div>
    )
}

export default Details;
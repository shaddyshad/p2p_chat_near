import React from 'react'
/**@jsx jsx */
import {css, jsx} from '@emotion/react'
import {Typography} from 'antd'
import splash from '../../assets/splash.svg'

const {Title, Text} = Typography

const EmptyDetails = () => {
    return (
        <div css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        `}
        className="has-text-centered"
        >
            <figure className="image">
                <img src={splash} alt="Splash"/>
            </figure>
            <Title level={4}>Welcome to near chat app</Title>
            <Text> 
                This is the welcome thread. It serves as an introduction to this awesome app. 
                You can create new threads and invite friends to chat.

                To get started. Click on the <code>'+'</code> button next to <code>Threads</code>    
            </Text>
        </div>
    )
}

export default EmptyDetails
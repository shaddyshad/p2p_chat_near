import React, {useState, useEffect} from 'react'
import {Row, Col, Divider} from 'antd'
import Details from './components/Details'
import EmptyDetails from './EmptyDetails'
import Info from './components/Info'

const ThreadDetails = ({threadName}) => {
    const [members, setMembers] = useState([])
    const [reload, setReloadMembers] = useState(0)

    useEffect(() => {
        if(window.walletConnection.isSignedIn()){
            if(threadName){
                window.contract.get_members({thread: threadName})
                    .then(members => {
                        setMembers(members)
                    }).catch(console.error)
            }
            
        }
    }, [threadName, reload])

    const addMember = (name) => {
        if(window.walletConnection.isSignedIn()){
            window.contract.invite({topic: threadName, account_id: name})
                .then(() => {
                    console.log("%cMember added ", "color:yellow;")
                    setReloadMembers(reload + 1)
                })
        }
    }


    if(!threadName){
        return <EmptyDetails />
    }

    return(
        <Row style={{height: '100%'}}>
            <Col lg={{span: 18}} xs={{span:24}}>
                <Details threadName={threadName} members={members} addMember={addMember} />
            </Col>
            <Divider type="vertical" style={{ height: '100%', margin: 0}} />
            <Col lg={{span: 5}} xs={{span: 0}}>
                <Info members={members} /> 
            </Col>
        </Row>
    )
}

export default ThreadDetails;
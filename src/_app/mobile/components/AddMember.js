import React, {useState} from 'react';
import {Drawer, Button, Select} from 'antd'
import {trackPromise, usePromiseTracker} from 'react-promise-tracker'

const AddMember = ({show, close, threadName, reloadMembers}) => {
    const [members, setMembers] = useState([])

    const add = (m) => {
        setMembers(m)
    }

    const addMembers = () => {
        // add multiple members to thread 
        let non_empty = members.filter(m => m !== "");
        nom_empty = non_empty.map(m => m.trim())
        
        let unique = [...new Set(non_empty)];

        if(unique.length){
            if(window.walletConnection.isSignedIn()){
                trackPromise(
                    window.contract.invite_multiple({topic: threadName, members: unique})
                        .then(() => {
                            // reload members 
                            reloadMembers();
                            close();
                        }).catch(err => {
                            console.log(err)
                            close();
                        })
                )
            }
        }

        
    }

    const {promiseInProgress} = usePromiseTracker();

    return (
        <Drawer 
            title="Add a member"
            placement="bottom"
            onClose={close}
            closable="false"
            visible={show}
        >
            <Select 
                mode="tags"
                placeholder="Add some members"
                onChange={add}
                style={{width: '100%', paddingBottom: '1rem'}}
            />

            <Button type="primary" onClick={addMembers} loading={promiseInProgress}>Add</Button>
        </Drawer>
    )
}

export default AddMember;
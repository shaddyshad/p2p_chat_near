import React, {useState} from 'react';
import {Drawer, Button, Select} from 'antd'

const AddMember = ({show, close, threadName}) => {
    const [members, setMembers] = useState([])

    const add = (m) => {
        console.log(m)
    }

    const addMembers = () => {
        // add multiple members to thread 
    }

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

            <Button type="primary" onClick={addMembers}>Add</Button>
        </Drawer>
    )
}

export default AddMember;
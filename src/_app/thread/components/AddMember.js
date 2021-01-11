import React, { useState } from 'react';
import {Modal, Input} from 'antd'

const AddMember = ({isVisible, threadName, closeModal, addMember}) => {
    const [name, setName] = useState("")

    const handleOk = () => {
        addMember(name)
        closeModal();
    }

    return (
        <Modal title={`Add a member to ${threadName}`} visible={isVisible} onOk={handleOk} onCancel={closeModal}>
            <Input placeholder="Member ID" value={name} onChange={e => setName(e.target.value)} />
        </Modal>
    )
}

export default AddMember;
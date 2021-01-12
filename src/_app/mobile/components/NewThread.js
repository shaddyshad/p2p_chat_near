import React, { useState } from 'react';
import {Drawer, Input, Form, Button, Select } from 'antd'


const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const NewThread = ({createThread, close, show}) => {
    const [name, setName] = useState("")
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        close();
    }

    const onError = (err) => {
        console.log("Err ", err);
    }

    const select = (v) => {
        console.log("selected", v)
    }

    return (
        <Drawer
            title="New Thread"
            placement="bottom"
            closable="false"
            onClose={close}
            visible={show}
            key="bottom"
            height="20rem"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onError}
            >
                <Form.Item 
                    label="Thread name"
                    name="threadName"
                    rules={[{required: true, message: "Thread name is required"}]}
                >
                    <Input placeholder="Thread Name" value={name} onChange={e => setName(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Add some members"
                    name="members"
                    rules={[{required: false}]}
                >
                    <Select 
                        mode="tags"
                        style={{width: '100%'}}
                        placeholder="Add multiple (optional)"
                        onChange={select}
                        defaultValue={['ank3rr.testnet']}
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default NewThread;
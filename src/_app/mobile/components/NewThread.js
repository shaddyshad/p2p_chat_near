import React from 'react';
import {Drawer, Input, Form, Button, Select } from 'antd'
import {trackPromise, usePromiseTracker} from 'react-promise-tracker'
import moment from 'moment'

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const NewThread = ({ close, show, reload}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // create a thread and invite multiple 
        const {threadName, members} = values
        let unique_non_empty = [...new Set(members)]
        // remove null items 
        let non_empty = unique_non_empty.filter(i => i !== "");


        if(window.walletConnection.isSignedIn()){
            // create a thread and add multiple members 
            let ts = moment().format();

            trackPromise(
                window.contract.new_thread({topic: threadName, ts})
                    .then(() => {
                        // invite multiple 
                        window.contract.invite_multiple({topic: threadName, members: non_empty})
                            .then(() => {
                                reload();
                                close()
                            }).catch(close)

                    }).catch(err => {
                        console.log("Error ", err);
                        close()
                    })
            )
            
        }
        
    }

    const onError = (err) => {
        console.log("Err ", err);
    }

    const {promiseInProgress} = usePromiseTracker()


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
                    <Input placeholder="Thread Name" />
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
                        
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={promiseInProgress}>Create</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default NewThread;
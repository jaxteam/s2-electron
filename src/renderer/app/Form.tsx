import { Button, Card, Form, Input, Radio, Select, Switch } from 'antd'
import "antd/dist/antd.css"
import { useForm } from 'antd/lib/form/Form'
import { useCallback } from 'react'
import call from 'electron-call';
import { IDbsdk } from '../../main/bridge';
const dbsdk = call.use<IDbsdk>('dbsdk')

export function DataSourceForm() {
    const [form] = useForm()
    const onConnect = useCallback(async function () {
        console.log(form.getFieldsValue(), form.getFieldValue('url'))
        await dbsdk.registerDriver(form.getFieldsValue())
        const rs = await dbsdk.getSchema(form.getFieldValue('url'),"","%")
        console.log(rs)
    }, [])

    return (
        <Card title="创建连接">
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}
                initialValues={{
                    host: "192.168.3.128",
                    port: "3306",
                    drivername: "dm.jdbc.driver.DmDriver",
                    url: "jdbc:dm://192.168.3.128:5237",
                    user: "SYSAUDITOR",
                    password: "SYSAUDITOR"
                }}
            >
                <Form.Item label="name">
                    <Input />
                </Form.Item>
                <Form.Item label="host" name="host" >
                    <Input />
                </Form.Item>
                <Form.Item label="port" name="port">
                    <Input />
                </Form.Item>
                <Form.Item label="drivername" name="drivername">
                    <Input />
                </Form.Item>
                <Form.Item label="url" name="url">
                    <Input />
                </Form.Item>
                <Form.Item label="user" name="user">
                    <Input />
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Button onClick={onConnect}>Connect</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
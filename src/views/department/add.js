import { Form, Input, Button, InputNumber, Radio, message } from 'antd'
import { DepartmentAddApi } from '../../api/department'
import { useState } from 'react'
const DepartmentAdd = () => {
    // const [radio, setradio] = useState(false)
    // const [textArea, settextArea] = useState('')
    const [loading, setloading] = useState(false)
    const [form] = Form.useForm();
    const onFinish = async value => {
        setloading(true)
        try {
            let res = await DepartmentAddApi(value)
            if (res.data.resCode === 0) {
                message.success(res.data.message)
                form.resetFields()
                setloading(false)
            }
            console.log(res)
        }
        catch{
            setloading(false)
            form.resetFields()
        }
    }
    const onRadioChange = value => {
        console.log(value)
        // setradio(true)
    }
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 }
    }
    return (
        <Form form={form}  {...formItemLayout} onFinish={onFinish} initialValues={{ radio: false, textArea: '', number: 0, name: '' }}>
            <Form.Item label="部门名称" name="name" rules={[
                {
                    required: true,
                    message: '请输入部门',
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="人员数量" name="number" rules={[
                {
                    required: true,
                    message: '请输入人员数量',
                },
            ]}>
                <InputNumber min={0} max={100} value={1} />
            </Form.Item>
            <Form.Item label="禁启用" name="radio" rules={[
                {
                    required: true,
                    message: '请选择禁启用状态',
                },
            ]}>
                <Radio.Group onChange={onRadioChange}>
                    <Radio value={false}>禁启</Radio>
                    <Radio value={true}>启用</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="描述" name="textArea" rules={[
                {
                    required: true,
                    message: '请输入描述',
                },
            ]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    确定
        </Button>
            </Form.Item>
        </Form>
    )
}

export default DepartmentAdd
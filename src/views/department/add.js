import { Form, Input, Button, InputNumber, Radio, message } from 'antd'
import { DepartmentAddApi, DepartmentDetailed, DepartmentEdit } from '../../api/department'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FromCommon from 'compoents/Form'
const DepartmentAdd = () => {
    // const [radio, setradio] = useState(false)
    // const [textArea, settextArea] = useState('')
    let location = useLocation();
    const [loading, setloading] = useState(false)
    const [form] = Form.useForm();
    const [itemId, setitemId] = useState()
    useEffect(() => {
        if (location.state) {
            setitemId(location.state.id)
            console.log(itemId)
            getDepartmentDetailed(location.state.id)
        }
    }, [])
    //编辑修改
    const getDepartmentDetailed = async (id) => {
        let res = await DepartmentDetailed({ id })
        if (res.data.resCode === 0) {
            form.setFieldsValue(res.data.data)
        }
    }
    //添加
    const addItem = async (data) => {
        try {
            let res = await DepartmentAddApi(data)
            if (res.data.resCode === 0) {
                message.success(res.data.message)
                form.resetFields()
                setloading(false)
            }
        }
        catch{
            setloading(false)
            form.resetFields()
        }
    }
    //修改
    const modify = async data => {
        let params = data
        params.id = itemId
        try {
            let res = await DepartmentEdit(params)
            if (res.data.resCode === 0) {
                message.success(res.data.message)
                setloading(false)
            }
        }
        catch{
            setloading(false)
        }

    }
    //表单提交
    const onFinish = async value => {
        // setloading(true)
        itemId ? modify(value) : addItem(value)
    }
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 }
    }
    const formItem = [
        {
            type: 'Input',
            label: '部门名称',
            required: true,
            name: 'name',
            rules: []
        },
        {
            type: 'InputNumber',
            label: '人员数量',
            name: 'number',
            min: 0,
            max: 100,
            required: true,
            rules: []
        },
        {
            type: 'Radio',
            label: '禁启用',
            name: 'radio',
            required: true,
            rules: [],
            options: [
                { value: true, label: '启用' },
                { value: false, label: '禁用' }
            ]
        },
        {
            type: 'TextArea',
            label: '描述',
            name: 'content',
            required: true,
            rules: []
        },


        // {
        //     type: 'Select',
        //     label: '下拉框',
        //     name: 'Select',
        //     required: true,
        //     rules: [],
        //     options: [
        //         { value: 1, label: '启用' },
        //         { value: 2, label: '禁用' }
        //     ]

        // }

    ]
    return (
        <div>
            <FromCommon formItem={formItem} formItemLayout={formItemLayout} initialValues={{ radio: false, textArea: '', number: 0, name: '' }} onFinish={onFinish}></FromCommon>
            {/* <Form form={form}  {...formItemLayout} onFinish={onFinish} initialValues={{ radio: false, textArea: '', number: 0, name: '' }}>
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
                    <Radio.Group>
                        <Radio value={false}>禁启</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content" rules={[
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
            </Form> */}
        </div>

    )
}

export default DepartmentAdd
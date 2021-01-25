import { useEffect, useState, Fragment } from 'react'
import { Form, Input, Button } from 'antd'
const FromCommon = (props) => {
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false)
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 }
    }
    //表单提交
    const onFinish = async value => {
        console.log(value)
        // setloading(true)
        // itemId ? modify(value) : addItem(value)
    }
    //校验规则
    const itemRules = (item) => {
        const rules = []
        if (item.required) {
            let message = item.message || `${item.label}不能为空`
            rules.push({ required: true, message })
        }
        if (item.rules && item.rules.length > 0) {
            rules.concat(item.rules)
        }
        return rules
    }
    //input
    const inputElem = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input />
            </Form.Item>
        )
    }
    //TextArea
    const textAreaElem = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input.TextArea />
            </Form.Item>
        )
    }
    //初始化表单
    const initFromItem = () => {
        const { formItem } = props
        if (!formItem || (formItem && formItem.length === 0)) { return false }
        const fromList = []
        formItem.map(item => {
            if (item.type === 'Input') {
                fromList.push(inputElem(item))
            } else if (item.type === 'TextArea') {
                fromList.pus(textAreaElem(item))
            }
        })
        return fromList
    }
    return (
        <Fragment>
            <Form form={form}  {...formItemLayout} onFinish={onFinish} initialValues={{ radio: false, textArea: '', number: 0, name: '' }}>
                {initFromItem()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        确定
        </Button>
                </Form.Item>
            </Form>

        </Fragment>

    )
}

export default FromCommon
import { useEffect, useState, Fragment } from 'react'
import { Form, Input, Button, Select, Radio, InputNumber,DatePicker } from 'antd'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import GetRemoteSelect from 'compoents/Select/index'
const { Option } = Select
const FromCommon = (props) => {
    const { FieldsValue, buttonloading, formItemLayout, initialValues, formItem, fromKey } = props
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false)
    useEffect(() => {
        form.setFieldsValue(FieldsValue)
    }, [FieldsValue, form])
    useEffect(() => {
        setloading(false)
        form.resetFields()
    }, [buttonloading, form])
    const messageRules = {
        'Input': '请输入',
        'TextArea': '请输入',
        'Radio': '请选择',
        'InputNumber': '请输入',
        'Select': '请选择',
        'SelectData': '请选择',
    }
    //表单提交
    const onFinish = async value => {
        //格式化数据，value原来的值
        //         content: "sss"
        // jobName: "javad"
        // parentId:{
        // parentId: 3762
        // }
        // radio: false
        if (fromKey && value[fromKey]) {
            if (Object.prototype.toString.call(value[fromKey]) !== "[object String]") {
                const dataKey = value[fromKey]
                delete value[fromKey]
                value = Object.assign(value, dataKey)
            }
        }
        setloading(true)
        props.onFinish(value)
    }
    //校验规则
    const itemRules = (item) => {
        let rules = []
        if (item.required) {
            let message = item.message || `${messageRules[item.type]}${item.label}`
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
                <Input placeholder={item.Select} />
            </Form.Item>
        )
    }
    //inputNumber
    const inputNumber = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber min={item.min} max={item.max} value={1} />
            </Form.Item>
        )
    }
    //TextArea
    const textAreaElem = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input.TextArea placeholder={item.Select} />
            </Form.Item>
        )
    }
    //antd表单的自定义或第三方的表单控件
    const checkPrice = (rule, value) => {
        if (value || value[rule.field]) {
            return Promise.resolve();

        }
        return Promise.reject();


    }
    //Solt插槽
    const Solt = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
              {
                //   console.log(props.children)
                  props.children&&Array.isArray(props.children)?props.children.filter(elm=>elm.ref===item.soltName)[0] : props.children
              }
            </Form.Item>
        )
    }
    //select
    const selectData = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, { validator: checkPrice }]}>
                <GetRemoteSelect data={item} url={item.url && item.url} name={item.name} />
            </Form.Item>
        )
    }
    //select
    const select = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.Select}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }

                </Select>
            </Form.Item>
        )
    }
    //radio
    const radio = item => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={`${elem.value}${elem.label}`}>{elem.label}</Radio>
                        })
                    }

                </Radio.Group>

            </Form.Item>
        )
    }
    //栏目
    const columnElem=item=>{
        return(
            <div className="form-column">
                <h4>{item.label}</h4>
            </div>
        )
    }
    //日期
    const dateElem=item=>{
        const rules = itemRules(item)
        return(
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>

                <DatePicker locale={locale} format={item.format} picker={item.picker}/>

            </Form.Item>
            // <div className="form-column">
            //     <DatePicker onChange={onChange} />
            // </div>
        )
    }

    //初始化表单
    const initFromItem = () => {
        if (!formItem || (formItem && formItem.length === 0)) { return false }
        const fromList = []
        formItem.map(item => {
            switch (item.type) {
                case 'Input':
                    fromList.push(inputElem(item))
                    break;
                case 'TextArea':
                    fromList.push(textAreaElem(item))
                    break;
                case 'SelectData':
                    fromList.push(selectData(item))
                    break;
                case 'Select':
                    fromList.push(select(item))
                    break;
                    case 'Solt':
                        fromList.push(Solt(item))
                        break;
                case 'Radio':
                    fromList.push(radio(item))
                    break;
                case 'InputNumber':
                    fromList.push(inputNumber(item))
                    break;
                case 'Column':
                    fromList.push(columnElem(item))
                    break;
                case 'Date':
                    fromList.push(dateElem(item))
                    break;
                default:
                    fromList.push()
            }
        })
        return fromList
    }
    return (
        <Fragment>
            <Form form={form}  {...formItemLayout} onFinish={onFinish} initialValues={initialValues}>
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

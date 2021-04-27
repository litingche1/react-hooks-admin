import {useEffect, useState, Fragment,useImperativeHandle} from 'react'
import {Form, Input, Button, Select, Radio, InputNumber, DatePicker,Row,Col} from 'antd'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import GetRemoteSelect from 'compoents/Select/index'
import UploadCom from "compoents/Upload/index"
import RichText from 'compoents/richText/index'
import 'styles/main.scss'
const {Option} = Select
const FromCommon = (props) => {
    const {FieldsValue, buttonloading, formItemLayout, initialValues, formItem, fromKey} = props
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false)
    useEffect(() => {
        form.setFieldsValue(FieldsValue)
    }, [FieldsValue, form])
    useEffect(() => {
        setloading(false)
        resetFrom()
    }, [buttonloading])
    const messageRules = {
        'Input': '请输入',
        'TextArea': '请输入',
        'Radio': '请选择',
        'InputNumber': '请输入',
        'Select': '请选择',
        'SelectData': '请选择',
        "Date": '请选择',
        "Upload": '请上传',
        "Editor":'请输入'
    }
    const resetFrom=()=>{
        form.resetFields()
    }
    useImperativeHandle(props.cref, () => ({
        Rreset: () => {
            resetFrom()
        },
    }))
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
            rules.push({required: true, message})
        }
        if (item.rules && item.rules.length > 0) {
            rules=[...rules,...item.rules]
        }
        return rules
    }
    //input
    const inputElem = (item) => {
        const rules = itemRules(item)
        // console.log(rules)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input placeholder={item.Select}/>
            </Form.Item>
        )
    }
    //inputNumber
    const inputNumber = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber min={item.min} max={item.max} value={1}/>
            </Form.Item>
        )
    }
    //TextArea
    const textAreaElem = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input.TextArea placeholder={item.Select}/>
            </Form.Item>
        )
    }
    //antd表单的自定义或第三方的表单控件
    const checkPrice = (rule, value) => {
        if (value) {
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
                    props.children && Array.isArray(props.children) ? props.children.filter(elm => elm.ref === item.soltName)[0] : props.children
                }
            </Form.Item>
        )
    }
    //select
    const selectData = (item) => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: checkPrice}]}>
                <GetRemoteSelect data={item} url={item.url && item.url} name={item.name}/>
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
    const columnElem = item => {
        return (
            <div className="form-column">
                <h4>{item.label}</h4>
            </div>
        )
    }
    //日期
    const dateElem = item => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>

                <DatePicker locale={locale} format={item.format} picker={item.picker}/>

            </Form.Item>
        )
    }
    //图片上传
    const uploadElem = item => {
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>

                <UploadCom name={item.name} initValue={FieldsValue}/>

            </Form.Item>

        )
    }
    //富文本
    const editorElem=item=>{
        const rules = itemRules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: checkPrice}]}>

                <RichText name={item.name} initValue={FieldsValue}/>

            </Form.Item>

        )
    }
    //内联
    const FormItemInlineElem=item=>{
        const rules = itemRules(item)
        return (
            <Row gutter={24}>
                <Col span={2} className="ant-form-item" style={{textAlign:"right"}}>
                    <div className="ant-form-item-label">
                        <label for="name" className="ant-form-item-required">{item.label}</label>
                    </div>
                </Col>
                <Col span={22}>
                    <Row>
                        {
                            item.inline_item.map(elem=>{
                                return(
                                    <Col span={elem.col} className="form-item-inline-control">{createControl(elem)}</Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        )

    }
//创建表单
    const createControl=item=>{
        switch (item.type) {
            case 'Input':
                return inputElem(item)
                break;
            case 'TextArea':
                return textAreaElem(item)
                break;
            case 'SelectData':
                return selectData(item)
                break;
            case 'Select':
                return select(item)
                break;
            case 'Solt':
                return Solt(item)
                break;
            case 'Radio':
                return radio(item)
                break;
            case 'InputNumber':
                return inputNumber(item)
                break;
            case 'Column':
                return columnElem(item)
                break;
            case 'Date':
                return dateElem(item)
                break;
            case "Upload":
                return uploadElem(item)
                break;
            case "Editor":
                return editorElem(item)
                break;
            case "FormItemInline":
                return FormItemInlineElem(item)
                break
            default:
                return
        }
    }

    //初始化表单
    const initFromItem = () => {
        if (!formItem || (formItem && formItem.length === 0)) {
            return false
        }
        let fromList=formItem.map(item => createControl(item))
        return fromList
    }
    const { submitButton } = props
    return (
        <Fragment>
            <Form form={form}  {...formItemLayout} onFinish={onFinish} initialValues={initialValues}>
                {initFromItem()}
                <Form.Item>
                    {
                        <Row>
                            <Col span={formItemLayout.labelCol.span}></Col>
                            <Col span={formItemLayout.wrapperCol.span}>
                                {submitButton?<Button type="primary" htmlType="submit" loading={loading}>确定</Button> : ''}
                            </Col>
                        </Row>

                    }

                </Form.Item>
            </Form>

        </Fragment>

    )
}
FromCommon.defaultProps = {
    submitButton:true,
}
export default FromCommon

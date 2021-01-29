import {useEffect, useState, Fragment} from 'react'
import {Form, Input, Button, Select, Radio, InputNumber} from 'antd'
import PropTypes from 'prop-types';
// import store from 'stroe'
import {connect} from 'react-redux'
import { TableList} from 'api/table'
import requestUrl from 'utils/requestUrl'
const {Option} = Select
const FromSearch = (props) => {
    const {FieldsValue, buttonloading,config,search} = props
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false)
    useEffect(() => {
        form.setFieldsValue(FieldsValue)
    }, [FieldsValue, form])
    useEffect(() => {
        setloading(buttonloading)
        form.resetFields()
    }, [buttonloading, form, loading])
    useEffect(()=>{
        search({
            url:'department'
        })
    },[])
    const messageRules = {
        'Input': '请输入',
        'TextArea': '请输入',
        'Radio': '请选择',
        'InputNumber': '请输入',
        'Select': '请选择',
    }
    //表单提交
    const onFinish = async value => {
        search({
          url:'department', keyWord:value
        })
        // setloading(true)
        // props.onFinish(value)
    }
    //校验规则
    const itemRules = (item) => {
        let rules = []
        if (item.required) {
            let message = item.message || `${messageRules[item.type]}${item.label}`
            rules.push({required: true, message})
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
    //初始化表单
    const initFromItem = () => {
        const {formItem} = props
        if (!formItem || (formItem && formItem.length === 0)) {
            return false
        }
        const fromList = []
        formItem.map(item => {
            switch (item.type) {
                case 'Input':
                    fromList.push(inputElem(item))
                    break;
                case 'TextArea':
                    fromList.push(textAreaElem(item))
                    break;
                case 'Select':
                    item.options = config.select
                    fromList.push(select(item))
                    break;
                case 'Radio':
                    fromList.push(radio(item))
                    break;
                case 'InputNumber':
                    fromList.push(inputNumber(item))
                    break;
                default:
                    fromList.push()
            }
        })
        return fromList
    }
    const {formItemLayout, initialValues} = props
    return (
        <Fragment>
            <Form layout="inline" form={form}  {...formItemLayout} onFinish={onFinish} initialValues={initialValues}>
                {initFromItem()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        搜索
                    </Button>
                </Form.Item>
            </Form>

        </Fragment>

    )
}
//校验数据类型
FromSearch.propTypes = {
    formItem: PropTypes.array
}
//默认值
FromSearch.defaultProps = {
    formItem: []
}
const mapStateToProps = (state) => ({
    config:state.config
})
const mapDispatchToProps = (dispatch) => {
    return{
        search: async (params)=>{
            //获取表格数据
            // const getList = async () => {
            //     settableLoading(true)
                const resData = {
                    url: requestUrl[params.url],
                    params: {
                        pageNumber:1,
                        pageSize:10,
                    }

                }
                if (params.keyWord) {
                    for (let key in params.keyWord) {
                        resData.params[key] = params.keyWord[key]
                    }
                }
                let res = await TableList(resData)
                if (res.data.resCode === 0) {
                    console.log(res.data.data.data)
                    dispatch({
                        type:'GET_TABLE_LIST',
                        payload:{data:res.data.data.data}
                    })
                    // setTableData(res.data.data.data)
                    // settotal(res.data.data.total)
                    // settableLoading(false)
                    // setbuttonLoading(false)
                    // prepageSizeset(pageSize)
                }

            // }
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FromSearch)

import { message } from 'antd'
import { DepartmentAddApi, DepartmentDetailed, DepartmentEdit } from '../../api/department'
import { GetJobAdd } from 'api/job'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FromCommon from 'compoents/Form'
const JobAdd = () => {
    //获取路由传参
    let location = useLocation();
    const [buttonloading, setbuttonloading] = useState(false)
    const [itemId, setitemId] = useState()
    const [FieldsValue, setFieldsValue] = useState({})
    useEffect(() => {
        if (location.state) {
            setitemId(location.state.id)
            getDepartmentDetailed(location.state.id)
        }
        return () => {
            setbuttonloading(false)
        }
    }, [location.state])
    //编辑修改
    const getDepartmentDetailed = async (id) => {
        let res = await DepartmentDetailed({ id })
        if (res.data.resCode === 0) {
            setFieldsValue(res.data.data)
        }
    }
    //添加
    const addItem = async (data) => {
        try {
            let res = await GetJobAdd(data)
            if (res.data.resCode === 0) {
                message.success(res.data.message)
                setbuttonloading(false)
            }
        }
        catch{
            setbuttonloading(false)
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
                setbuttonloading(false)
            }
        }
        catch{
            setbuttonloading(false)
        }

    }
    //表单提交
    const onFinish = async value => {
        setbuttonloading(true)
        itemId ? modify(value) : addItem(value)
    }
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 }
    }
    const  fromKey='parentId'
    const formItem = [
        {
            type: 'Select',
            label: '部门名称',
            required: true,
            name: 'parentId',
            rules: [],
            url: 'getdepartment',
            propsKey: {
                value: 'id',
                label: 'name'
            }
        },
        {
            type: 'Input',
            label: '职位名称',
            required: true,
            name: 'jobName',
            rules: [],


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
    ]
    //表单的初始化值
    const initialValues = {
        radio: false, textArea: '', number: 0, name: ''
    }

    return (
        <div>
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout} initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish} buttonloading={buttonloading}></FromCommon>
        </div>

    )
}

export default JobAdd
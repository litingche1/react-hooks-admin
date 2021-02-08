import { message } from 'antd'
import { GetJobAdd, JobDetailed, JobEdit } from 'api/job'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FromCommon from 'compoents/Form'
import { Select } from 'antd'
import requestUrl from 'utils/requestUrl'
import { TableList } from 'api/table'
const { Option } = Select
const JobAdd = () => {
    //获取路由传参
    let location = useLocation();
    const [buttonloading, setbuttonloading] = useState(false)
    const [itemId, setitemId] = useState()
    const [FieldsValue, setFieldsValue] = useState({})
    const [selectData, setselectData] = useState([{id:1,name:'市场部门'},{id:2,name:'研发部门'}])
    useEffect(() => {
        if (location.state) {
            setitemId(location.state.id)
            getDepartmentDetailed(location.state.id)
        }
        return () => {
            setbuttonloading(false)
        }
    }, [location.state])
    useEffect(()=>{
        getList()
    },[])
    const getList = async () => {
        const params = {
            url: requestUrl['getdepartment']
        }
        let res = await TableList(params)
        setselectData(res.data.data.data)
    }
    //编辑修改
    const getDepartmentDetailed = async (id) => {
        let res = await JobDetailed({ id })
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
        params.jobId = itemId
        try {
            let res = await JobEdit(params)
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
    const fromKey = 'parentId'
    const formItem = [
        {
            type: 'Solt',
            label: '部门名称',
            required: true,
            name: 'parentId',
            soltName:'department',
            rules: [],
            // url: 'getdepartment',
            propsKey: {
                value: 'id',
                label: 'name'
            }
        },
        // {
        //     type: 'SelectData',
        //     label: '部门名称',
        //     required: true,
        //     name: 'parentId',
        //     rules: [],
        //     url: 'getdepartment',
        //     propsKey: {
        //         value: 'id',
        //         label: 'name'
        //     }
        // },
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
            name: 'status',
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
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout} initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish} buttonloading={buttonloading}>
            <Select ref="department">
                    {
                        selectData && selectData.map(elem => {
                            return <Option value={elem.id} key={elem.id}>{elem.name}</Option>
                        })
                    }
                </Select>
            </FromCommon>
        </div>

    )
}

export default JobAdd
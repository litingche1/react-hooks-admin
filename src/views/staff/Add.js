import { message,Row, Col,Radio,DatePicker } from 'antd'
import { GetJobAdd, JobDetailed, JobEdit } from 'api/job'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FromCommon from 'compoents/Form'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
// import { Select } from 'antd'
import requestUrl from 'utils/requestUrl'
import { TableList } from 'api/table'
// const { Option } = Select
const StaffAdd = () => {
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
            type:"Column",
            label:"个人信息"
        },
        {
            type: 'Input',
            label: '姓名',
            required: true,
            name: 'name',
            Select:"请输入姓名"
        },
        {
            type: 'Radio',
            label: '性别',
            name: 'status',
            required: true,
            rules: [],
            options: [
                { value: true, label: '男' },
                { value: false, label: '女' }
            ]
        },
        {
            type: 'Input',
            label: '身份证号码',
            required: true,
            name: 'code',
            Select:"请输入身份证号码",
            rules: [],
        },
        {
            type: 'Date ',
            label: '出生年月',
            required: true,
            name: 'code',
            format:'YYYY/MM/DD',
            picker:'',
            rules: [],
        },
        {
            type: 'Input',
            label: '手机',
            required: true,
            name: 'iphone',
            Select:"请输入手机号码",
            rules: [],
        },
        {
            type: 'Select',
            label: '民族',
            required: true,
            name: 'iphone',
            Select:"请选择民族",
            rules: [],
            options: [
                { value: 'hanZh', label: '汉族' },
                { value: false, label: '其他汉族' }
            ]
        },
        {
            type: 'Select',
            label: '政治面貌',
            Select:"请选择政治面貌",
            required: true,
            name: 'iphone',
            rules: [],
            options: [
                { value: 'hanZh', label: '党员' },
                { value: false, label: '团员' },
                { value: false, label: '普通群众' }
            ]
        },
        {
            type: 'Input',
            label: '毕业院校',
            Select:"请输入毕业院校",
            required: true,
            name: 'iphone',
            rules: [],
        },
        {
            type: 'Input',
            label: '专业',
            required: true,
            name: 'iphone',
            Select:"请输入专业",
            rules: [],
        },
        {
            type: 'Input',
            label: '学历',
            required: true,
            name: 'iphone',
            Select:"请输入学历",
            rules: [],
        },
        {
            type: 'Input',
            label: '微信号',
            required: true,
            name: 'iphone',
            Select:"请输入微信号",
            rules: [],
        },
        {
            type: 'Input',
            label: '电话',
            required: true,
            name: 'iphone',
            Select:"请输入电话",
            rules: [],
        },
        {
            type: 'Input',
            label: '个人邮箱',
            required: true,
            name: 'iphone',
            Select:"请输入个人邮箱",
            rules: [],
        },
        {
            type:"Column",
            label:"就职信息"
        },
        {
            type: 'Select',
            label: '职位',
            required: true,
            name: 'iphone',
            Select:"请选择职位",
            rules: [],
        },
        {
            type: 'Select',
            label: '所属部门',
            required: true,
            name: 'iphone',
            Select:"请选择所属部门",
            rules: [],
        },
        {
            type: 'Solt',
            label: '职位状态',
            required: true,
            name: 'iphone',
            soltName:'jobStatus',
            rules: [],
        },
        {
            type: 'Input',
            label: '公司邮箱',
            required: true,
            name: 'iphone',
            rules: [],
        },
    ]
    //表单的初始化值
    const initialValues = {
        radio: false, textArea: '', number: 0, name: ''
    }

    return (
        <div>
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout} initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish} buttonloading={buttonloading}>
           <div ref="jobStatus">
               <Row gutter={16}>
                   <Col span={8}>
                       <Radio >在职</Radio>
                       <div className="mb15"></div>
                       <DatePicker locale={locale}/>
                   </Col>
                   <Col span={8}>
                       <Radio>休假</Radio>
                       <div className="mb15"></div>
                       <DatePicker locale={locale}/>
                   </Col>
                   <Col span={8}>
                       <Radio>离职</Radio>
                       <div className="mb15"></div>
                       <DatePicker locale={locale}/>
                   </Col>
               </Row>
           </div>
            </FromCommon>
        </div>

    )
}

export default StaffAdd
import {message, Row, Col, Radio, DatePicker} from 'antd'
import {GetJobAdd, JobDetailed, JobEdit} from 'api/job'
import {staffAdd} from 'api/staff'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import FromCommon from 'compoents/Form'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import requestUrl from 'utils/requestUrl'
import {TableList} from 'api/table'
import {nation, face, education} from 'utils/data'
import {validate_phone} from "../../utils/validate";
const StaffAdd = () => {
    //获取路由传参
    let location = useLocation();
    const [buttonloading, setbuttonloading] = useState(false)
    const [itemId, setitemId] = useState()
    const [FieldsValue, setFieldsValue] = useState({})
    const [selectData, setselectData] = useState([{id: 1, name: '市场部门'}, {id: 2, name: '研发部门'}])
    const [jobStatusValue,setjobStatusValue]=useState('')
    useEffect(() => {
        if (location.state) {
            setitemId(location.state.id)
            getDepartmentDetailed(location.state.id)
        }
        return () => {
            setbuttonloading(false)
        }
    }, [location.state])
    useEffect(() => {
        // getList()
    }, [])
    const getList = async () => {
        const params = {
            url: requestUrl['getdepartment']
        }
        let res = await TableList(params)
        setselectData(res.data.data.data)
    }
    //编辑修改
    const getDepartmentDetailed = async (id) => {
        let res = await JobDetailed({id})
        if (res.data.resCode === 0) {
            setFieldsValue(res.data.data)
        }
    }
    //添加
    const addItem = async (data) => {
        try {
            let res = await staffAdd(data)
            if (res.data.resCode === 0) {
                message.success(res.data.message)
                setbuttonloading(false)
                setjobStatusValue('')
            }
        } catch {
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
        } catch {
            setbuttonloading(false)
        }

    }
    //表单提交
    const onFinish = async value => {
        setbuttonloading(true)
        itemId ? modify(value) : addItem(value)
    }
    const formItemLayout = {
        labelCol: {span: 2},
        wrapperCol: {span: 20}
    }
    const fromKey = 'parentId'
    const formItem = [
        {
            type: "Column",
            label: "个人信息"
        },
        {
            type: 'Input',
            label: '姓名',
            required: true,
            name: 'name',
            Select: "请输入姓名"
        },
        {
            type: 'Radio',
            label: '性别',
            name: 'sex',
            required: true,
            rules: [],
            options: [
                {value: true, label: '男'},
                {value: false, label: '女'}
            ]
        },
        {
            type: 'Upload',
            label: '头像',
            name: 'face_img',
        },
        {
            type: 'Input',
            label: '身份证号码',
            required: true,
            name: 'card_id',
            Select: "请输入身份证号码",
            rules: [],
        },
        {
            type: 'Date',
            label: '出生年月',
            name: 'birthday',
            format: 'YYYY/MM/DD',
            picker: '',
            rules: [],
        },
        {
            type: 'Input',
            label: '手机',
            required: true,
            name: 'phone',
            Select: "请输入手机号码",
            rules: [
                () => ({
                    validator(_, value) {
                        console.log(8888888)
                        if (validate_phone(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject('手机格式不正确，请输入正确的手机号码!');

                    },
                })
            ],
        },
        {
            type: 'Select',
            label: '民族',
            required: true,
            name: 'nation',
            Select: "请选择民族",
            rules: [],
            options: nation
        },
        {
            type: 'Select',
            label: '政治面貌',
            Select: "请选择政治面貌",
            required: true,
            name: 'political',
            rules: [],
            options: face
        },
        {
            type: 'Input',
            label: '毕业院校',
            Select: "请输入毕业院校",
            required: true,
            name: 'school',
            rules: [],
        },
        {
            type: 'Input',
            label: '专业',
            required: true,
            name: 'major',
            Select: "请输入专业",
            rules: [],
        },
        {
            type: 'Select',
            label: '学历',
            required: true,
            name: 'education',
            Select: "请输入学历",
            rules: [],
            options: education
        },
        {
            type: 'Upload',
            label: '毕业证书',
            name: 'graduationCard',
        },
        {
            type: 'Input',
            label: '微信号',
            required: true,
            name: 'wechat',
            Select: "请输入微信号",
            rules: [],
        },
        {
            type: 'Input',
            label: '电话',
            required: true,
            name: 'iphone',
            Select: "请输入电话",
            rules: [],
        },
        {
            type: 'Input',
            label: '个人邮箱',
            required: true,
            name: 'email',
            Select: "请输入个人邮箱",
            rules: [{
                type: 'email', message: '邮箱格式不正确'
            }],
        },
        {
            type: "Column",
            label: "就职信息"
        },
        {
            type: 'SelectData',
            label: '职位',
            required: true,
            name: 'job_id',
            url:'jobAll',
            propsKey: {
                value: 'jobId',
                label: 'jobName'
            },
            Select: "请选择职位",
            rules: [],
        },
        {
            type: 'SelectData',
            label: '所属部门',
            required: true,
            url:'departmentAll',
            name: 'departmen_id',
            propsKey: {
                value: 'id',
                label: 'name'
            },
            Select: "请选择所属部门",
            rules: [],
        },
        {
            type: 'FormItemInline',
            label: '职位状态',
            required: true,
            name: 'job_status',
            soltName: 'jobStatus',
            rules: [],
            inline_item:[
                {
                    type:'Date',
                    label:'入职日期',
                    name:'job_entry_date',
                    col:6,
                    required: true,
                    style:{width:"100%"}
                },
                {
                    type:'Date',
                    label:'转正日期',
                    name:'job_formal_date',
                    style:{width:"100%"},
                    required: true,
                    col:6,
                },
                {
                    type:'Date',
                    label:'离职日期',
                    name:'job_quit_date',
                    style:{width:"100%"},
                    required: true,
                    col:6,
                },
            ]
        },
        // {
        //     type: 'Solt',
        //     label: '职位状态',
        //     required: true,
        //     name: 'job_status',
        //     soltName: 'jobStatus',
        //     rules: [],
        // },
        {
            type: 'Input',
            label: '公司邮箱',
            required: true,
            name: 'company_email',
            rules: [],
        },
        {
            type: 'Editor',
            label: '描述',
            required: true,
            name: 'introduce',
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
    ]
    //表单的初始化值
    const initialValues = {
        radio: false, textArea: '', number: 0, name: ''
    }
    const onChange=(e)=>{
        setjobStatusValue(e.target.value)
    }
    return (
        <div>
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout}
                        initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish}
                        buttonloading={buttonloading}>
                <div ref="jobStatus" style={{width:'500px'}}>
                    <Radio.Group onChange={onChange} value={jobStatusValue} style={{width:'100%'}}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Radio value={'online'}>在职</Radio>
                            <div className="mb15"></div>
                            <DatePicker locale={locale}/>
                        </Col>
                        <Col span={8}>
                            <Radio value={'vacation'}>休假</Radio>
                            <div className="mb15"></div>
                            <DatePicker locale={locale}/>
                        </Col>
                        <Col span={8}>
                            <Radio value={'quit'}>离职</Radio>
                            <div className="mb15"></div>
                            <DatePicker locale={locale}/>
                        </Col>
                    </Row>
                    </Radio.Group>
                </div>
            </FromCommon>
        </div>

    )
}

export default StaffAdd

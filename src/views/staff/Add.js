import {message, Row, Col, Radio, DatePicker} from 'antd'
import {GetJobAdd, JobDetailed, JobEdit} from 'api/job'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import FromCommon from 'compoents/Form'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import requestUrl from 'utils/requestUrl'
import {TableList} from 'api/table'
import {nation, face, education} from 'utils/data'
import {validate_email, validate_phone} from "../../utils/validate";

const StaffAdd = () => {
    //获取路由传参
    let location = useLocation();
    const [buttonloading, setbuttonloading] = useState(false)
    const [itemId, setitemId] = useState()
    const [FieldsValue, setFieldsValue] = useState({})
    const [selectData, setselectData] = useState([{id: 1, name: '市场部门'}, {id: 2, name: '研发部门'}])
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
        getList()
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
            let res = await GetJobAdd(data)
            if (res.data.resCode === 0) {
                message.success(res.data.message)
                setbuttonloading(false)
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
            required: true,
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
            type: 'Date ',
            label: '出生年月',
            required: true,
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
            type: 'Select',
            label: '职位',
            required: true,
            name: 'job_id',
            Select: "请选择职位",
            rules: [],
        },
        {
            type: 'Select',
            label: '所属部门',
            required: true,
            name: 'departmen_id',
            Select: "请选择所属部门",
            rules: [],
        },
        {
            type: 'Solt',
            label: '职位状态',
            required: true,
            name: 'job_status',
            soltName: 'jobStatus',
            rules: [],
        },
        {
            type: 'Input',
            label: '公司邮箱',
            required: true,
            name: 'company_email',
            rules: [],
        },
    ]
    //表单的初始化值
    const initialValues = {
        radio: false, textArea: '', number: 0, name: ''
    }

    return (
        <div>
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout}
                        initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish}
                        buttonloading={buttonloading}>
                <div ref="jobStatus">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Radio>在职</Radio>
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

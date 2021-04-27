import {useEffect, useState, useImperativeHandle,useRef} from 'react'
import {Modal, message} from 'antd';
import FromCommon from 'compoents/Form'
import {validate_phone, validate_password} from "utils/validate";
import {userAdd,userDetailed} from 'api/user'
import CryptoJs from 'crypto-js';

const ModalComm = props => {
    const {refreshTable} = props
    const [isModalVisible, setisModalVisible] = useState(false)
    const [buttonloading, setbuttonloading] = useState(false)
    const [FieldsValue, setFieldsValue] = useState({})
    const From = useRef()
    const handleCancel = () => {
        setisModalVisible(false)
    }
    const open = (value) => {
        setisModalVisible(value)
        From.current.Rreset()
    }
    //获取表单详情数据
    const getUserDetailed= async (data)=>{
        if(!data.id) return
        let res=await userDetailed({id:data.id})

        setFieldsValue(res.data.data)
        console.log(res.data)
    }
    //父组件调用删除
    useImperativeHandle(props.cref, () => ({
        openModal: (data) => {
            open(data.status)
            getUserDetailed(data)
        }
    }))
    //表单提交
    const onFinish = async value => {
        const data = value
        data.passwor = CryptoJs.MD5(data.password).toString()
        delete data.confirmPassword
        const res = await userAdd(data)
        message.success(res.data.message)
        setbuttonloading(true)
        setisModalVisible(false)
        refreshTable()
    }
    const formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    const fromKey = 'parentId'
    const formItem = [

        {
            type: 'Input',
            label: '用户名',
            required: true,
            name: 'username',
            Select: "请输入姓名"
        },
        {
            type: 'Input',
            label: '密码',
            required: true,
            name: 'password',
            Select: "请输入密码",
            rules: [
                ({getFieldValue}) => ({
                    validator(_, value) {
                        let confirmPasswords = getFieldValue('confirmPassword')
                        if (value) {
                            if (confirmPasswords && confirmPasswords !== value) {
                                return Promise.reject('二次输入密码不一致');
                            }

                            if (validate_password(value)) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject('请输入6到20位字母+数字的密码!');
                            }


                        } else {
                            return Promise.reject('密码不能为空!');
                        }


                    },
                }),
            ],
        },
        {
            type: 'Input',
            label: '确认密码',
            required: true,
            name: 'confirmPassword',
            Select: "请输入确认密码",
            rules: [
                ({getFieldValue}) => ({
                    validator(_, value) {
                        let confirmPasswords = getFieldValue('password')
                        if (value) {
                            if (confirmPasswords && confirmPasswords !== value) {
                                return Promise.reject('二次输入密码不一致');
                            }
                            return Promise.resolve('');
                        } else {
                            return Promise.reject('再次输入密码不能为空!');
                        }


                    },
                }),
            ],
        },
        {
            type: 'Input',
            label: '真实姓名',
            required: true,
            name: 'truename',
            Select: "请输入真实姓名",
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
                        if (validate_phone(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject('手机格式不正确，请输入正确的手机号码!');

                    },
                })
            ],
        },
        {
            type: 'Radio',
            label: '禁启用状态',
            name: 'status',
            required: true,
            rules: [],
            options: [
                {value: true, label: '启用'},
                {value: false, label: '禁用'}
            ]
        },


    ]
    //表单的初始化值
    const initialValues = {
        // radio: false, textArea: '', number: 0, name: ''
    }
    return (
        <Modal title="用户新增/修改" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout}
                        initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish}
                        buttonloading={buttonloading} cref={From}>
            </FromCommon>
        </Modal>

    )
}

export default ModalComm

import {useEffect, useState,useImperativeHandle} from 'react'
import {Modal} from 'antd';
import FromCommon from 'compoents/Form'
import {validate_phone} from "utils/validate";
const ModalComm = props => {
    const [isModalVisible, setisModalVisible] = useState(false)
    const [buttonloading, setbuttonloading] = useState(false)
    const [FieldsValue, setFieldsValue] = useState({})
    const handleOk = () => {
        setisModalVisible(false)
    }
    const handleCancel = () => {
        setisModalVisible(false)
    }
    const open=(value)=>{
        setisModalVisible(value)
    }
    //父组件调用删除
    useImperativeHandle(props.cref, () => ({
        openModal: (data) => {
            open(data)
        }
    }))
    //表单提交
    const onFinish = async value => {
        console.log(value)
        // setbuttonloading(true)
        // itemId ? modify(value) : addItem(value)
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
            name: 'name',
            Select: "请输入姓名"
        },
        {
            type: 'Input',
            label: '密码',
            required: true,
            name: 'card_id',
            Select: "请输入身份证号码",
            rules: [],
        },
        {
            type: 'Input',
            label: '确认密码',
            required: true,
            name: 'card_id',
            Select: "请输入身份证号码",
            rules: [],
        },
        {
            type: 'Input',
            label: '真实姓名',
            required: true,
            name: 'card_id',
            Select: "请输入身份证号码",
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
            label: '性别',
            name: 'sex',
            required: true,
            rules: [],
            options: [
                {value: true, label: '男'},
                {value: false, label: '女'}
            ]
        },





    ]
    //表单的初始化值
    const initialValues = {
        radio: false, textArea: '', number: 0, name: ''
    }
    return (
        <Modal title="用户新增/修改" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <FromCommon fromKey={fromKey} formItem={formItem} formItemLayout={formItemLayout}
                        initialValues={initialValues} FieldsValue={FieldsValue} onFinish={onFinish}
                        buttonloading={buttonloading}>
            </FromCommon>
        </Modal>

    )
}

export default ModalComm

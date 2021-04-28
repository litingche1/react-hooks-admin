import { useState, useImperativeHandle, useRef } from "react";
import { Modal, message } from "antd";
import FromCommon from "compoents/Form";
import { validate_phone, validate_password } from "utils/validate";
import { userAdd, userDetailed, userEdit } from "api/user";
import CryptoJs from "crypto-js";
let formItem = [
    {
        type: "Input",
        label: "用户名",
        required: true,
        name: "username",
        Select: "请输入姓名"
    },
    {
        type: "Input",
        label: "密码",
        required: true,
        shouldUpdate: true,
        inputType: "password",
        name: "password",
        validateTrigger: "onBlur",
        blurEvent: true,
        Select: "请输入密码",
        rules: []
    },
    {
        type: "Input",
        label: "确认密码",
        required: true,
        shouldUpdate: true,
        inputType: "password",
        name: "confirmPassword",
        validateTrigger: "onBlur",
        blurEvent: true,
        Select: "请输入确认密码",
        rules: []
    },
    {
        type: "Input",
        label: "真实姓名",
        required: true,
        name: "truename",
        Select: "请输入真实姓名",
        rules: []
    },
    {
        type: "Input",
        label: "手机",
        required: true,
        name: "phone",
        Select: "请输入手机号码",
        rules: [
            () => ({
                validator(_, value) {
                    if (validate_phone(value)) {
                        return Promise.resolve();
                    }
                    return Promise.reject("手机格式不正确，请输入正确的手机号码!");
                }
            })
        ]
    },
    {
        type: "Radio",
        label: "禁启用状态",
        name: "status",
        required: true,
        rules: [],
        options: [
            { value: true, label: "启用" },
            { value: false, label: "禁用" }
        ]
    }
];
const ModalComm = props => {
    const { refreshTable } = props;
    const [isModalVisible, setisModalVisible] = useState(false);
    const [buttonloading, setbuttonloading] = useState(false);
    const [FieldsValue, setFieldsValue] = useState({});
    const [formData, setformData] = useState(formItem);
    const [userId, setuserId] = useState()
    const From = useRef();

    const handleCancel = () => {
        setisModalVisible(false);
        From.current.Rreset();
    };
    const open = value => {
        setisModalVisible(value);
    };
    const passwordValidate = ({ getFieldValue }) => ({
        validator(_, value) {
            let confirmPasswords = getFieldValue("confirmPassword");
            if (value) {
                if (confirmPasswords && confirmPasswords !== value) {
                    return Promise.reject("二次输入密码不一致");
                }

                if (validate_password(value)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject("请输入6到20位字母+数字的密码!");
                }
            } else {
                return Promise.reject("密码不能为空!");
            }
        }
    });
    const passwordsValidate = ({ getFieldValue }) => ({
        validator(_, value) {
            let confirmPasswords = getFieldValue("password");
            if (value) {
                if (confirmPasswords && confirmPasswords !== value) {
                    return Promise.reject("二次输入密码不一致");
                }
                return Promise.resolve("");
            } else {
                return Promise.reject("确认密码不能为空!");
            }
        }
    });
    //获取表单详情数据
    const getUserDetailed = async data => {
        const id = data.id;
        setFrom([1, 2], {
            1: {
                required: id ? false : true,
                rules: id ? "" : [passwordValidate]
            },
            2: {
                required: id ? false : true,
                rules: id ? "" : [passwordsValidate]
            }
        });
        if (!id) return;
        let res = await userDetailed({ id });
        setFieldsValue(res.data.data);
    };
    //父组件调用
    useImperativeHandle(props.cref, () => ({
        openModal: data => {
            open(data.status);
            getUserDetailed(data);
            const { id } = data
            id && setuserId(id)
        }
    }));
    //表单提交(添加)
    const onFinish = async value => {
        const data = value;
        data.passwor = CryptoJs.MD5(data.password).toString();
        delete data.confirmPassword;
        const res = await userAdd(data);
        message.success(res.data.message);
        setbuttonloading(true);
        setisModalVisible(false);
        refreshTable();
    };
    //表单提交(编辑)
    const onFinishEdit = async value => {
        const data = value;
        data.passwor = CryptoJs.MD5(data.password).toString();
        delete data.confirmPassword;
        data.id=userId
        const res = await userEdit(data);
        console.log(res)
        message.success(res.data.message);
        setbuttonloading(true);
        setisModalVisible(false);
        // refreshTable();
    };
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    };
    const fromKey = "parentId";

    const setFrom = (index, key) => {
        formItem = formItem.map((item, idx) =>
            index.includes(idx) ? { ...item, ...key[idx] } : item
        );
        setformData(formItem);
    };
    //
    const FormBlur = data => {
        console.log(data.id)
        const { value,id } = data;
        if (value) {
            if(id==='password'){
                    setFrom([1], {
                1: {
                    required: !value ? false : true,
                    rules: value ? [passwordValidate] : ""
                }
    
            });
            }
            if(id==='confirmPassword'){
                setFrom([2], {
                    2: {
                        required: !value ? false : true,
                        rules: value ? [passwordsValidate] : ""
                    }
                });
            }
        
        }
        console.log(data.value);
    };
    //表单的初始化值
    const initialValues = {
        // radio: false, textArea: '', number: 0, name: ''
    };
    return (
        <Modal
            title="用户新增/修改"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <FromCommon
                fromKey={fromKey}
                formItem={formData}
                formItemLayout={formItemLayout}
                initialValues={initialValues}
                FieldsValue={FieldsValue}
                onFinish={userId ? onFinishEdit : onFinish}
                buttonloading={buttonloading}
                cref={From}
                onBlur={FormBlur}
            ></FromCommon>
        </Modal>
    );
};

export default ModalComm;

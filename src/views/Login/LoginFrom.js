import { Fragment, useState } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { passwordCheckRule, validate_email } from '../../utils/validate'
import { Login, Getsms } from '../../api/account'
const LoginFrom = (props) => {
    const [username, setusername] = useState('')
    const [codeDisadled, setcodeDisadled] = useState(false)
    const [codeLoading, setcodeLoading] = useState(false)
    const [codeText, setcodeText] = useState('获取验证码')
    const onFinish = async (values) => {
        console.log(values)
        let res = await Login(values)
        console.log(res)

    }
    const goRegister = () => {
        props.showFromType('register')
    }
    //倒计时
    const countDown = () => {
        let sec = 60;
        let timer = ''
        setcodeLoading(false)
        setcodeDisadled(true)
        setcodeText(`${sec}s`)
        timer = setInterval(() => {
            sec--
            if (sec <= 0) {
                setcodeDisadled(false)
                setcodeText('重新获取')
                clearInterval(timer)
                return false
            }
            setcodeText(`${sec}s`)
        }, 1000)
    }
    const getCode = async () => {
        setcodeLoading(true)
        setcodeText('发送中')
        const requestData = {
            username,
            module: 'login'
        }
        let res = await Getsms(requestData)
        countDown()
        console.log(res)
        console.log(requestData)
        // Getsms(requestData).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     setcodeDisadled(false)
        //     setcodeText('重新获取')
        // })

    }
    return (
        <Fragment>
            <div className="form-header">
                <h4 className="column" onClick={goRegister}>注册</h4>
                <span>登录</span>
            </div>
            <div className="form-content">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value) {
                                        if (validate_email(value)) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject('邮箱格式不正确!');
                                        }
                                    } else {
                                        return Promise.reject('邮箱不能为空!');
                                    }


                                },
                            }),
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} value={username} placeholder="email" onChange={e => { setusername(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '密码不能为空' },
                            { pattern: passwordCheckRule, message: '请输入6到20位字母+数字的密码' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            { required: true, message: '验证码不能为空' },
                            { len: 6, message: '请输入6位验证码' }
                        ]}
                    >
                        <Row gutter={13}>
                            <Col className="gutter-row" span={15}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="code"
                                />
                            </Col>
                            <Col className="gutter-row" span={9}>
                                <Button type="primary" danger block disabled={codeDisadled} loading={codeLoading} onClick={getCode}>
                                    {codeText}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
    )
}

export default LoginFrom
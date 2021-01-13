import { Fragment, useState } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate_password, validate_email } from '../../utils/validate'
import Code from '../../compoents/code'
import { Register } from '../../api/account'
const RegisterFrom = (props) => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const module = 'register'
    const onFinish = async (value) => {
        console.log(value)
        let res = await Register(value)
        console.log(res)
    }
    const goLogin = () => {
        props.showFromType('login')
    }
    return (
        <Fragment>
            <div className="form-header">
                <h4 className="column">注册</h4>
                <span onClick={goLogin}>登录</span>
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={e => { setusername(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            ({ getFieldValue }) => ({
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
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={e => { setpassword(e.target.value) }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => { setconfirmPassword(e.target.value) }}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    let confirmPasswords = getFieldValue('password')
                                    if (value) {
                                        if (confirmPasswords && confirmPasswords !== value) {
                                            return Promise.reject('二次输入密码不一致');
                                        }
                                    } else {
                                        return Promise.reject('再次输入密码不能为空!');
                                    }


                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="confirmPassword"
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
                                    placeholder="Cord"
                                />
                            </Col>
                            <Col className="gutter-row" span={9}>
                                <Code username={username} module={module}></Code>
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

export default RegisterFrom

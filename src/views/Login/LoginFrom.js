import { Fragment, useState } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { passwordCheckRule, validate_email } from '../../utils/validate'
import { Login } from '../../api/account'
import Code from '../../compoents/code'
import CryptoJs from 'crypto-js';
import { withRouter } from 'react-router-dom';
const LoginFrom = (props) => {
    const [username, setusername] = useState('')
    const [loading, setloading] = useState(false)
    const onFinish = async (value) => {
        setloading(true)
        let params = {
            username: value.username,
            password: CryptoJs.MD5(value.password).toString(),
            code: value.code
        }
        let res = await Login(params)
        if (res.data.resCode === 0) {

            console.log(res)
            props.history.push('/index')
        }
        setloading(false)
    }
    const module = 'register'
    const goRegister = () => {
        props.showFromType('register')
    }
    return (
        <Fragment>
            <div className="form-header">
                <h4 className="column op3" onClick={goRegister}>注册</h4>
                <span className="op1">登录</span>
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
                                <Code username={username} module={module}></Code>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
    )
}

export default withRouter(LoginFrom)
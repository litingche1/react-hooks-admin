import { Fragment } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { passwordCheckRule } from '../../utils/validate'
import { Login } from '../../api/account'
const LoginFrom = (props) => {
    const onFinish = async (values) => {
        console.log(values)
        let res = await Login(values)
        console.log(res)

    }
    const goRegister = () => {
        props.showFromType('register')
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
                            { required: true, message: '邮箱不能为空' },
                            {
                                type: 'email', message: '邮箱格式不正确'
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '密码不能为空' },
                            { pattern: passwordCheckRule, message: '请输入6到20位字母+数字的密码' }
                            // ({ getFieldValue }) => ({
                            //     validator(_, value) {
                            //       if (value.length<6) {
                            //         return Promise.resolve('密码不能小于6位');
                            //       }else{
                            //           return Promise.reject('The two passwords that you entered do not match!');
                            //       }

                            //     },
                            //   }),
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
                                <Button type="primary" danger block>
                                    获取验证码
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
import { Fragment, useState } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Code from '../../compoents/code'
const RegisterFrom = (props) => {
    const [username, setusername] = useState('')
    const onFinish = () => {

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
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={e => { setusername(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please input your confirmPassword!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="confirmPassword"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={13}>
                            <Col className="gutter-row" span={15}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Cord"
                                />
                            </Col>
                            <Col className="gutter-row" span={9}>
                                <Code username={username}></Code>
                                {/* <Button type="primary" danger block>
                                    获取验证码
                </Button> */}
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

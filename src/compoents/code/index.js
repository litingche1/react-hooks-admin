import { Fragment, useState } from 'react'
import { Button, message } from 'antd';
import { Getsms } from '../../api/account'
const Code = (props) => {
    const [codeDisadled, setcodeDisadled] = useState(false)
    const [codeLoading, setcodeLoading] = useState(false)
    const [codeText, setcodeText] = useState('获取验证码')
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
        if (!props.username) {
            message.error('用户名能为空');
            return false
        }
        setcodeLoading(true)
        setcodeText('发送中')
        const requestData = {
            username: props.username,
            module: props.module
        }
        let res = await Getsms(requestData)
        countDown()
        console.log(res)
        console.log(requestData)
    }
    return (
        <Fragment>
            <Button type="primary" danger block disabled={codeDisadled} loading={codeLoading} onClick={getCode}>
                {codeText}
            </Button>
        </Fragment>
    )
}

export default Code
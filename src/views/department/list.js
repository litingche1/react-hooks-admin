import { useState, Fragment, useRef } from 'react'
import { Form, Input, Button, Switch, message } from 'antd';
import { DepartmentStatus } from 'api/department'
import { Link } from 'react-router-dom'
import TableCommon from 'compoents/table'
const DepartmentList = () => {
    const [keyWord, setkeyWord] = useState('')

    const [switchId, setswitchId] = useState()
    const table = useRef()
    //禁启用
    const swithOnChange = async (data) => {
        setswitchId(data.id)
        let params = {
            id: data.id,
            status: !data.status
        }
        let res = await DepartmentStatus(params)
        if (res.data.resCode === 0) {
            message.success(res.data.message)
            setswitchId()
        }
    }
    const tableConfig = {
        url: 'department',
        method: 'post',
        checkbox: true,
        columns: [
            { title: "部门名称", dataIndex: "name", key: "name" },
            {
                title: "禁启用", dataIndex: "status", key: "status",
                render: (status, rowData) => {
                    return <Switch loading={switchId === rowData.id} onChange={() => { swithOnChange(rowData) }} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                }
            },
            { title: "人员数量", dataIndex: "number", key: "number" },
            {
                title: "操作", dataIndex: "operation", key: "operation", width: 215,
                render: (text, rowData) => {
                    return (
                        <div className="inline-button">
                            <Link to={{ pathname: '/index/department/add', state: { id: rowData.id } }}><Button type="primary" onClick={() => { goPage(rowData.id) }}>编辑</Button></Link>

                            <Button className="ml10" onClick={e => { deleteList(rowData.id) }}>删除</Button>
                        </div>
                    )
                }
            },
        ]
    }
    //跳转到编辑页面
    const goPage = (id) => {
        console.log(id)
    }
    //搜索
    const onFinish = (value) => {
        // setpageNumber(1)
        // setpageSize(10)
        // getList()
    }
    //删除
    const deleteList = id => {
        table.current.deleteItem(id)
    }
    return (
        <Fragment>
            <Form layout="inline" onFinish={onFinish} style={{ marginBottom: '15px' }}>
                <Form.Item name="name" label="部门名称" >
                    <Input placeholder="请输入部门名称" value={keyWord} onChange={e => { setkeyWord(e.target.value) }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                </Form.Item>
            </Form>
            <TableCommon ref={table} batchButton={true} config={tableConfig}></TableCommon>
        </Fragment>
    )
}

export default DepartmentList

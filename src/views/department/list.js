import { useState, useEffect, Fragment } from 'react'
import { Form, Input, Button, Table } from 'antd';
import { DepartmentGetList } from '../../api/department'
const DepartmentList = () => {

    const [TableData, setTableData] = useState([])
    const [pageNumber, setpageNumber] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [keyWord, setkeyWord] = useState('')
    useEffect(() => {
        getList()
    }, [])
    const columns = [
        { title: "部门名称", dataIndex: "name", key: "name" },
        { title: "禁启用", dataIndex: "status", key: "status" },
        { title: "人员数量", dataIndex: "number", key: "number" },
        { title: "操作", dataIndex: "operation", key: "operation", width: 215 },
    ]
    const getList = async () => {
        const params = {
            pageNumber,
            pageSize
        }
        let res = await DepartmentGetList(params)
        setTableData(res.data.data.data)
    }
    const onFinish = (value) => {
        setpageNumber(1)
        setpageSize(10)
        console.log(value.name)
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
            <Table rowKey="id" columns={columns} dataSource={TableData} bordered>
            </Table>
        </Fragment>
    )
}

export default DepartmentList
import { useState, useEffect, Fragment } from 'react'
import { Form, Input, Button, Table, Switch, message, Modal } from 'antd';
import { DepartmentGetList, DepartmentDelete, } from 'api/department'
// import { DepartmentGetList, DepartmentDelete, } from '../../api/department'
const DepartmentList = () => {
    const [TableData, setTableData] = useState([])
    const [pageNumber, setpageNumber] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [keyWord, setkeyWord] = useState('')
    const [isModalVisible, setisModalVisible] = useState(false)
    const [itemId, seteitemId] = useState()
    useEffect(() => {
        getList()
    }, [])
    const columns = [
        { title: "部门名称", dataIndex: "name", key: "name" },
        {
            title: "禁启用", dataIndex: "status", key: "status",
            render: (text, rowData) => {
                return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.statys === '1' ? true : false} />
            }
        },
        { title: "人员数量", dataIndex: "number", key: "number" },
        {
            title: "操作", dataIndex: "operation", key: "operation", width: 215,
            render: (text, rowData) => {
                return (
                    <div className="inline-button">
                        <Button type="primary">编辑</Button>
                        <Button onClick={e => { deleteItem(rowData.id) }}>删除</Button>
                    </div>
                )
            }
        },
    ]
    //获取表格数据
    const getList = async () => {
        const params = {
            pageNumber,
            pageSize
        }
        if (keyWord) {
            params.name = keyWord
        }
        let res = await DepartmentGetList(params)
        setTableData(res.data.data.data)
    }
    //搜索
    const onFinish = (value) => {
        setpageNumber(1)
        setpageSize(10)
        getList()
    }
    //复选框方法
    const onCheckbox = (value) => {
        console.log(value)
    }
    //表格复选框
    const rowSelection = {
        onChange: onCheckbox
    }
    //删除单一项
    const deleteItem = id => {
        if (!id) return false
        setisModalVisible(true)
        seteitemId(id)
    }
    const handleOk = async () => {
        let res = await DepartmentDelete({ id: itemId })
        if (res.data.resCode === 0) {
            message.success(res.data.message)
            setisModalVisible(false)
            getList()
        }
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
            <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={TableData} bordered>
            </Table>
            <Modal title="提示！" okText="确定" cancelText="取消" visible={isModalVisible} onOk={handleOk} onCancel={() => { setisModalVisible(false) }}>
                <p className="tex-c">确定删除该信息吗？<strong className="color-red">删除后将无法恢复</strong></p>
            </Modal>
        </Fragment>
    )
}

export default DepartmentList
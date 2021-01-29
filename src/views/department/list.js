import { useState, Fragment, useRef } from 'react'
import { Button, Switch, message } from 'antd';
import { DepartmentStatus } from 'api/department'
import { Link } from 'react-router-dom'
import TableCommon from 'compoents/table'
import store from 'stroe'
import { add } from 'stroe/action/config'
import FromSearch from 'compoents/FromSearch'
const DepartmentList = () => {

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
    store.dispatch(add('所有1', 'all'))
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
        ],
    }
    const formItem=[
        {
            type: 'Input',
            label: '部门名称',
            required: true,
            name: 'name',
            rules: []
        },
        {
            type: 'Select',
            label: '人员数量',
            name: 'number',
            required: true,
            rules: [],
            optionkey: 'select',
            style: { width: '100px' }
        },
    ]
    //跳转到编辑页面
    const goPage = (id) => {
        console.log(id)
    }
    //删除
    const deleteList = id => {
        table.current.deleteItem(id)
    }
    return (
        <Fragment>
            <FromSearch formItem={formItem}/>
            <TableCommon ref={table} batchButton={true} config={tableConfig}></TableCommon>
        </Fragment>
    )
}

export default DepartmentList

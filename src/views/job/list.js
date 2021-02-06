import { useState, Fragment, useRef } from 'react'
import { Button, Switch, message } from 'antd';
import { JobStatus } from 'api/job'
import { Link } from 'react-router-dom'
import TableCommon from 'compoents/table'
import FromSearch from 'compoents/FromSearch'
const JobList = () => {

    const [switchId, setswitchId] = useState()
    const table = useRef()
    //禁启用
    const swithOnChange = async (data) => {
        setswitchId(data.jobId)
        let params = {
            id: data.jobId,
            status: !data.status
        }
        let res = await JobStatus(params)
        if (res.data.resCode === 0) {
            message.success(res.data.message)
            setswitchId()
        }
    }
    const tableConfig = {
        url: 'job',
        method: 'post',
        checkbox: true,
        columns: [
            { title: "职位名称", dataIndex: "jobName", key: "jobName" },
            { title: "部门名称", dataIndex: "name", key: "name" },
            {
                title: "禁启用", dataIndex: "status", key: "status",
                render: (status, rowData) => {
                    return <Switch loading={switchId === rowData.jobId} onChange={() => { swithOnChange(rowData) }} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                }
            },
            {
                title: "操作", dataIndex: "operation", key: "operation", width: 215,
                render: (text, rowData) => {
                    return (
                        <div className="inline-button">
                            <Link to={{ pathname: '/index/job/add', state: { id: rowData.jobId } }}><Button type="primary" onClick={() => { goPage(rowData.jobId) }}>编辑</Button></Link>

                            <Button className="ml10" onClick={e => { deleteList(rowData.jobId) }}>删除</Button>
                        </div>
                    )
                }
            },
        ],
    }
    const formItem = [
        {
            type: 'SelectData',
            label: '部门名称',
            required: true,
            name: 'name',
            rules: [],
            style: { width: '200px' },
            url: 'getdepartment',
            propsKey: {
                value: 'id',
                label: 'name'
            }
        },
        {
            type: 'Input',
            label: '职位名称',
            name: 'jobName',
            required: true,
            rules: [],

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
            <FromSearch formItem={formItem} url={tableConfig.url} />
            <TableCommon rowKey={record => record.jobId} cref={table} batchButton={true} config={tableConfig}></TableCommon>
        </Fragment>
    )
}

export default JobList

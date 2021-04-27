import {useState, Fragment, useRef} from 'react'
import {Button, Switch, message} from 'antd';
import {userstatus} from 'api/user'
import TableCommon from 'compoents/table'
import FromSearch from 'compoents/FromSearch'
import ModalComm from './compoents/Modal'

const UserList = () => {

    const [switchId, setswitchId] = useState()
    const table = useRef()
    const modal = useRef()
    //禁启用
    const swithOnChange = async (data) => {
        setswitchId(data.id)
        let params = {
            id: data.id,
            status: !data.status
        }
        let res = await userstatus(params)
        if (res.data.resCode === 0) {
            message.success(res.data.message)
            setswitchId()
        }
    }
    const tableConfig = {
        url: 'user',
        method: 'post',
        checkbox: true,
        columns: [
            {title: "姓名", dataIndex: "username", key: "username"},
            {title: "真实姓名", dataIndex: "truename", key: "truename"},
            {title: "手机", dataIndex: "phone", key: "phone"},
            {title: "权限", dataIndex: "role_str", key: "role_str"},
            {
                title: "禁启用", dataIndex: "status", key: "status",
                render: (status, rowData) => {
                    return <Switch loading={switchId === rowData.id} onChange={() => {
                        swithOnChange(rowData)
                    }} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status}/>
                }
            },
            {
                title: "操作", dataIndex: "operation", key: "operation", width: 215,
                render: (text, rowData) => {
                    return (
                        <div className="inline-button">
                            <Button
                                type="primary" onClick={() => {
                                goPage(rowData.id)
                            }}>编辑</Button>

                            <Button className="ml10" onClick={e => {
                                deleteList(rowData.id)
                            }}>删除</Button>
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
            style: {width: '200px'},
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
        modal.current.openModal({status:true,id})
    }
    //删除
    const deleteList = id => {
        table.current.deleteItem(id)
    }
    //打开弹出框
    const openModalComm = () => {
        modal.current.openModal({status:true})
    }
    //刷新表格
    const getTabelList = () => {
        table.current.getList()
    }
    return (
        <Fragment>
            <FromSearch formItem={formItem} url={tableConfig.url}>
                <Button type="primary" htmlType="submit" onClick={() => {
                    openModalComm()
                }}>添加用户</Button>
            </FromSearch>
            <TableCommon rowKey={record => record.id} cref={table} batchButton={true} config={tableConfig}>
            </TableCommon>
            <ModalComm cref={modal} refreshTable={getTabelList}></ModalComm>
        </Fragment>
    )
}

export default UserList

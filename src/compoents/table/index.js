import { useState, useEffect, Fragment, forwardRef, useImperativeHandle } from 'react'
import { Button, Table, Row, Col, Pagination, Modal, message } from 'antd';
import { TableList, DeleteList } from 'api/table'
import PropTypes from 'prop-types';
import requestUrl from 'utils/requestUrl'
const TableCommon = forwardRef((props, ref) => {
    const [TableData, setTableData] = useState([])
    const [tableLoading, settableLoading] = useState(false)
    const [pageNumber, setpageNumber] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [total, settotal] = useState(0)
    const [prepageSize, prepageSizeset] = useState(10)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [itemId, setitemId] = useState()
    const [SelectList, setSelectList] = useState([])
    useEffect(() => {
        if (prepageSize !== pageSize) {
            setpageNumber(1)
        }
    }, [pageSize])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        getList()
    }, [pageNumber])// eslint-disable-line react-hooks/exhaustive-deps
    const { columns, url, method, checkbox, rowKey } = props.config
    //获取表格数据
    const getList = async () => {
        settableLoading(true)
        const resData = {
            url: requestUrl[url],
            method,
            params: {
                pageNumber,
                pageSize
            }

        }
        // if (keyWord) {
        //     params.name = keyWord
        // }
        let res = await TableList(resData)
        if (res.data.resCode === 0) {
            setTableData(res.data.data.data)
            settotal(res.data.data.total)
            settableLoading(false)
            prepageSizeset(pageSize)
        }

    }
    //分页的当前页
    const onChangeCurrnePage = (value, page) => {
        setpageNumber(value)
    }
    //每页条数
    const onShowSizeChange = (value, page) => {
        setpageSize(page)
    }
    //复选框方法
    const onCheckbox = (value) => {
        setSelectList(value)
    }
    //表格复选框
    const rowSelection = {
        onChange: onCheckbox
    }
    //父组件调用删除
    useImperativeHandle(ref, () => {
        return {
            deleteItem(id) {
                deleteList(id)
            }
        }
    })
    //删除
    const deleteList = id => {
        if (id) {
            setitemId(id)

        } else {
            if (SelectList.length <= 0) return false
            let idlist = SelectList.join()
            setitemId(idlist)
        }
        setisModalVisible(true)

    }
    const handleOk = async () => {
        const resData = {
            url: requestUrl[`${url}delete`],
            method,
            params: {
                id: itemId
            }

        }
        let res = await DeleteList(resData)
        if (res.data.resCode === 0) {
            message.success(res.data.message)
            setisModalVisible(false)
            setSelectList([])
            getList()
        }
    }
    return (
        <Fragment>
            <Table pagination={false} rowKey={rowKey ? rowKey : "id"} rowSelection={checkbox ? rowSelection : null} loading={tableLoading} columns={columns} dataSource={TableData} bordered></Table>
            <Row className="mt10">
                <Col span={8}>
                    {
                        props.batchButton && <Button onClick={() => { deleteList() }}>批量删除</Button>
                    }
                </Col>
                <Col span={16}>
                    <Pagination
                        className="pull-right"
                        current={pageNumber}
                        onChange={onChangeCurrnePage}
                        onShowSizeChange={onShowSizeChange}
                        total={total}
                        showTotal={total => `总共${total} 条`}
                        showQuickJumper
                        showSizeChanger
                        pageSize={pageSize}
                    />
                </Col>
            </Row>
            <Modal title="提示！" okText="确定" cancelText="取消" visible={isModalVisible} onOk={handleOk} onCancel={() => { setisModalVisible(false) }}>
                <p className="tex-c">确定删除该信息吗？<strong className="color-red">删除后将无法恢复</strong></p>
            </Modal>
        </Fragment>
    )
})
//校验数据类型
TableCommon.propTypes = {
    config: PropTypes.object
}
//默认值
TableCommon.defaultProps = {
    batchButton: false
}
export default TableCommon
import { useState, useEffect, Fragment, useImperativeHandle } from 'react'
import { Button, Table, Row, Col, Pagination, Modal, message } from 'antd';
import { DeleteList } from 'api/table'
import PropTypes from 'prop-types';
import requestUrl from 'utils/requestUrl'
import { getList } from 'utils/fromTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addDepartment } from 'stroe/action/department'
let TableCommon = (props) => {
    const [tableLoading, settableLoading] = useState(false)
    const [pageNumber, setpageNumber] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    // const [total, settotal] = useState(props.list.departmentList.total)
    const [prepageSize, prepageSizeset] = useState(10)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [itemId, setitemId] = useState()
    const [SelectList, setSelectList] = useState([])
    useEffect(() => {
        if (prepageSize !== pageSize) {
            setpageNumber(1)
        }
    }, [pageSize])
    useEffect(() => {
        getData()
        return () => {
            props.actions.addDate({ data: [], total: 0 })
        }
    }, [pageNumber])
    const { columns, url, method, checkbox } = props.config
    const { total } = props.list.departmentList
    const { rowKey } = props
    //获取表格数据
    const getData = async () => {
        settableLoading(true)
        const params = {
            url,
            pageNumber,
            method,
            pageSize,
        }
        let res = await getList(params)
        if (res.data.resCode === 0) {
            props.actions.addDate(res.data.data)
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
        console.log(value)
        setSelectList(value)
    }
    //表格复选框
    const rowSelection = {
        onChange: onCheckbox
    }
    //父组件调用删除
    useImperativeHandle(props.cref, () => ({
        deleteItem: (id) => {
            deleteList(id)
        }
    }))
    //删除
    const deleteList = id => {
        if (id) {
            setitemId(id)
        } else {
            if (SelectList.length <= 0) return false
            let idList = SelectList.join()
            setitemId(idList)
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
            getData()
        }
    }
    return (
        <Fragment>
            <Table pagination={false} rowKey={rowKey ? rowKey : "id"} rowSelection={checkbox ? rowSelection : null} loading={tableLoading} columns={columns} dataSource={props.list.departmentList.data} bordered></Table>
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
}
//校验数据类型
TableCommon.propTypes = {
    config: PropTypes.object
}
//默认值
TableCommon.defaultProps = {
    batchButton: false
}
//把store中的数据映射到这个组件变成props
const mapStateToProps = state => {
    return {
        list: state.department
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({//多个action的处理
            addDate: addDepartment,
        }, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableCommon)

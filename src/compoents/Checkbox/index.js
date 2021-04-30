import { Checkbox } from 'antd';
import { useEffect, useState } from 'react'
const CheckboxGroup = Checkbox.Group;
const CheckboxCom = (props) => {
    const [checkAll, setcheckAll] = useState(false)
    const [indeterminate, setindeterminate] = useState(false)
    const [checkedList, setcheckedList] = useState([])
    const [plainOptions, setplainOptions] = useState(props.data.child_item)
    const { label, value, child_item } = props.data
    const onCheckAllChange = (e) => {
        setindeterminate(false)
        const status = e.target.checked
        let childList = []
        if (status && child_item && child_item.length > 0) {
            childList = child_item.map(item => item.value)
            setcheckedList(childList)
            setcheckAll(true)
        } else {
            setcheckedList([])
            setcheckAll(false)
        }
    }
    const onChange = (value) => {
        //全选，全不选，选中一部分
        const selectedNumber = value.length
        const all = child_item.length
        //全选
        if (all === selectedNumber) {
            setcheckAll(true)
            setindeterminate(false)
        } else {
            if (selectedNumber === 0) {//反选
                setcheckAll(false)
                setindeterminate(false)
            } else {//选中一部分
                setindeterminate(true)
            }

        }
        setcheckedList(value)

    }

    return (
        <div>
            <div>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    {label}
                </Checkbox>
            </div>
            <div>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </div>

        </div>
    )
}

export default CheckboxCom
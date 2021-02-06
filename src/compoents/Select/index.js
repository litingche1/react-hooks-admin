import { useEffect, useState } from 'react'
import { Select } from 'antd'
import requestUrl from 'utils/requestUrl'
import { TableList } from 'api/table'
const { Option } = Select
const GetRemoteSelect = props => {
    const { data, url, onChange, name } = props
    const [selectData, setselectData] = useState([])
    const [selectValue, setselectValue] = useState([])
    useEffect(() => {
        getList()
        return () => {
            setselectData([])
            setselectValue([])
        }
    }, [url])

    const getList = async () => {
        const params = {
            url: requestUrl[url]
        }
        let res = await TableList(params)
        setselectData(res.data.data.data)
    }
    const onSelectChange = (newValue) => {
        setselectValue(newValue)
        triggerChange(newValue)
    }
    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange({
                [name]: Number(changedValue)
            });
        }
    };
    return (
        <Select value={selectValue} onChange={onSelectChange} style={data.style} placeholder={data.Select}>
            {
                selectData && selectData.map(elem => {
                    return <Option value={data.propsKey && elem[data.propsKey.value]} key={data.propsKey && elem[data.propsKey.value]}>{data.propsKey && elem[data.propsKey.label]}</Option>
                })
            }

        </Select>
    )
}

export default GetRemoteSelect
import { useEffect, useState } from 'react'
import { Select } from 'antd'
import requestUrl from 'utils/requestUrl'
import { TableList } from 'api/table'
const { Option } = Select
const GetRemoteSelect = props => {
    const [selectData, setselectData] = useState([])
    useEffect(() => {

        getList()
    }, [])
    const getList = async () => {
        const params = {
            url: requestUrl[url]
        }
        let res = await TableList(params)
        setselectData(res.data.data.data)
        console.log(res)
    }
    const { data, url } = props
    console.log()
    return (
        <Select style={data.style} placeholder={data.Select}>
            {
                selectData && selectData.map(elem => {
                    return <Option value={data.propsKey && elem[data.propsKey.value]} key={data.propsKey && elem[data.propsKey.value]}>{data.propsKey && elem[data.propsKey.label]}</Option>
                })
            }

        </Select>
    )
}

export default GetRemoteSelect
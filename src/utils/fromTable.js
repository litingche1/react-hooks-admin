import requestUrl from 'utils/requestUrl'
import { TableList } from 'api/table'
export const getList = async (data) => {
    const resData = {
        url: requestUrl[data.url],
        method: data.method,
        params: {
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
        }

    }
    if (data.keyWord) {
        for (let key in data.keyWord) {
            resData.params[key] = data.keyWord[key]
        }
    }
    let res = await TableList(resData)
    return res
}
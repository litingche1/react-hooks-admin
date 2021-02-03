
import { departmentTable } from 'stroe/type'
const department = {
    departmentList: []
}
const departmentReducer = (state = department, action) => {
    switch (action.type) {
        case departmentTable: {
            return {
                ...state,
                departmentList: action.data && action.data
            }
        }
        default:
            return state
    }
}
export default departmentReducer

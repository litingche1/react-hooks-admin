import { departmentTable } from '../type'
export const addDepartment = (data) => {
    return {
        type: departmentTable,
        data
    }
}

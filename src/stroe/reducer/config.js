import { addConfig, updateConfig } from '../type'
const config = {
    select: [
        { value: true, label: '启用' },
        { value: false, label: '禁用' }
    ]
}
const configReducer = (state = config, action) => {
    switch (action.type) {
        case addConfig: {
            return {
                ...state,
                select: [...state.select, action.data]
            }
        }
        default:
            return state
    }


    // return state
}
export default configReducer

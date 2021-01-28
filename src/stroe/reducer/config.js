const config={
    select:[
        { value: true, label: '启用' },
        { value: false, label: '禁用' }
    ]
}
const configReducer = (state=config,action)=>{
    return state
}
export default configReducer

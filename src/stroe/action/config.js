import {addConfig,updateConfig} from '../type'
export const add=(label,value)=>{
     return{
         type:addConfig,
         data:{label,value}
     }
}
export const update=(label,value)=>{
    return{
        type:updateConfig,
        data:{label,value}
    }
}
import {useState} from 'react'
const AddUsers = () => {
    const [df,setdf] = useState(1)
    console.log(0)
    return (
        <div>
            <div>AddUsers</div>
        <span>{df}</span>
            <div></div>
        <button onClick={()=>{setdf(df*1+1)}}>修改</button>
        </div>
    )
}

export default AddUsers

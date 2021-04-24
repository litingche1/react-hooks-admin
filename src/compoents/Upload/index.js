import {useEffect, useState} from 'react'
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
// import requestUrl from 'utils/requestUrl'
import {uploadFile} from 'api/common'
const UploadCom = props => {
    const {data, url, onChange, name, value} = props
    const [loading, setloading] = useState(false)
    const [imageUrl, setimageUrl] = useState('')
    const [names, setnames] = useState(name)
    const [fileToken,setfileToken]=useState("")
    const [fileKey,setfileKey]=useState("")
    useEffect(() => {

    }, [url])
    useEffect(() => {

    }, [value])
    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
    const getImgToken=async()=>{
        const res=await uploadFile({
            ak:'M7OJ0d13ozojgG0tvDJkOzLWwrBIsnC63YKu-B8u',
            sk:'6CT7BlaTuy7KovJ2ck6GrGKTa9Xi7ZYHqROK-EDe',
            buckety:'litingchen-react',
        })
        if(res.data.resCode===0){
            setfileToken(res.data.data.token)
        }else{
            message.error('获取七牛云token参数错误')
        }

    }
    //图片上传之前
    const beforeUpload = async (file) => {
        const token=await getImgToken()
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        //解析文件
        const name=file.name;
        const key=encodeURI(`${name}`)
        //更新文件的key
        setfileKey(key)
        return isJpgOrPng && isLt2M;
    }
    //图片上传成功
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setloading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info)
            const fileInfo=info.file.response;
            const fileName=`http://qs2p1bv2z.hn-bkt.clouddn.com/${fileInfo.key}`
                Promise.all([setloading(true), setimageUrl(fileName)]).then(res => {
                    triggerChange(fileName)
                })
        }
    };
    // const onSelectChange = (newValue) => {
    //
    //     triggerChange(newValue)
    // }
    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange({
                [names]: changedValue
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>上传图片</div>
        </div>
    );
    const fileData={token:fileToken,key:fileKey}
    return (

        <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            data={fileData}
            action="http://up-z2.qiniup.com"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
    )
}

export default UploadCom

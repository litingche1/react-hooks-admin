import {useEffect, useState} from 'react'
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import requestUrl from 'utils/requestUrl'

const UploadCom = props => {
    const {data, url, onChange, name, value} = props
    console.log(onChange)
    const [loading, setloading] = useState(false)
    const [imageUrl, setimageUrl] = useState('')
    const [names, setnames] = useState(name)
    useEffect(() => {

    }, [url])
    useEffect(() => {

    }, [value])
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    //图片上传之前
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
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
            getBase64(info.file.originFileObj, imageUrl =>
                Promise.all([setloading(true), setimageUrl(imageUrl)]).then(res => {
                    triggerChange(imageUrl)
                })
            );
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
    return (

        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
    )
}

export default UploadCom

import {useEffect, useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Upload} from 'api/common'

const RichText = props => {
    const {data, url, onChange, name, value} = props
    // const [loading, setloading] = useState(false)
    // const [imageUrl, setimageUrl] = useState('')
    // const [names, setnames] = useState(name)
    // const [fileToken,setfileToken]=useState("")
    // const [fileKey,setfileKey]=useState("")
    // useEffect(() => {
    //
    // }, [url])
    // useEffect(() => {
    //
    // }, [value])
    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange(changedValue)
            // onChange({
            //     [names]: changedValue
            // });
        }
    };
    const editorObj = {
        height: '800px',
        language: 'zh_CN',
        plugins: 'table lists link image preview code',
        toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
            link image | alignleft aligncenter alignright alignjustify  | 
            numlist bullist outdent indent`,
        relative_urls: false,
        file_picker_types: 'image',
        images_upload_url: 'http',
        image_advtab: true,
        image_uploadtab: true,
        images_upload_handler: (blobInfo, success, failure) => {
            var formData;
            var file = blobInfo.blob();//转化为易于理解的file对象
            formData = new FormData();
            formData.append('file', file, file.name);//此处与源文档不一样
            Upload(formData).then(response => {
                console.log(response.data.data)
                const data = response.data.data.url;
                success(data);
            }).catch(err => {
                const data = err.data
                failure(data.message)
            })
        }
    }
    const handleEditorChange = (value) => {
        triggerChange(value)
        console.log(value)
    }
    return (
        <Editor
            inline={false}
            selector='editorStateRef'  // 选择器
            apiKey='官网上申请的key值'
            initialValue={"1111"}
            init={{...editorObj}}
            onEditorChange={handleEditorChange}
        />

    )
}

export default RichText

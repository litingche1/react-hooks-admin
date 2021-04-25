/*
 * 七牛云token
 */
import serves from "../utils/request";

export function uploadFile(data) {
    return serves.request({
        url: '/uploadIToken/',
        method: 'post',
        data
    })
}
/*
 * 富文本他图片上传
 */

export function Upload(data) {
    return serves.request({
        url: '/upload/',
        method: 'post',
        data
    })
}

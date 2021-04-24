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
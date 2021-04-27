export const passwordCheckRule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
const emailCheckRule = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
const phoneCheckRule=/^1[3456789]\d{9}$/
export function validate_email(value) {
    return emailCheckRule.test(value)
}
export function validate_phone(value){
    return phoneCheckRule.test(value)
}
export function validate_password(value) {
    return passwordCheckRule.test(value)
}

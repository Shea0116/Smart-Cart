import request from "@/utils/request"

//todo 获取图形验证码
export const getPicCode = () => {
    return request.get('captcha/image')
}

//todo 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
    return request.post('/captcha/sendSmsCaptcha', {
      form: {
        captchaCode,
        captchaKey,
        mobile
      }
    })
}

//todo 登录接口
export const Login = (mobile , smsCode) => {
    return request.post("/passport/login", {
        form: {
            isParty: false,
            partyData: {},
            mobile,
            smsCode
        }
    })
}
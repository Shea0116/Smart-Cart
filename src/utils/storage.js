// vuex 持久化处理
const InfoKey = 'shopping_userInfo'

// 获取个人信息
export const getInfo = () => {
    const defaultObj = { token: '', userId: '' }
    const result = localStorage.getItem(InfoKey)
    return result ? JSON.parse( result ) :defaultObj
}

// 设置个人信息
export const setInfo = info => {
    localStorage.setItem( InfoKey, JSON.stringify(info))
}

// 删除个人信息
export const removeInfo = () => {
    localStorage.removeItem( InfoKey )
}

const HistoryKey = 'historylist'

// 获取搜索历史
export const getHistoryList = () => {
    const result = localStorage.getItem(HistoryKey)
    return result ? JSON.parse(result) : []
}
  
// 设置搜索历史
export const setHistoryList = (arr) => {
    localStorage.setItem(HistoryKey, JSON.stringify(arr))
}
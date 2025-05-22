import request from "@/utils/request";

// 获取首页数据以供渲染
export const getHomeData = () => {
    return request.get('page/detail', {
        params: {
            pageId: 0
        }
    })
}
import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 获取订单信息

//! 思路分析：这里的订单结算，有两种情况：
// 1. 购物车结算，需要两个参数
//    ① mode="cart"
//    ② cartIds="cartId, cartId"
// 2. 立即购买结算，需要三个参数
//    ① mode="buyNow"
//    ② goodsId="商品id" 
//    ③ goodsSkuId="商品skuId"
// 都需要跳转时将参数传递过来

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
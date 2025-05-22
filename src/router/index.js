import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Layout from '@/views/layout/layout.vue'
import Search from '@/views/search'
import SearchList from '@/views/search/list.vue'
import Prodetail from '@/views/prodetail/prodetail.vue'
import Pay from '@/views/pay/pay.vue'
import MyOrder from '@/views/myorder/myorder.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'

import store from '@/store'


Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    //! 商品详情需要id参数传入
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

//! 配置全局导航守卫
//* to:   到哪里去，到哪去的完整路由信息对象（路径，参数）
//* from: 从哪里来，从哪来的完整路由信息对象（路径，参数）
//* next()： 是否放行
//* （1）next()： 直接放行，放行到to要去的路径
//* （2）next(路径)： 进行拦截，拦截到next里的路径

//todo 定义数组，专门存放用户所有需要权限访问的页面
const limitUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!limitUrl.includes(to.path)) {
    next()
    return;
  }
  // 上方条件未执行，说明是限制页
  const token = store.state.user.userInfo.token
  console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router

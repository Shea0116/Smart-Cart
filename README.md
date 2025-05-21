# smart-shoppingcart

智慧商城项目

## *****0520 Dev-log*****

### 创建项目

基于 VueCli 自定义创建项目架子

* **安装脚手架**
* **创建项目**
* **选择自定义**
  * Babel / Router / Vuex / CSS / Linter
  * Vue2.x
  * VueRouter hash模式
  * CSS预处理 Less
  * ESLint
  * 配置文件 dedicated config files

### 调整初始化目录

1. 删除多余文件
2. 新增 api 与 utils目录

### Vant 全部导入

1. **安装 vant-ui**
   * `yarn add vant@latest-v2 `
2. **main.js中注册**
   ```
   import Vant from 'vant';
   import 'vant/lib/index.css';

   Vue.use(Vant);
   ```

### 项目中vw适配

基于 postcss 插件 实现项目vw适配

1. **安装插件** `yarn add postcss-px-to-viewport@1.1.1 -D`
2. **根目录新建 postcss.config.js 文件，填入配置**
   ```
   // postcss.config.js
   module.exports = {
       plugins: {
           'postcss-px-to-viewport': {
               // 标准屏宽度
               viewportWidth: 375
           }
       }
   }
   ```

### 路由设计配置

先借助Vant配置底部导航tabbar，再为其配置对应路由

* **在layout页配置tabber，并用to配置导航链接**

```
//! layout页
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      	<van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      	<van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      	<van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      	<van-tabbar-item to="user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
```

* **在router/index.js配置路由**

```
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

export default router
```

### 登录页面静态布局

1. **新建 style/common.less 重置默认样式**
2. **main.js 导入 common.less**
3. **图片素材放入 assets 目录备用**

![1747818575703](image/README/1747818575703.png "登录页面静态布局")

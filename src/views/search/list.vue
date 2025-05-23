<template>
    <div class="search">
      <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />
  
      <van-search
        readonly
        shape="round"
        background="#ffffff"
        :value="querySearch || '搜索商品'"
        show-action
        @click="$router.push('/search')"
      >
        <template #action>
          <van-icon class="tool" name="apps-o" />
        </template>
      </van-search>
  
      <!-- 排序选项按钮 -->
      <div class="sort-btns">
        <div class="sort-item" @click="handleSort('all')">综合</div>
        <div class="sort-item" @click="handleSort('sales')">销量</div>
        <div class="sort-item" @click="handleSort('price', sortPrice === 1 ? 0 : 1)">
          价格 
          <van-icon
            :name="sortPrice === 1 ? 'arrow-up' : 'arrow-down'" 
            class="sort-arrow"
          />
        </div>
      </div>
  
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item" ></GoodsItem>
      </div>
    </div>
</template>
  
<script>
  import GoodsItem from '@/components/GoodsItem.vue'
  import { getProList } from '@/api/product'
  export default {
    name: 'SearchList',
    data () {
        return {
            page: 1,
            proList: [],
            sortType: "",
            sortPrice: 0
        }
    },
    created () {
      this.changeSort()
    },
    components: {
      GoodsItem
    },
    computed: {
        querySearch () {
            //? 基于query解析路由参数
            return this.$route.query.search 
        }
    },
    methods: {
      handleSort (value, price) {
        this.sortType = value,
        this.sortPrice = price || 0
        this.changeSort()
      },
      async changeSort () {
        const { data: { list } } = await getProList({
            categoryId: this.$route.query.categoryId,
            goodsName: this.querySearch,
            page: this.page,
            sortType: "price",
            sortPrice: this.sortPrice
        })
        this.proList = list.data
      }
    }
  }
</script>
  
<style lang="less" scoped>
  .search {
    padding-top: 46px;
    ::v-deep .van-icon-arrow-left {
      color: #333;
    }
    .tool {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }
  
    .sort-btns {
      display: flex;
      height: 36px;
      line-height: 36px;
      .sort-item {
        text-align: center;
        flex: 1;
        font-size: 16px;
        position: relative;
        .sort-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 4px;
        }
      }
    }
  }
  
  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }
</style>
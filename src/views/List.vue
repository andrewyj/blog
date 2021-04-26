<template>
  <div class="container">
    <h1 class="post-title">Linux</h1>
    <div class="posts-list">

      <div class="post">
        <div class="status-list-item" data-aos="fade-up" 
        v-for="item in list" 
        v-bind:item="item" 
        v-bind:key="item.id">
          <div class="status-user">
            <router-link :to="'/article/'+item.id" class="status-btn">{{item.title}}</router-link>
            <p class="section-p">CSRF(Cross Site Request Forgery) 也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。</p>
            <p class="post-time">2021-12-1</p>
          </div>
        </div>

      </div>

      <!-- <div class="pagination">
        <div>
          <a href="javascript:;" id="loadMore">
            <i class="iconfont" hidden id="more">&#xe605;</i>
            <img
              id="noMore"
              style="width: 50px"
              src="//justforfun.oss-cn-beijing.aliyuncs.com/static/images/loading.gif"
            />
          </a>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
export default {
  name: "List",
  created() {
    this.getList()
  },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        page_size: 20,
        keywords: undefined
      },
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
  }
};
</script>
<style lang="scss">
.pagination {
  position: relative;
  display: block;
  text-align: center;
  width: 300px;
  margin: 0 auto;
  i {
    font-size: 40px;
  }
}
</style>
<style lang="scss">
@import "~@/style/list.scss";
</style>

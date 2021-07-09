<template>
  <div class="container">
    <h1 class="post-title" v-if="title">{{title}}</h1>
    <div class="posts-list">

      <div class="post">
        <div class="status-list-item" data-aos="fade-up" 
        v-for="item in list" 
        v-bind:item="item" 
        v-bind:key="item.id">
          <div class="status-user">
            <router-link :to="getRouteUrl(item.id)" class="status-btn">{{item.title}}</router-link>
            <p class="section-p">{{item.abstract}}</p>
            <p class="post-time">{{item.created_at}}</p>
          </div>
        </div>
      </div>

      <div class="pagination">
        <span class="extend prev" v-if="listQuery.page > 1" @click="prevPage()"><i class="iconfont">&#xe6a0;</i></span>
        <span class="page-number" v-if="listQuery.page > 1" @click="firstPage()">1</span>
        <span class="space" v-if="listQuery.page > 3">…</span>
        <span class="page-number" v-if="listQuery.page-1 > 1" @click="prevPage()">{{listQuery.page-1}}</span>
        <span class="page-number current">{{listQuery.page}}</span>
        <span class="page-number" v-if="listQuery.page+1 < totalPage" @click="nextPage()">{{listQuery.page+1}}</span>
        <span class="space" v-if="totalPage - listQuery.page > 2">…</span>
        <span class="page-number" v-if="listQuery.page < totalPage" @click="lastPage()">{{totalPage}}</span>
        <span class="extend next" v-if="listQuery.page < totalPage" @click="nextPage()"><i class="iconfont">&#xe69f;</i></span>
      </div>

    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { fetchCategory } from '@/api/category'
import { fetchArticleTag } from '@/api/tag'
import AOS from 'aos'

export default {
  name: "List",
  data() {
    return {
      list: null,
      totalPage: 0,
      title: null,
      listQuery: {
        page: 1,
        category_id: null,
        tag_id: null,
        keyword: null
      },
    }
  },
  watch: { 
    '$route': {
        handler() {
          this.init()
        },
        deep: true,
        immediate: true,
      } 
  },
  methods: {
    nextPage() {
      this.listQuery.page +=1
      this.getList()
    },
    prevPage() {
      this.listQuery.page -=1
      this.getList()
    },
    firstPage() {
      this.listQuery.page = 1
      this.getList()
    },
    lastPage() {
      this.listQuery.page = this.totalPage
      this.getList()
    },
    init() {
      this.listQuery.keyword = this.$route.query.keyword
      this.listQuery.category_id = this.$route.query.category_id
      this.listQuery.tag_id = this.$route.query.tag_id
      this.listQuery.page = 1
      this.getTitle()
      this.getList()
    },
    getList() {
      this.$isLoading(true)
      let vm = this
      fetchList(this.listQuery).then(response => {
        scrollTo(0,0)
        setTimeout(function(){ AOS.refresh() }, 100);
        this.$isLoading(false)
        this.list = response.data.list
        this.totalPage = response.data.total_page
        this.listQuery.page = response.data.page
      }).catch(function() {
        vm.$isLoading(false)
      })
    },
    getTitle() {
      if (this.listQuery.category_id) {
        fetchCategory(this.listQuery.category_id).then(response => {
          this.title = response.data.name
        })
      } else if (this.listQuery.tag_id) {
        fetchArticleTag(this.listQuery.tag_id).then(response => {
          if (response.data) {
            this.title = '#' +response.data.name
          }
        })
      } else if (this.$route.query.keyword) {
        this.title = '"'+this.$route.query.keyword+'"'
      } else {
        this.title = ''
      }
      
    },
    getRouteUrl(articleId) {
      let url = '/article/'+articleId
      let query = ''
      if (this.listQuery.keyword) {
        query += 'keyword='+this.listQuery.keyword
      }
      if (this.listQuery.tag_id) {
        query += 'tag_id='+this.listQuery.tag_id
      }
      if (this.listQuery.category_id) {
        query += 'category_id='+this.listQuery.category_id
      }
      if (query) {
        url = url+'?'+query
      }
      
      return url
    }
  }
};
</script>
<style lang="scss">
@import "~@/style/list.scss";
@import '~@/style/variables.scss';
.pagination {
    margin: 80px 0 40px;
    text-align: center;
    border-top: 1px solid $color-white;
    .page-number, .extend {
      cursor: pointer;
    }
    .prev, .next, .page-number {
        border-bottom: 0;
        border-top: 1px solid $color-white;
        transition-property: border-color;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
    }
    .page-number-basic, .prev, .next, .page-number, .space {
        display: inline-block;
        position: relative;
        top: -1px;
        margin: 0 10px;
        padding: 0 10px;
        line-height: 30px;
    }
    .page-number.current {
        color: $color-white;
        background: $color-gray;
        border-top-color: $color-gray;
    }
}
</style>

<template>
  <div>
    <div class="search-form search-form-modal" :class="isVisible">
      <div class="search-form-inner">
        <div class="filter-container">
            <input
              type="text"
              autocomplete="off"
              :placeholder="getTitle()"
              name="keyword"
              v-model="listQuery.keyword"
              v-on:keyup="onSearch"
            />
            <ul class="search-filtered">
              <li v-for="item in list" v-bind:item="item" v-bind:key="item.id" v-on:click="resetList(true)">
                <router-link :to="getRoute(item.id)">{{item.title}}</router-link>
              </li>
              <li><loadMore :isLoading="isLoading" :totalPage="totalPage" @nextPage="nextPage"/></li>
            </ul>
          </div>
      </div>
      <div id="mask" v-on:click="resetList(true)"></div>
    </div>

    <div class="hebin" data-aos="fade-down">
      <i class="js-toggle-search iconfont" v-on:click="isVisible = 'is-visible'" data-aos="fade-down">&#xe659;</i>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { fetchPhotos } from '@/api/photo'
import loadMore from "@/components/loadMore"

export default {
  name: "Search",
  data() {
    return {
      isLoading: false,
      isVisible: "",
      listQuery: {
        page: 1,
        keyword: ""
      },
      list: [],
      totalPage: 0,
      timeoutId:null,
      searchArticle: true
    };
  },
  components: {
    loadMore
  },
  watch: { 
    '$route': {
        handler() {
          this.searchArticle = true
          if (this.$route.path == '/photos') {
            this.searchArticle = false
          }
        },
        deep: true,
        immediate: true,
      } 
  },
  methods: {
    onSearch($e) {
      if ($e.keyCode == 13) { //回车
        this.resetList(true)
        const path = this.searchArticle ? '/?keyword='+this.listQuery.keyword : '/photos?keyword='+this.listQuery.keyword
        this.$router.push(path).catch(()=>{})
        return
      }
      if ($e.keyCode == 27) { //esc
        this.resetList(true)
        return
      }
      this.resetList()
      if (!this.listQuery.keyword) {
        return
      }
      this.isLoading = true
      this.timeoutId = setTimeout(() => {
        this.getList((list) => {
          this.list = list
          this.isLoading = false
        })
      }, 1000);
    },
    getList(callback) {
      const timeoutId = this.timeoutId
      const responseCallback = response => {
        if (timeoutId != this.timeoutId) { //fix：请求延迟结果被覆盖问题
          return
        }
        this.totalPage = response.data.total_page
        this.listQuery.page = response.data.page
        callback && callback(response.data.list)
      }
      if (this.searchArticle) {
        fetchList(this.listQuery).then(responseCallback)
      } else {
        fetchPhotos(this.listQuery).then(responseCallback)
      }
    },
    nextPage() {
      this.listQuery.page += 1
      this.isLoading = true
      this.getList((list) => {
        this.list = this.list.concat(list)
        this.isLoading = false
      })
    },
    resetList(isClose) {
      this.isLoading = false
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (isClose) {
        this.isVisible = ''
        setTimeout(()=>{
          this.listQuery.keyword = ''
          this.list = []
          this.listQuery.page = 1
          this.totalPage = 0
        }, 800)
        return
      }
      this.list = []
      this.listQuery.page = 1
      this.totalPage = 0
    },
    getTitle() {
      return this.searchArticle ? '文章、标题、分类、描述...' : '图片、标题、标签、描述...'
    },
    getRoute(id) {
      id = id ? '/'+id : ''
      let path = this.searchArticle ? '/article'+id : '/photos'+id
      if (this.listQuery.keyword) {
        path += '?keyword='+this.listQuery.keyword
      }
      return path
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/search.scss";
</style>



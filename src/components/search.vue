<template>
  <div>
    <div class="search-form search-form-modal" :class="isVisible">
      <div class="search-form-inner">
        <div class="filter-container">
            <input
              type="text"
              autocomplete="off"
              placeholder="图片/文章 标题、分类、描述..."
              name="keyword"
            />
            <ul class="search-filtered">
              <li><a href="">Nginx 完整配置示例</a></li>
              <li><a href="">Go-变量与常量</a></li>
              <li><a href="">Go-并发编程</a></li>
              <li><a href="">Go-函数</a></li>
              <li><a href="">Go-流程控制</a></li>
              <li><a href="">Go-面向对象</a></li>
            </ul>
          </div>
      </div>
      <div id="mask" v-on:click="isVisible = ''"></div>
    </div>

    <div class="hebin" data-aos="fade-down">
      <i class="js-toggle-search iconfont" v-on:click="isVisible = 'is-visible'"
        >&#xe60e;</i
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      isVisible: "",
    };
  },
  methods: {},
};
</script>
<style lang="scss">
@import "~@/style/search.scss";
</style>



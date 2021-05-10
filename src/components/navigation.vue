<template>
  <div class="navi aos-init aos-animate" :class="openStatus">
    <div
      class="bt-nav"
      :class="scrolled"
      data-aos="fade-down"
      v-on:click="toggleOpenStatus"
    >
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
    </div>
    <div class="navbar animated fadeInRight">
      <div class="inner">
        <nav class="main-navigation">
          <div id="main-menu">
            <div>
              <ul id="primary-menu">

                <li v-bind:class="{'current-menu-item': item.is_default, 'open': item.is_open}" 
                v-for="item in menuTree"
                v-bind:todo="item"
                v-bind:key="item.id"
                @click="handleClickMenu(item)">
                  <span v-if="item.children" class="menu-dropdown" @click="item.is_open = !item.is_open">
                    <i class="iconfont">&#xe619;</i>
                  </span>
                  <router-link :to="item.url">{{item.name}}</router-link>
                  <ul class="sub-menu" v-if="item.children">
                    <li v-for="child in item.children"
                    v-bind:todo="child"
                    v-bind:key="child.id"
                    @click="handleClickMenu(item)"
                    ><router-link :to="child.url">{{child.name}}</router-link></li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCategories } from '@/api/category'
export default {
  name: "Navigation",
  data() {
    return {
      openStatus: "open",
      scrolled: "",
      openPageItem: "",
      menuDropdownrotateDeg: 180,
      menuTree: []
    };
  },
  created() {
    let categoryMenuChildren = []
    fetchCategories().then(response => {
      for (let index in response.data) {
        let child = response.data[index]
        child.url = "/?category_id="+child.id
        child.is_default = 0
        categoryMenuChildren.push(child)
      }
    })
    
    this.menuTree = [
        {
          name: "首页",
          url: "/",
          is_default: 1,
        },
        {
          name: "博客",
          url: "/",
          is_default: 0,
          children: categoryMenuChildren
        },
        {
          name: "归档",
          url: "/archives",
          is_default: 0,
        }
      ]
  },
  mounted() {
    var vm = this;
    window.addEventListener("scroll", function () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 1) {
        vm.scrolled = "scrolled";
      } else {
        vm.scrolled = "";
      }
    });
  },
  methods: {
    handleClickMenu(currentItem) {
      for(let index in this.menuTree) {
        this.menuTree[index].is_default = false
      }
      currentItem.is_default = true
    },
    toggleOpenStatus() {
      if (this.openStatus === "open") {
        this.openStatus = "close";
      } else {
        this.openStatus = "open";
      }
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/navigation.scss";
</style>

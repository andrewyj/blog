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
                <li v-bind:class="{'open': item.is_open, 'current-menu-item': selectedMenuId == item.id}" 
                v-for="(item, index) in menuTree"
                v-bind:key="item.id">
                  <a @click="handleClickMenu(item)">
                    {{item.name}}
                    <span v-if="item.children" class="menu-dropdown" @click="dropdownMenu(index)">
                      <i class="iconfont">&#xe619;</i>
                    </span>
                  </a>
                  <ul class="sub-menu" v-if="item.children">
                    <li v-for="child in item.children"
                    v-bind:class="{'menu-child-selected': selectedMenuChildIds[item.id] && selectedMenuChildIds[item.id] == child.id}"
                    v-bind:key="child.id">
                      <a @click="handleClickMenu(item,child)">{{child.name}}</a>
                    </li>
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
      menuTree: [],
      selectedMenuId: 1,
      selectedMenuChildIds: {},
    };
  },
  created() {
    let categoryMenuChildren = []
    fetchCategories().then(response => {
      for (let index in response.data) {
        let child = response.data[index]
        child.url = "/?category_id="+child.id
        categoryMenuChildren.push(child)
      }
    })
    this.menuTree = [
      {
          id: 1,
          name: "首页",
          url: "/",
        },
        {
          id: 2,
          name: "分类",
          url: "",
          children: categoryMenuChildren,
        },
        {
          id: 3,
          name: "标签",
          url: "/tags",
        },
        {
          id: 4,
          name: "归档",
          url: "/archives",
        },
        {
          id: 5,
          name: "留言",
          url: "/comments",
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
    dropdownMenu(menuIndex) {
      let menu = this.menuTree[menuIndex]
      menu.is_open = !menu.is_open
      this.$set(this.menuTree, menuIndex, menu)
      this.selectedMenuId = menu.id
    },
    handleClickMenu(menu, child) {
      this.selectedMenuId = menu.id
      let url = menu.url
      if (child) {
        url = child.url
        this.selectedMenuChildIds[menu.id] = child.id
      }
      if (url) {
        this.openStatus = "open"
        this.$router.push(url).catch(()=>{})
      }
    },
    toggleOpenStatus() {
      if (this.openStatus === "open") {
        this.openStatus = "close"
      } else {
        this.openStatus = "open"
      }
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/navigation.scss";
</style>

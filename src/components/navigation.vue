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

                <li v-bind:class="item.is_default ? openPageItem+ 'current-menu-item' : openPageItem" 
                v-for="item in menuTree"
                v-bind:todo="item"
                v-bind:key="item.id"
                @click="handleClickMenu(item)">
                  <span v-if="item.children" class="menu-dropdown" :style="'transform: rotate('+menuDropdownrotateDeg+'deg)'" @click="toggleOpenPageItem">
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

                <!-- <li :class="openPageItem">
                  <span class="menu-dropdown" :style="'transform: rotate('+menuDropdownrotateDeg+'deg)'" @click="toggleOpenPageItem">
                    <i class="iconfont">&#xe619;</i>
                  </span>
                  <a href="javascript:;">博客</a>
                  <ul class="sub-menu">
                    <li><a href="">分类1发送到</a></li>
                    <li><a href="">分类1发送到</a></li>
                    <li><a href="">分类1发送到</a></li>
                    <li><a href="">分类1发送到</a></li>
                  </ul>
                </li> -->

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMenuTree } from '@/api/menu'
export default {
  name: "Navigation",
  data() {
    return {
      openStatus: "open",
      scrolled: "",
      openPageItem: "",
      menuDropdownrotateDeg: 180,
      menuTree: {

      }
    };
  },
  created() {
    fetchMenuTree().then(response => {
        this.menuTree = response.data
      }).catch(err => {
        //TODO error
        console.log(err)
        return
    })
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
    },
    toggleOpenPageItem() {
      if (this.openPageItem == "") {
        this.openPageItem = "open-page-item";
        this.menuDropdownrotateDeg = 0
      } else {
        this.openPageItem = "";
        this.menuDropdownrotateDeg = 180
      }
    },
  },
};
</script>
<style lang="scss">
@import "~@/style/navigation.scss";
</style>

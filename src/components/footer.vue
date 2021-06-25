<template>
  <footer class="overlay animated from-top footer">
    <div class="socialize">
      <li data-aos="fade-up">
        <a
          title="weibo"
          class="socialicon"
          target="_blank"
          href="https://weibo.com/u/2998916145?refer_flag=1001030101_"
          ><i class="iconfont" aria-hidden="true">&#xe62f;</i></a>
      </li>
      <li class="wechat" data-aos="fade-up">
        <a class="socialicon"><i class="iconfont">&#xe62e;</i></a>
        <div class="wechat-img">
          <img src="//justforfun.oss-cn-beijing.aliyuncs.com/static/images/WechatIMG10.jpeg"/>
        </div>
      </li>
      <li data-aos="fade-up">
        <a
          title="github"
          class="socialicon"
          href="https://github.com/SuperHYJ"
          target="_blank"
          ><i class="iconfont" aria-hidden="true">&#xe63b;</i></a>
      </li>
    </div>
    <div class="cr">Copyright&copy;2018 - {{getFullYear()}} by huangyingju</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  methods: {
    getFullYear() {
      return (new Date).getFullYear()
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/footer.scss";
</style>



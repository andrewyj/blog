<template>
  <div class="comment-area">
    <section class="comments">
      <div class="comments-main">

        <ul class="commentwrap">
          <li class="contents">
            <div class="profile">
                <a><img src="//cdn.v2ex.com/gravatar/ee7b831e8b655079af6388bde3944e6as=60&amp;d=identicon&amp;r=G"/></a>
            </div>
            <div class="main">
              <div class="commentinfo">
                小名
              </div>
              <div class="body">
                <p>哎哟不错哦</p>
              </div>
              <div class="info">
                <span>
                  <time>2018-07-26 03:22:37</time>
                </span>
                <span><a class="comment-reply-link">回复</a></span>
              </div>
            </div>
          </li>
        </ul>

        <div class="comment-respond">
          <div class="author-info">
            <input type="text" placeholder="昵  称 : " />
            <input type="text" placeholder="邮  箱 : " />
            <input type="text" placeholder="网  址 : " />
          </div>
          <div class="comment-form-info">
            <div class="real-time-gravatar">
              <img src="//cdn.v2ex.com/gravatar/s=60&d=identicon&r=G"/>
            </div>
            <p>
              <textarea placeholder="你不说两句吗？(°∀°)ﾉ……"></textarea>
              <input type="submit" value="发送" />
            </p>
          </div>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
@import "~@/style/comment.scss";
</style>

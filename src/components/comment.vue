<template>
  <div class="comment-area">
    <section class="comments">
      <div class="comments-main">

        <ul class="commentwrap">
          <CommentTree 
          v-for="item in comments" 
          v-bind:key="item.id" 
          v-bind:comment="item"
          @setResponsePosition='setResponsePosition'
          @setRespond="setRespond"
          v-bind:responsePosition="responsePosition">
          </CommentTree>
        </ul>
        <Respond v-if="responsePosition == 0" @setRespond="setRespond" @setResponsePosition='setResponsePosition'></Respond>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchComments,createCategory } from '@/api/comment'
import md5 from 'js-md5';
import { formatTimeToStr } from "@/utils/date";
var Respond = {
  name: 'Respond',
  data() {
    return {
      respond: {
        nickname: '',
        email: '',
        url: '',
        content: '',
      },
      gravatar: '//cdn.v2ex.com/gravatar/s=60&d=identicon&r=G',
      timeoutId: '',
    }
  },
  props: [
    'responsePosition'
  ],
  methods: {
    setRespond(respond) {
      this.$emit("setRespond", respond)
    },
    setResponsePosition(postion) {
      this.$emit("setResponsePosition", postion)
    },
    changeGravatar(){
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      let vm = this
      this.timeoutId = setTimeout(() => {
          vm.gravatar = "//cdn.v2ex.com/gravatar/" + md5(vm.respond.email).toString() +"s=60&d=identicon&r=G"
      }, 800);
        //cn.gravatar.com 被墙，使用第三方缓存
        // new_ga = "http://cn.gravatar.com/avatar/" + email_md5 +"s=60&d=identicon&r=G";
    }
  },
  template:
        '<div class="comment-respond">'+
          '<h6 v-if="responsePosition>0"><p class="cancel-comment-reply-link" v-on:click="setResponsePosition(0)">取消</p></h6>'+
          '<div class="author-info">'+
            '<input v-model="respond.nickname" type="text" placeholder="昵  称 : " />'+
            '<input v-model="respond.email" v-on:keyup="changeGravatar()" type="text" placeholder="邮  箱 : " />'+
            '<input v-model="respond.url" type="text" placeholder="网  址 : " />'+
          '</div>'+
          '<div class="comment-form-info">'+
            '<div class="real-time-gravatar">'+
              '<img v-bind:src="gravatar"/>'+
            '</div>'+
            '<p>'+
              '<textarea v-model="respond.content" placeholder="你不说两句吗？(°∀°)ﾉ……"></textarea>'+
              '<input type="submit" v-on:click="setRespond(respond)" value="发送" />'+
            '</p>'+
          '</div>'+
        '</div>',
}
var CommentTree = {
  name: 'CommentTree',
  props: [
    'comment', 
    'responsePosition'
  ],
  components: {
    Respond,
  },
  methods: {
    setResponsePosition(postion) {
      this.$emit("setResponsePosition", postion)
    },
    setRespond(respond) {
      this.$emit("setRespond", respond)
    },
    formatDate(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    }
  },
  template: 
      '<li class="contents">'+
        '<div>'+
          '<div class="profile">'+
            '<a><img src="//cdn.v2ex.com/gravatar/ee7b831e8b655079af6388bde3944e6as=60&amp;d=identicon&amp;r=G"/></a>'+
          '</div>'+
          '<div class="main">'+
            '<div class="commentinfo">{{comment.author}}</div>'+
            '<div class="body"><p>{{comment.text}}</p></div>'+
            '<div class="info">'+
              '<span><time>{{formatDate(comment.created_at)}}</time></span>'+
              '<span><a class="comment-reply-link" v-on:click="setResponsePosition(comment.id)">回复</a></span>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<Respond v-if="responsePosition == comment.id" @setRespond="setRespond" @setResponsePosition="setResponsePosition" v-bind:responsePosition="responsePosition"></Respond>'+
        '<ul class="commentwrap" v-if="comment.children && comment.children.length > 0">'+
          '<CommentTree v-for="child in comment.children"'+ 
           'v-bind:key="child.id"'+
           'v-bind:comment="child"'+
           '@setRespond="setRespond"'+
           '@setResponsePosition="setResponsePosition"'+
           'v-bind:responsePosition="responsePosition"></CommentTree>'+
        '</ul>'+ 
      '</li>',
}
export default {
  name: "Comment",
  components: {
    Respond,
    CommentTree
  },
  created() {
    this.getComments()
  },
  props: [
    'articleId', 
  ],
  data() {
    return {
      comments: [],
      responsePosition: 0,
    };
  },
  methods: {
    getComments() {
      let vm = this
      vm.$isLoading(true)
      fetchComments(this.articleId).then(response => {
        vm.$isLoading(false)
        vm.comments = response.data
      }).catch(function() {
        vm.$isLoading(false)
      })
    },
    setResponsePosition(position) {
      this.responsePosition = position
    },
    setRespond(respond) {
      respond.parent_id = this.responsePosition
      respond.article_id = parseInt(this.articleId)
      let vm = this
      vm.$isLoading(true)
      createCategory(respond).then(() => {
        this.getComments()
      }).catch(function() {
        vm.$isLoading(false)
      })
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/comment.scss";
</style>

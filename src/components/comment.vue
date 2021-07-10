<template>
  <div class="comment-area">
    <section class="comments">
      <div class="comments-main">
        <div class="comments-list-title"><span>{{commentCount}}</span> 条评论 </div>
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
import { fetchComments,createComment } from '@/api/comment'
import md5 from 'js-md5';
import { validURL, validEmail } from '@/utils/validate'
import AOS from 'aos'

var Respond = {
  name: 'Respond',
  data() {
    return {
      respond: {
        name: '',
        email: '',
        url: '',
        content: '',
      },
      gravatar: '//cdn.v2ex.com/gravatar',
      timeoutId: '',
    }
  },
  props: [
    'responsePosition'
  ],
  methods: {
    setRespond(respond) {
      let message = ''
      if (!this.validateEmail()) {
        return
      }
      if (!respond.content) {
        message = '请输入评论内容'
      }
      if (!respond.name) {
        message = '请输入名称'
      }
      if (!respond.email) {
        message = '请输入邮箱地址'
      }
      if (message) {
        this.$Alert.message({
          content: message,
          duration: 3
        });
        return
      }
      this.$emit("setRespond", respond)
      this.resetRespond()
    },
    validateEmail() {
      if (!validEmail(this.respond.email)) {
        this.$Alert.message({
          content: 'email 格式不正确',
          duration: 3
        });
        return false
      }
      return true
    },
    validateUrl() {
      if (this.respond.url && !validURL(this.respond.url)) {
        this.$Alert.message({
          content: 'url 格式不正确',
          duration: 3
        });
        return false
      }
      return true
    },
    setResponsePosition(postion) {
      this.resetRespond()
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
    },
    resetRespond() {
      this.respond = {
        name: '',
        email: '',
        url: '',
        content: '',
      }
    }
  },
  template:
        '<div class="comment-respond">'+
          '<h6 v-if="responsePosition>0"><p class="cancel-comment-reply-link" v-on:click="setResponsePosition(0)">取消</p></h6>'+
          '<div class="author-info">'+
            '<input v-model="respond.name" type="text" placeholder="名称* : " />'+
            '<input v-model="respond.email" v-on:keyup="changeGravatar()" v-on:blur="validateEmail()" type="text" placeholder="邮箱* : " />'+
            '<input v-model="respond.url" v-on:blur="validateUrl()" type="text" placeholder="网址 : " />'+
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
    getGravatar(email){
      return "//cdn.v2ex.com/gravatar/" + md5(email).toString() +"s=60&d=identicon&r=G"
    }
  },
  template: 
      '<li class="contents" data-aos="fade-up">'+
        '<div>'+
          '<div class="profile">'+
            '<a v-bind:href="comment.url ? comment.url : '+"'javascript:void(0)'"+'"><img v-bind:src="getGravatar(comment.email)"/></a>'+
          '</div>'+
          '<div class="main">'+
            '<div class="commentinfo">{{comment.name}}</div>'+
            '<div class="body"><p>{{comment.content}}</p></div>'+
            '<div class="info">'+
              '<span><time>{{comment.created_at}}</time></span>'+
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
  props: {
    // 'articleId', 
    articleId: {
      // type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      comments: [],
      responsePosition: 0,
      commentCount: 0,
    };
  },
  watch: {
    articleId:{
      handler (newValue) {
        this.articleId = newValue
        this.getComments()
      },
    }
  },
  methods: {
    getComments() {
      let vm = this
      vm.setLoading(true)
      fetchComments(this.articleId).then(response => {
        vm.setLoading(false)
        vm.comments = response.data.comments
        vm.commentCount = response.data.count
        setInterval(function(){ AOS.refresh() }, 100);
      }).catch(function() {
        vm.setLoading(false)
      })
    },
    setResponsePosition(position) {
      this.responsePosition = position
    },
    setRespond(respond) {
      let vm = this
      respond.parent_id = this.responsePosition
      respond.article_id = parseInt(this.articleId)
      vm.setLoading(true)
      createComment(respond).then(() => {
        this.getComments()
      }).catch(function() {
        vm.setLoading(false)
      })
    },
    setLoading(isLogading) {
      this.loading && this.$isLoading(isLogading)
    }
  },
};
</script>
<style lang="scss">
@import "~@/style/comment.scss";
</style>

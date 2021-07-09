<template>
  <div class="container">
    <h1 class="post-title">{{title}}</h1>
    <div class="posts-list">
      <div class="post">
        <div class="photos">
          <div class="photo-item" v-for="(item, index) in items" v-bind:key="index">
            <img @click="enterGallery(index)" :src="item.src+'?x-oss-process=image/resize,w_200'"/>
          </div>
        </div>
      </div>
      <loadMore :isLoading="isLoading" :totalPage="totalPage" @nextPage="nextPage"/>
    </div>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->

            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" @click="accessPhoto"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)" @click="accessPhoto"></button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from "photoswipe/dist/photoswipe";
import imagesLoaded from "imagesloaded/imagesloaded";
import Masonry from "masonry-layout/masonry";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import loadMore from "@/components/loadMore"
import { fetchPhotos, photoAccessLog} from '@/api/photo'
import { fetchPhotoTag } from '@/api/tag'

function doubleRaf (callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}

export default {
  name: "Photo",
  components: {
    loadMore
  },
  data() {
    return {
      masonry: null,
      isLoading: false,
      items: [],
      title: '',
      query: {
        page: 1,
        tag_id: '',
        keyword: '',
      },
      totalPage: 0,
      photosElem: null,
      gallery: null
    };
  },
  mounted() {
    this.photosElem = document.querySelector('.photos')
    this.masonry = new Masonry(this.photosElem, {
      itemSelector: '.photo-item',
        // columnWidth: 200
    })
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
    enterGallery(index) {
      let pswpElement = document.querySelectorAll(".pswp")[0];
      let options = { showAnimationDuration: 0, hideAnimationDuration: 0};
      this.gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        this.items,
        options
      )
      this.gallery.init()
      this.gallery.goTo(index)
      this.gallery.ui.getFullscreenAPI().enter()
      this.accessPhoto()
    },
    init() {
      this.title = '图片墙'
      if (this.query.tag_id != this.$route.query.tag_id && this.$route.query.tag_id) {
        fetchPhotoTag(this.$route.query.tag_id).then(response => {
          if (response.data) {
            this.title = '#' +response.data.name
          }
        })
      } else if (this.$route.query.keyword) {
        this.title = '"'+this.$route.query.keyword+'"'
      }
      this.query.tag_id = this.$route.query.tag_id
      this.query.keyword = this.$route.query.keyword
      this.items = []
      this.getPhotos(this.$route.params && this.$route.params.id)
    },
    getPhotos(id) {
      this.isLoading = true
      let vm = this
      let goto = null
      fetchPhotos(this.query).then(response => {
        this.isLoading = false
        doubleRaf(()=> {
          for(let index in response.data.list) {
            let photo = response.data.list[index]
            this.totalPage = response.data.total_page
            this.items.push(this.tidyPhoto(photo))
            if (id && photo.id == id) {
              goto = this.items.length - 1
            }
          }
          if (goto != null) {
            this.enterGallery(goto)
          }
          vm.$nextTick(function () {
            imagesLoaded(this.photosElem).on('progress', ()=>{
              this.masonry.reloadItems()
              this.masonry.layout()
            });
          })
        })
      }).catch(function() {
        if (this.query.page > 1) {
            --this.query.page
          }
        vm.isLoading = false
      })
    },
    accessPhoto() {
      if (this.gallery.currItem.id) {
        photoAccessLog(this.gallery.currItem.id)
      }
    },
    tidyPhoto(photo) {
      let title = '<h2>'+photo.title+'</h2>'+'<p>'+photo.describe+'</p><br/>'
      if (photo.tags) {
        let script = "document.getElementsByClassName(\"pswp__button--close\")[0].click();"
        title += '<div class="tags center">'
        for(let index in photo.tags) {
          let tag = photo.tags[index]
          let tagScript = script + "setTimeout(function(){location.href=\"/#/photos?tag_id="+tag.id+"\"},100)"
          title += "<a style='border-color: #666;color: #666' class='tag' onclick='"+tagScript+"'>"+tag.name+"</a>"
        }
        title += '</div>'
      }

      return {
        src: photo.path,
        w: photo.width,
        h: photo.height,
        title: title,
        id: photo.id
      }
    }
  }
};
</script>
<style scoped>
  .photos {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .photo-item {
    width: 25%;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px
  }
  .tags .tag {
      border: 1px dotted #999;
      color: #999;
  } 
  img {
      max-width: 100%;
      height: auto;
      transition: opacity .2s;
  }
  @media (max-width:900px) {
    .photo-item {
      width: 33.33333%
    }
  }
  @media (max-width:600px) {
    .photo-item {
      width: 50%
    }
  }
  .pswp__caption__center {
    text-align: center;
  }
</style>

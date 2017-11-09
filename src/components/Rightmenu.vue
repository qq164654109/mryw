<template>
  <div class="rightmenu">
    <ul>
      <li class="item" @click="save">
        <img class="pic" src="../assets/save.png" v-if="!cflag">
        <img class="pic" src="../assets/saveon.png" v-else>
        <div class="text">{{text}}</div>
      </li>
      <li class="item" @click="choose('prev')">
        <img class="pic" src="../assets/prev.png">
        <div class="text">上一篇</div>
      </li>
      <li class="item"  @click="choose('next')">
        <img class="pic" src="../assets/next.png">
        <div class="text">下一篇</div>
      </li>
    </ul>
  </div>
</template>

<script lang="babel" type="text/ecmascript-6">
  export default {
    props: ['flag', 'article'],
    data () {
      return {
        cflag: this.flag
      }
    },
    watch: {
      flag () {
        this.cflag = this.flag
      }
    },
    methods: {
      save () {
        if (this.article.title) {
          this.cflag = !this.cflag
          if (this.cflag) {
            var saveArticle = {}
            saveArticle.title = this.article.title
            saveArticle.author = this.article.author
            saveArticle.date = this.article.date.curr
            this.$emit('save', saveArticle)
          } else {
            this.$emit('remove', this.article.title)
          }
        }
      },
      choose (mark) {
        let data = this.article.date[mark]
        this.$emit('mArticle', data)
      }
    },
    computed: {
      text () {
        if (this.flag) {
          return '已收藏'
        } else {
          return '收藏'
        }
      }
    }
  }
</script>

<style scoped>
  .rightmenu{
    padding: 20px 0;
    background: #2a2a29;
    width: 100%;
    height: 100%;
  }
  .item{
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    color: #8c8768;
  }
  .item .text{
    font-size: 12px;
    margin-top: 4px;
  }
</style>

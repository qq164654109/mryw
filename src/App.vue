<template>
  <div id="app">
    <header id="header">
      <img src="./assets/menu.png" @click.stop="_toggleLeft">
      <img src="./assets/portmenu.png" @click.stop="_toggleRight">
    </header>
    <div class="article-wrap" ref="aw" v-show="article.title">
      <v-article :article="article"></v-article>
    </div>
    <transition name="leftshow">
      <div class="left-wrapper" v-show="leftOn">
        <leftmenu @hideLeft="hideLeft"></leftmenu>
      </div>
    </transition>
    <transition name="rightshow">
      <div class="right-wrapper" v-show="rightOn">
        <rightmenu :flag="flag" :article="article" v-on="{save:save,remove:remove,mArticle:mArticle}"></rightmenu>
      </div>
    </transition>
    <div class="veil" v-show="veilOn" @click="_toggleAll"></div>
    <transition name="favorshow">
      <div class="favor" v-show="favorOn">
        <div class="top">
          <img src="./assets/back.png" @click.stop="_cFavor">
        </div>
        <ul class="favor-menu" v-show="saveTotal.length>0">
          <li class="favor-list" v-for="item in saveTotal" @click="mArticle(item.date)">
            <div class="title">{{item.title}}</div>
            <div class="author">{{item.author}}</div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <div class="tip" v-show="tipOn">
        {{tip}}
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import article from './components/Article.vue'
  import leftmenu from './components/Leftmenu.vue'
  import rightmenu from './components/Rightmenu.vue'
  import {getNow, setStorage, getStorage} from './common/js/now'
  export default {
    data () {
      return {
        article: {},
        leftOn: false,
        rightOn: false,
        favorOn: false,
        tipOn: false,
        saveTotal: [],
        tip: ''
      }
    },
    components: {
      'v-article': article,
      leftmenu,
      rightmenu
    },
    created () {
      if (getStorage('saveTotal')) {
        if (getStorage('saveTotal').length > 0) {
          this.saveTotal = getStorage('saveTotal')
        }
      }
    },
    methods: {
      _getArtical () {
        this.$http({
          method: 'get',
          url: 'https://interface.meiriyiwen.com/article/today',
          params: {
            dev: 1
          }
        }).then((res) => {
          this.article = res.data.data
        })
      },
      _toggleLeft () {
        if (!this.favorOn) {
          this.leftOn = !this.leftOn
        }
      },
      _toggleRight () {
        this.rightOn = !this.rightOn
      },
      _toggleAll () {
        if (this.leftOn) {
          this.leftOn = false
        } else if (this.rightOn) {
          this.rightOn = false
        }
      },
      _cFavor () {
        this.favorOn = false
      },
      save (data) {
        this.saveTotal.unshift(data)
        setStorage('saveTotal', this.saveTotal)
        this.tip = '已收藏'
        this.tipOn = true
        setTimeout(() => {
          this.tipOn = false
        }, 500)
      },
      remove (data) {
        for (let i in this.saveTotal) {
          if (this.saveTotal[i].title === data) {
            this.saveTotal.splice([i], 1)
          }
        }
        setStorage('saveTotal', this.saveTotal)
        this.tip = '取消收藏'
        this.tipOn = true
        setTimeout(() => {
          this.tipOn = false
        }, 500)
      },
      hideLeft () {
        this.leftOn = false
        this.favorOn = true
      },
      mArticle (data) {
        this.favorOn = false
        let now = parseInt(getNow()) + 1
        if (data >= now) {
          this.tip = '没有了'
          this.tipOn = true
          setTimeout(() => {
            this.tipOn = false
          }, 500)
          return
        }
        this.$http({
          methods: 'get',
          url: 'https://interface.meiriyiwen.com/article/day',
          params: {
            dev: 1,
            date: data
          }
        }).then((res) => {
          this.article = res.data.data
        })
        this.$refs.aw.scrollTop = 0
      }
    },
    computed: {
      veilOn () {
        if (this.leftOn || this.rightOn) {
          return true
        } else {
          return false
        }
      },
      flag () {
        for (var i in this.saveTotal) {
          if (this.saveTotal[i].title === this.article.title) {
            return true
          }
        }
        return false
      }
    },
    mounted () {
      this._getArtical()
    }
  }
</script>

<style>
  @import "../static/css/reset.css";
  #app{
    font-size: 16px;
    background-color: rgb(250, 250, 250)
  }
  p{
    margin: 20px 0;
  }
  #header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(250, 250, 250);
    box-sizing: border-box;
    z-index: 10;
  }
  #header img{
    width: 32px;
    height: 32px;
  }
  .article-wrap{
    position: fixed;
    top: 52px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .article-wrap::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .left-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: red;
    z-index: 50;
  }
  .leftshow-enter-active,.leftshow-leave-active{
    transition: left .4s;
    left: 0;
  }
  .leftshow-enter,.leftshow-leave-to{
    transition: left .4s;
    left: -40%;
  }
  .right-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    background: green;
    z-index: 50;
  }
  .rightshow-enter-active,.rightshow-leave-active{
    transition: right .4s;
    right: 0;
  }
  .rightshow-enter,.rightshow-leave-to{
    transition: right .4s;
    right: -40%;
  }
  .veil{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(221,221,97,.25);
    z-index: 30;
  }
  .favor{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgb(250, 250, 250);
    z-index:60;
    transition: opacity .4s,top .4s;
  }
  .favorshow-enter-active,.favorshow-leave-active{
    top:0;
    opacity: 1;
  }
  .favorshow-enter,.favorshow-leave-to{
    top:50%;
    opacity: 0;
  }
  .top{
    height: 32px;
  }
  .favor-list{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 16px;
    color: #878888;
    border-bottom: 1px solid #777;
  }
  .favor-list .title{
    font-size: 18px;
  }
  .favor-list .author{
    font-size: 16px;
  }
  .tip{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #2a2a29;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 15px 20px;
    opacity: .8;
    transition: opacity .5s;
  }
  .fade-enter-active,.fade-leave-active{
    opacity: 1;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
</style>

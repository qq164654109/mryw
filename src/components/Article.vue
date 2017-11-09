<template>
    <div class="article">
      <div class="title">{{article.title}}</div>
      <div class="author">{{article.author}}</div>
      <div class="content" v-html="article.content"></div>
      <footer>
        全文完  共{{article.wc}}字
      </footer>
    </div>
</template>

<script lang="babel" type="text/ecmascript-6">
  export default {
    props: ['article']
  }
</script>

<style scoped>
  .article{
    padding: 10px;
    background-color: rgb(250, 250, 250)
  }
  .title{
    padding-bottom: 10px;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    border-bottom: 1px solid #2c3e50;
    box-sizing: border-box;
  }
  .author{
    margin: 15px 0 15px 0;
    font-size: 16px;
    font-weight: 200;
    color: #8c8768;
    text-align: center;
  }
  .content{
    font-size: 16px;
    line-height: 24px;
    text-indent: 2em;
    letter-spacing: 1px;
  }
  footer{
    border-top: 1px solid #2c3e50;
    text-align: center;
    color: #8c8768;
    padding: 10px 0;
  }
</style>

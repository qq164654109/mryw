<template>
  <div class="leftmenu">
    <ul>
      <li class="item" @click="lookSave">我的收藏</li>
      <li class="item">阅读设置</li>
      <li class="item">给个好评</li>
    </ul>
  </div>
</template>

<script lang="babel" type="text/ecmascript-6">
    export default {
      methods: {
        lookSave () {
          this.$emit('hideLeft')
        }
      }
    }
</script>

<style scoped>
  .leftmenu{
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
    border-bottom: 1px solid #8c8768;
  }
</style>

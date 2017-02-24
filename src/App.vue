<template>
  <div>
    <v-header :seller="seller"></v-header>
    <nav class="nav border-l">
      <router-link to="/goods" class="nav-item">商品</router-link>
      <router-link to="/ratings" class="nav-item">评论</router-link>
      <router-link to="/seller" class="nav-item">商家</router-link>
    </nav>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';
  import {parseURL} from 'common/js/tools';

  const ERR_OK = 0;

  export default {
    data(){
      return {
        seller: {
          id: (() => { // 自执行的方法 返回字符串
            let param = parseURL();
            return param.id;
          })()
        }
      };
    },
    created(){
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => { // 根据url参数，获取不同商家数据
        res = res.body;
        if (res.errno === ERR_OK) {
          // this.seller = res.data  这个方式获取数据，无法正确获取id这个属性
          this.seller = Object.assign({}, this.seller, res.data); // 第一个参数是合并的对象，第二，三参数是复制进第一个对象里的对象 复制不能复制：继承属性和不可枚举属性 es6语法
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/css/mixin"

  nav.nav
    display: flex
    width: 100%
    height 40px
    border-bottom 1px solid rgba(7, 17, 27, .1)
    & > .nav-item
      flex: 1
      text-align: center
      line-height: 40px
      color: rgb(77, 85, 93)
      font-size 14px
      &.active
        color rgb(240, 20, 20)
</style>

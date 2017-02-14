<template>
  <div>
    <v-header :seller="seller"></v-header>
    <nav class="nav m-border">
      <router-link to="/goods" class="nav-item">商品</router-link>
      <router-link to="/ratings" class="nav-item">评论</router-link>
      <router-link to="/seller" class="nav-item">商家</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data(){
      return {
        seller: {}
      };
    },
    created(){
      this.$http.get('/api/seller').then(res => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.seller = res.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/css/mixin.styl";

  nav.nav
    display: flex
    width: 100%
    height 40px
    border-tb(1px, solid, rgba(7, 17, 27, .1))
    &>.nav-item
      flex: 1
      text-align: center
      line-height: 40px
      color: rgb(77, 85, 93)
      &.active
        color rgb(240, 20, 20)
</style>

<template>
  <div>
    <v-header></v-header>
    <nav class="nav">
      <router-link to="/goods" class="nav-item">商品</router-link>
      <router-link to="/ratings" class="nav-item">评论</router-link>
      <router-link to="/seller" class="nav-item">商家</router-link>
      <!--<ul>
        <li class="nav-item">
          <router-link to="/goods">商品</router-link>
        </li>
        <li class="nav-item">
        	<router-link to="/ratings">评论</router-link>
        </li>
        <li class="nav-item">
        	<router-link to="/seller">商家</router-link>
        </li>
      </ul>-->
    </nav>
    <router-view></router-view>
    <section></section>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';
  export default {
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  nav.nav
    display: flex
    width: 100%
    height 40px
    .nav-item
      flex: 1
      text-align: center
      line-height 40px
      color #333
</style>

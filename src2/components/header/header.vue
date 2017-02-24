<template>
  <header class="header">
    <dl class="header-info">
      <dt class="header-left">
        <img :src="seller.avatar">
      </dt>
      <dd class="header-center">
        <h1 class="center-title"><strong>{{ seller.name }}</strong></h1>
        <h3 class="center-description">{{ seller.description }}&nbsp;/&nbsp;{{ seller.deliveryTime }}分钟送达</h3>
        <h5 v-if="seller.supports" class="center-supports">
          <v-support-icon :size="1" :type="seller.supports[0].type"></v-support-icon>
          <p>{{ seller.supports[0].description }}</p>
        </h5>
      </dd>
      <dd class="header-right">
        <strong class="supports-num" @click="showMoreSupports">5个<i class="icon-keyboard_arrow_right"></i></strong>
      </dd>
    </dl>
    <div class="header-bulletin" @click="showMoreSupports">
      <h4>{{ seller.bulletin }}</h4>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-bg">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="isShowMoreSupports" class="header-supports">
        <dl class="header-supports-detail">
          <dt class="detail-title">{{ seller.name }}</dt>
          <v-star :size="48" :score="seller.score"></v-star>
          <dd class="detail-module">
            <h3><strong>优惠信息</strong></h3>
            <ul class="detail-bulletin">
              <li v-for="(item,index) in seller.supports">
                <v-support-icon :size="2" :type="seller.supports[index].type"></v-support-icon>
                {{seller.supports[index].description }}
              </li>
            </ul>
          </dd>
          <dd class="detail-module">
            <h3><strong>商家公告</strong></h3>
            <p class="detail-bulletin">{{ seller.bulletin }}</p>
          </dd>
        </dl>
        <div class="header-supports-close">
          <i class="icon-close" @click="hideMoreSupports"></i>
        </div>
      </div>
    </transition>
  </header>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  import supportIcon from '../supportIcon/supportIcon';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        isShowMoreSupports: false
      };
    },
    methods: {
      showMoreSupports(){
        this.isShowMoreSupports = true;
      },
      hideMoreSupports(){
        this.isShowMoreSupports = false;
      }
    },
    components: {
      'v-star': star,
      'v-support-icon': supportIcon
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin.styl"

  .header
    position relative
    overflow hidden
    .header-info
      display flex
      padding 24px 12px 46px 24px
      background-color rgba(7, 17, 27, .5)
      color rgb(255, 255, 255)
      position relative
      z-index 20

      .header-left
        width 64px
        height @width
        min-width @width

        &>img
          width 100%
          border-radius 4px

      .header-center
        flex 1
        margin-left 16px
        padding-top 2px
        overflow hidden

        .center-title
          line-height $lineHeight + 6
          display flex
          align-items center
          margin-bottom 8px

          &:before
            content ''
            display block
            width 30px
            height 18px
            min-width @width
            margin-right 6px
            backgroundPng("img/brand")
            backgroundSize(@width, @height)

          &>strong
            font-size $fontSize + 4
            font-weight bold
            width 80%
            singleOverflow()

        .center-description
          font-size $fontSize
          font-weight normal
          line-height $lineHeight
          margin-bottom 5px
          singleOverflow()

        .center-supports
          font-size $fontSize
          line-height $lineHeight
          font-weight normal
          display flex
          align-items center

          &>span
            display block
            margin-right 4px
          &>p
            width 86%
            singleOverflow()
      .header-right
        display flex
        align-items flex-end
        &>.supports-num
          display flex
          align-items center
          padding 7px 8px 7px 8px
          font-size $fontSize
          font-weight normal
          line-height $lineHeight
          border-radius 50px
          background-color rgba(0, 0, 0, .2)
          &>i
            margin-left 2px

    .header-bulletin
      display flex
      width 100%
      align-items center
      line-height 28px
      padding 0 12px
      color #fff
      font-size $fontSize
      background-color rgba(7, 17, 27, .2)
      position absolute
      left 0
      bottom 0
      z-index 30

      &:before
        content ""
        display block
        width 22px
        height 12px
        backgroundPng("img/bulletin")
        backgroundSize(@width, @height)
      &>h4
        flex 1
        font-weight normal
        margin 0 4px
        singleOverflow()

    .header-bg
      width 100%
      position absolute
      top -50%
      left 0
      overflow hidden
      z-index 10
      &>img
        width 100%
        filter blur(5px)
        -webkit-filter blur(5px)

    .header-supports
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      color #fff
      overflow scroll
      -webkit-overflow-scrolling touch
      opacity 1
      background-color rgba(7, 17, 27, 0.8)
      backdrop-filter blur(10px)
      &.fade-enter-active, .fade-leave-active
        transition all .3s
      &.fade-enter, .fade-leave-active
        opacity 0
        background-color rgba(7, 17, 27, 0)
      .header-supports-detail
        min-height 100%
        padding 64px 36px
        text-align center

        .detail-title
          font-size $fontSize + 4
          line-height $lineHeight + 4
          font-weight 700
          margin-bottom 16px

        .detail-module
          margin 28px 0
          &>h3
            font-size $fontSize + 2
            line-height $lineHeight + 2
            display flex
            align-items center
            margin-bottom 24px
            &:before, &:after
              content ""
              display block
              flex 1
              border-top 1px solid #fff
              opacity .2
            &>strong
              margin 0 12px

          &>ul
            &>li
              display flex
              align-items center
              margin-bottom 12px
              font-size $fontSize
              &:last-child
                margin-bottom 0
              &>span
                display block
                margin-right 6px
          &>.detail-bulletin
            font-size $fontSize
            padding 0 12px
          &>p.detail-bulletin
            font-weight normal
            line-height $lineHeight + 12
            text-align left

      &>.header-supports-close
        position relative
        width 32px
        height @width
        margin -64px auto 0
        &>i
          opacity .5
          font-size 32px

</style>

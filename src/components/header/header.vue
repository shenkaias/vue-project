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
          <span :class="classMap[seller.supports[0].type]" class="support-icon"></span>
          <p>{{ seller.supports[0].description }}</p>
        </h5>
      </dd>
      <dd class="header-right">
        <strong class="supports-num">5个<i class="icon-keyboard_arrow_right"></i></strong>
      </dd>
    </dl>
    <div class="header-bulletin">
      <h4>{{ seller.bulletin }}</h4>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-bg">
      <img :src="seller.avatar" >
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin.styl"

  $fontSize = 12px
  $lineHeight = 12px

  supportIcon($name)
    backgroundPng("img/" +$name)
    backgroundSize(12px,12px)

  .header
    position relative
    overflow hidden
    .header-info
      display flex
      padding 24px 12px 18px 24px
      background-color rgba(7, 17, 27, .5)
      color rgb(255, 255, 255)
      position relative
      z-index 20

      .header-left
        width 64px
        height @width
        min-width @width

        img
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
          font-weight 200
          line-height $lineHeight
          margin-bottom 5px
          singleOverflow()

        .center-supports
          font-size $fontSize
          line-height $lineHeight
          font-weight 200
          display flex
          align-items center

          >.support-icon
            display block
            width 12px
            height @width
            margin-right 4px

            &.decrease
              supportIcon(decrease_1)

            &.discount
              supportIcon(discount_1)

            &.special
              supportIcon(special_1)

            &.invoice
              supportIcon(invoice_1)

            &.guarantee
              supportIcon(guarantee_1)

          &>p
            width 86%
            singleOverflow()
      .header-right
        display flex
        align-items flex-end
        >.supports-num
          display flex
          align-items center
          padding 7px 8px 7px 8px
          font-size $fontSize
          font-weight 200
          line-height $lineHeight
          border-radius 50px
          background-color rgba(0, 0, 0, .2)
          &>i
            margin-left 2px


    .header-bulletin
      display flex
      align-items center
      line-height 28px
      padding 0 12px
      color #fff
      font-size $fontSize
      background-color rgba(7,17,27,.2)
      position relative
      z-index 20

      &:before
        content ""
        display block
        width 22px
        height 12px
        backgroundPng("img/bulletin")
        backgroundSize(@width,@height)
      &>h4
        flex 1
        font-weight 200
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
        filter blur(10px)
        -webkit-filter blur(10px)
</style>

<template>
  <div class="shop-cart">
    <div class="shop-wrapper">
      <dl class="shop-left" :class="{'active':goodsNum>0}" @click="toggleSpread">
        <dt class="shop-logo-wrapper">
        <div class="shop-logo">
          <i class="icon-shopping_cart"></i>
        </div>
        <span class="shop-num">{{ goodsNum }}</span>
        </dt>
        <dd class="shop-prize border-v">
          ¥{{ goodsTotal }}
        </dd>
        <dd class="shop-dis">
          另需配送费<span>¥{{ deliveryPrice }}</span>元
        </dd>
      </dl>
      <div class="shop-right" :class="isSettlement" @click="pay">{{ settlement }}</div>
    </div>
    <ul class="ball-wrapper">
      <li v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <span class="ball" v-show="ball.show">
            <span class="ball-inner js-ball"></span>
          </span>
        </transition>
      </li>
    </ul>
    <transition name="spread">
      <div class="shop-details-wrapper" v-show="shopDetails">
        <h2 class="details-header">
          <span>购物车</span>
          <span @click="emptyList">清空</span>
        </h2>
        <div ref="detailsList">
          <ul class="details-list">
            <li class="details-item" v-for="food in selectGoods">
              <span class="shop-name">{{ food.name }}</span>
              <div class="shop-item-fr">
                <span class="shop-price">¥<strong>{{ food.price*food.num }}</strong></span>
                <div class="goods-control-wrapper">
                  <v-goods-control :food="food" @addFood="addFood"></v-goods-control>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="shop-details-mask" @click="hideSpread" v-show="shopDetails"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import goodsControl from '../goodsControl/goodsControl.vue';

  export default{
    props: {
      selectGoods: {
        type: Array,
        default(){
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
        dropBalls: [],
        spread: true
      };
    },
    computed: {
      shopDetails(){
        if (!this.goodsNum) {
          this.spread = true;
          return false;
        }
        let show = !this.spread;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.detailsList, {
                click: true
              });
            } else {
              this.scroll.refresh();// 如果有了 执行刷新
            }
          });
        }
        return show;
      },
      goodsTotal(){
        let total = 0;
        this.selectGoods.forEach((food) => {
          total += food.price * food.num;
        });
        return total;
      },
      goodsNum(){
        let num = 0;
        this.selectGoods.forEach((food) => {
          num += food.num;
        });
        return num;
      },
      settlement(){
        if (this.goodsTotal === 0) {
          return `¥${this.minPrice}元起送`;
        } else if (this.goodsTotal > 0 && this.goodsTotal < this.minPrice) {
          return `还差${this.minPrice - this.goodsTotal}元起送`;
        } else {
          return '去结算';
        }
      },
      isSettlement(){
        if (this.goodsTotal >= this.minPrice) {
          return 'active';
        }
      }
    },
    methods: {
      hideSpread(){
        this.spread = true;
      },
      pay(){
        if (!this.goodsNum) {
          return;
        }
        window.alert(`请支付${this.goodsTotal}元`);
      },
      addFood(target){
        this.drop(target);
      },
      emptyList(){
        this.selectGoods.forEach((food) => {
          food.num = 0;
        });
      },
      toggleSpread(){
        if (!this.goodsNum) {
          return;
        }
        this.spread = !this.spread;
      },
      drop(el){
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el){
        let num = this.balls.length;
        while (num--) {
          let ball = this.balls[num];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();// 获取小球的距离页面的偏移
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';// v-show已经设置过display:none，这里手动显示
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('js-ball')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done){
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('js-ball')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);// 完成过渡后修改元素样式及文字
        });
      },
      afterDrop(el){
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      'v-goods-control': goodsControl
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin"

  .shop-cart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 50
    color rgba(255, 255, 255, .4)
    .shop-wrapper
      display flex
      background-color #141d27
      .shop-left
        flex 1
        display flex
        align-items center
        height 48px
        .shop-logo-wrapper
          position relative
          top -10px
          width 56px
          height @width
          padding 6px
          margin 0 10px
          border-radius 50%
          background-color #141d27
          .shop-logo
            display table
            width 100%
            height @width
            background-color #2b343c
            border-radius 50%
            & i
              font-size $fontSize + 12
              display table-cell
              text-align center
              vertical-align middle
          .shop-num
            position absolute
            top 0
            right 0
            display none
            width 24px
            height 16px
            line-height @height + 2
            text-align center
            border-radius 10px
            font-size 10px
            font-weight 700
            color #fff
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px rgba(0, 0, 0, 0.4)
        .shop-prize
          font-size $fontSize + 4
          font-weight 700
          line-height 24px
          padding-right 8px
          border-r(1px, solid, rgba(255, 255, 255, .1))
        .shop-dis
          font-size $fontSize
          font-weight normal
          line-height 24px
          padding-left 8px
          & span
            margin 0 2px
        &.active
          .shop-prize
            color #fff
          .shop-logo
            background-color rgb(0, 160, 220)
            color #fff
          .shop-num
            display block
      .shop-right
        width 100px
        line-height 48px
        font-size $fontSize
        flex 0 0 @width
        text-align center
        background-color #2b343c
        &.active
          background-color #00b43c
          color #fff
    .ball-wrapper
      width 0
      height 0
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .ball-inner
          display inline-block
          width 16px
          height @width
          border-radius 50%
          background-color rgb(0, 160, 220)
          transition all 0.4s linear

    .shop-details-wrapper
      position absolute
      left 0
      top 0
      width 100%
      z-index -1
      transform translate3d(0, -100%, 0)
      .details-header
        display flex
        justify-content space-between
        line-height 40px
        padding 0 18px
        font-weight normal
        background-color #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, .1)
        & > span
          &:first-child
            font-size 14px
            color rgb(7, 17, 27)
          &:last-child
            font-size 12px
            color rgb(0, 160, 220)
      .details-list
        background-color #fff
        padding 0 18px
        max-height 217px
        .details-item
          display flex
          justify-content space-between
          height 48px
          line-height @height
          border-b(1px, solid, rgba(7, 17, 27, .1))
          .shop-name
            color rgb(7, 17, 27)
            font-size 14px
            flex 1
            singleOverflow()
          .shop-item-fr
            display flex
            margin-left 18px
            .shop-price
              font-size 12px
              font-weight normal
              color rgb(240, 20, 20)
              margin-right 7px
              & > strong
                font-size 14px
                font-weight 700
            .goods-control-wrapper
              position relative
              left 5px
      &.spread-enter-active, &.spread-leave-active
        transition all .5s
      &.spread-enter, &.spread-leave-active
        transform translate3d(0, 0, 0)
    .shop-details-mask
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      z-index -2
      opacity 1
      background-color rgba(7, 17, 27, .6)
      backdrop blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
</style>

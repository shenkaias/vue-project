<template>
  <transition name="slide">
    <div ref="goodsDetailsWrapper" class="goods-details-wrapper" v-show="selectGoods">
      <dl class="goods-details">
        <dt class="goods-details-head">
          <img :src="goods.image">
        <p class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </p>
        </dt>
        <dd class="goods-details-item border-l ">
          <h3 class="title">{{ goods.name }}</h3>
          <h6 class="goods-describe">
            <span>月售{{ goods.sellCount }}份</span>
            <span>好评率{{ goods.rating }}%</span>
          </h6>
          <p class="goods-price">
          <span class="now" v-if="goods.price">
            ¥<strong>{{ goods.price }}</strong>
          </span>
            <span class="old" v-if="goods.oldPrice">
            ¥<strong>{{ goods.oldPrice }}</strong>
          </span>
          </p>
          <div class="goods-control-wrapper">
            <v-goods-control @addFood="addFood" :food="goods"></v-goods-control>
          </div>
          <div @click="addFirst" v-show="!goods.num || goods.num===0" class="goods-purchase">加入购物车</div>
        </dd>
        <dd class="goods-details-item border-l" v-if="goods.info">
          <h3 class="title">商品介绍</h3>
          <p class="goods-introduce">{{ goods.info }}</p>
        </dd>
        <dd class="goods-details-item border-l">
          <h3 class="title">商品评价</h3>
          <v-select-rating :ratings="goods.ratings" :ratingsDesc="ratingsDesc" :hasContent="hasContent" :ratingsType="ratingsType" @select="selectType" @toggle="toggleConent"></v-select-rating>
        </dd>
        <dd class="goods-rating-wrapper">
          <ul class="goods-rating-list">
            <li class="goods-rating-item border-l" v-for="rating in goods.ratings"
                v-if="selectRatings(rating.rateType,rating.text)">
              <p class="goods-rating-time">{{ rating.rateTime | formatTime}}</p>
              <h6 class="goods-rating-text">
                <i :class="{'icon-thumb_down': rating.rateType===1,'icon-thumb_up': rating.rateType===0}"></i>
                <span v-if="rating.text">{{ rating.text }}</span>
              </h6>
              <div class="goods-rating-user">
                <span class="user-username">{{ rating.username }}</span>
                <img :src="rating.avatar">
              </div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from 'common/js/formatDate';
  import goodsControl from '../goodsControl/goodsControl';
  import selectRating from '../selectRating/selectRating';

  const All = 2;

  export default{
    props: {
      goods: {
        type: Object
      }
    },
    data(){
      return {
        selectGoods: false,
        ratingsDesc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        hasContent: false,
        ratingsType: All
      };
    },
    methods: {
      selectRatings(type, text){
        if (this.hasContent && !text) {
          return false;
        }
        if (this.ratingsType === All) {
          return true;
        } else {
          return type === this.ratingsType;
        }
      },
      selectType(type){
        this.ratingsType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleConent(){
        this.hasContent = !this.hasContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      show(){
        this.hasContent = false;// 每次打开重置
        this.ratingsType = All;// 每次打开重置
        this.selectGoods = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.goodsDetailsWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide(){
        this.selectGoods = false;
      },
      addFirst(event){
        if (!event._constructed) {
          return;
        }
        this.$emit('addFood', event.target);// 触发goods组件上绑定的addFood事件
        Vue.set(this.goods, 'num', 1);
      },
      addFood(target){
        this.$emit('addFood', target);// 触发goods组件上绑定的addFood事件
      }
    },
    filters: {
      formatTime(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-goods-control': goodsControl,
      'v-select-rating': selectRating
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin"

  .goods-details-wrapper
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 40
    width 100%
    background-color #f3f5f7
    transform translate3d(0, 0, 0)
    &.slide-enter-active, &.slide-leave-active
      transition all .3s linear
    &.slide-enter, &.slide-leave-active
      transform translate3d(100%, 0, 0)
    .goods-details
      .goods-details-head
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          left 0
          top 0
          width 100%
          height 100%
        .back
          position absolute
          left 10px
          top 10px
          z-index 10
          i
          display block
          padding 10px
          font-size 20px
          color #fff
          background-color rgba(0, 0, 0, .2)
          border-radius 50%
      .goods-details-item
        background-color #fff
        margin-bottom 16px
        padding 18px
        border-width 1px 0 1px 0
        border-style solid
        border-color rgba(7, 17, 27, .1)
        &:first-of-type
          position relative
          border-top none
          .title
            font-weight 700
          .goods-describe
            font-size 0
            margin 8px 0 18px
            font-weight normal
            span
              font-size 12px
              color rgb(147, 153, 159)
              margin-right 12px
          .goods-price
            font-size 0
            span
              font-size 12px
              font-weight normal
              line-height 24px
              strong
                font-weight 700
                margin-left 3px
              &.now
                color rgb(240, 20, 20)
                margin-right 12px
                strong
                  font-size 14px
              &.old
                text-decoration line-through
                color rgb(147, 153, 159)
          .goods-control-wrapper
            position absolute
            right 13px
            bottom 13px
          .goods-purchase
            position absolute
            right 18px
            bottom 18px
            z-index 10
            font-size 12px
            padding 6px 12px
            color #fff
            background-color rgb(0, 160, 220)
            border-radius 24px

        &:nth-last-of-type(2)
          padding-bottom 0
          margin-bottom 0
        .title
          font-weight normal
          font-size 14px
          color rgb(7, 17, 27)
        .goods-introduce
          padding 6px 8px 0
          font-size 12px
          color rgb(77, 85, 93)
          line-height 24px

      .goods-rating-wrapper
        padding 0 18px
        background-color #fff
        .goods-rating-list
          .goods-rating-item
            position relative
            padding 16px 0
            color rgb(147, 153, 159)
            border-b(1px, solid, rgba(7,17,27,.1))
            .goods-rating-time
              font-size 10px
              line-height 12px
              margin-bottom 6px
            .goods-rating-text
              display table
              font-size 0
              vertical-align middle
              i
                display table-cell
                font-size 12px
                line-height 24px
                &.icon-thumb_up
                  color rgb(0, 160, 220)
              span
                display table-cell
                font-size 12px
                font-weight normal
                line-height 16px
                color rgb(7, 17, 27)
                padding-left 4px
            .goods-rating-user
              display table
              position absolute
              right 0
              top 16px
              font-size 0
              span
                display table-cell
                vertical-align middle
                font-size 10px
                line-height 12px
                padding-right 6px
              img
                display table-cell
                width 12px
                height @width
                border-radius 50%

            &:nth-last-of-type(1)
              border-b-none()
</style>


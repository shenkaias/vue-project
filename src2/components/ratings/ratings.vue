<template>
  <section class="ratings-body" ref="ratingsBody">
    <ul class="ratings-body-wrapper">
      <li class="ratings-body-head">
        <div class="ratings-score border-v">
          <h3 class="">{{ seller.score }}</h3>
          <h5>综合评分</h5>
          <h6>高于周边商家{{ seller.rankRate }}%</h6>
        </div>
        <ul class="ratings-attitude">
          <li class="ratings-item">
            <span class="ratings-name">服务态度</span>
            <div class="ratings-star-wraper">
              <v-star :size="36" :score="seller.serviceScore"></v-star>
            </div>
            <span class="rating-score">{{ seller.serviceScore }}</span>
          </li>
          <li class="ratings-item">
            <span class="ratings-name">服务态度</span>
            <div class="ratings-star-wraper">
              <v-star :size="36" :score="seller.foodScore"></v-star>
            </div>
            <span class="rating-score">{{ seller.foodScore }}</span>
          </li>
          <li class="ratings-item">
            <span class="ratings-name">送达时间</span>
            <span class="rating-time">{{ seller.deliveryTime }}分钟</span>
          </li>
        </ul>
      </li>
      <li class="ratings-body-type">
        <v-select-rating :ratings="ratings" :hasContent="hasContent" :ratingsType="ratingsType" @select="selectType" @toggle="toggleConent"></v-select-rating>
      </li>
      <li class="ratings-body-list">
        <dl class="ratings-list-item border-l" v-for="rating in ratings"
            v-if="selectRatings(rating.rateType, rating.text)">
          <dt class="ratings-item-img">
            <img :src="rating.avatar">
          </dt>
          <dd class="ratings-item-cont">
            <h6 class="ratings-item-name">{{ rating.username }}</h6>
            <div class="ratings-item-star">
              <v-star :size="36" :score="rating.score"></v-star>
              <span class="ratings-item-time" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
            </div>
            <p class="ratings-item-desc" v-if="rating.text">{{ rating.text }}</p>
            <div class="ratings-item-tags">
              <i :class="{'icon-thumb_down': rating.rateType===1,'icon-thumb_up': rating.rateType===0}"></i>
              <ul class="ratings-item-recommend" v-if="rating.recommend">
                <li v-for="tag in rating.recommend">{{ tag }}</li>
              </ul>
            </div>
            <span class="ratings-item-date">{{ rating.rateTime | formatTime }}</span>
          </dd>
        </dl>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/formatDate';
  import star from '../star/star';
  import selectRating from '../selectRating/selectRating';

  const ERR_OK = 0;
  const All = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        ratings: [],
        hasContent: false,
        ratingsType: All
      };
    },
    created(){
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll(){
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratingsBody, {
            click: true
          });
        } else {
          this.scroll.refresh();
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
      selectRatings(type, text){
        if (this.hasContent && !text) {
          return false;
        }
        if (this.ratingsType === All) {
          return true;
        } else {
          return type === this.ratingsType;
        }
      }
    },
    filters: {
      formatTime(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-star': star,
      'v-select-rating': selectRating
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin"

  .ratings-body
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    background-color #f3f5f7
    .ratings-body-head
      display flex
      padding 18px 0
      border-bottom 1px solid rgba(7, 17, 27, .1)
      background-color #fff
      margin-bottom 16px
      .ratings-score
        flex 1
        text-align center
        border-r(1px, solid, rgba(7, 17, 27, .1))
        h3
          font-size 24px
          color rgb(255, 153, 0)
          line-height 28px
        h5
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
          margin 6px 0 8px
        h6
          font-size 10px
          color rgb(147, 153, 159)
          line-height @fontSize
          margin-bottom 6px
        *
          font-weight normal
      .ratings-attitude
        margin 0 24px
        @media only screen and (max-width: 360px)
          margin 0 5%
        @media only screen and (max-width: 350px)
          margin 0 4%
        @media only screen and (max-width: 340px)
          margin 0 3%
        @media only screen and (max-width: 330px)
          margin 0 2%
        @media only screen and (max-width: 320px)
          margin 0 6px
        .ratings-item
          display table
          font-size 0
          margin-bottom 8px
          &:last-of-type
            margin-bottom 0
          .ratings-name, .ratings-star-wraper, .rating-score
            display table-cell
            vertical-align middle
          .ratings-name, .rating-score
            line-height 18px
            font-size 12px
          .ratings-name
            padding-right 12px
          .rating-score
            color rgb(255, 153, 0)
            padding-left 6px
          .rating-time
            font-size 12px
            color rgb(147, 153, 159)
            line-height 18px

    .ratings-body-type
      padding 0 18px 0
      background-color #fff
      border-width 1px 0 1px 0
      border-style solid
      border-color rgba(7, 17, 27, .1)
    .ratings-body-list
      padding 0ch 18px
      background-color #fff
      .ratings-list-item
        position relative
        padding 18px 0 14px 40px
        border-b(1px, solid, rgba(7, 17, 27, .1))
        .ratings-item-img
          position absolute
          left 0
          top 18px
          width 28px
          height @width
          img
            display block
            border-radius 50px
        .ratings-item-cont
          position relative
          .ratings-item-name
            font-size 10px
            font-weight normal
            color rgb(7, 17, 27)
            margin-bottom 4px
          .ratings-item-star
            display table
            font-size 0
            margin-bottom 6px
            height 24px
            .star-wrapper
              display table-cell
              vertical-align middle
            .ratings-item-time
              display table-cell
              vertical-align middle
              font-size 10px
              color rgb(147, 153, 159)
              line-height 24px
          .ratings-item-desc
            font-size 12px
            color rgb(7, 17, 27)
            line-height 18px
            margin-bottom 8px
          .ratings-item-tags
            font-size 0
            display table
            min-height 22px
            i
              display table-cell
              font-size 12px
              line-height 16px
              &.icon-thumb_down
                color rgb(183, 187, 191)
              &.icon-thumb_up
                color rgb(0, 160, 220)
            .ratings-item-recommend
              display table-cell
              li
                display inline-block
                line-height 16px
                padding 0ch 6px
                border 1px solid rgba(7, 17, 27, .1)
                margin 0 0 4px 8px
                color rgb(147, 153, 159)
                font-size 9px
                border-radius 1px
          .ratings-item-date
            position absolute
            right 0
            top 0
            color rgb(147,153,159)
            font-size 10px
            line-height 12px
</style>

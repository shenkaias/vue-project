<template>
  <section class="seller-body" ref="sellerBody">
    <ul class="seller-list">
      <li class="seller-item seller-head">
        <div class="seller-head-top border-l">
          <h3 class="seller-title">{{ seller.name }}</h3>
          <ul class="seller-ratings">
            <li class="seller-ratings-star">
              <v-star :size="36" :score="seller.score"></v-star>
            </li>
            <li class="seller-ratingCount">({{ seller.ratingCount }})</li>
            <li class="seller-sellCount">月售{{ seller.sellCount }}单</li>
          </ul>
          <div class="seller-collect" :class="{notCollect: !collect}" @click="toggleCollect">
            <i class="icon-favorite"></i>
            <p>{{ isCollect }}</p>
          </div>
        </div>
        <ul class="seller-distribution">
          <li class="seller-minPrice border-v">
            <span>起送价</span>
            <p><strong>{{ seller.minPrice }}</strong>元</p>
          </li>
          <li class="seller-deliveryPrice border-v">
            <span>商家配送</span>
            <p><strong>{{ seller.deliveryPrice }}</strong>元</p>
          </li>
          <li class="seller-deliveryTime">
            <span>评价配送时间</span>
            <p><strong>{{ seller.deliveryTime }}</strong>分钟</p>
          </li>
        </ul>
      </li>
      <li class="seller-item">
        <h3 class="seller-title">公告与活动</h3>
        <h5 class="seller-bulletin">{{ seller.bulletin }}</h5>
        <ul class="seller-supports">
          <li class="supports-item border-l" v-for="support in seller.supports">
            <v-supports-icon :size="4" :type="support.type"></v-supports-icon>
            <p class="">{{ support.description }}</p>
          </li>
        </ul>
      </li>
      <li class="seller-item seller-pics-wrapper" v-if="seller.pics">
        <h3 class="seller-title">商家实景</h3>
        <div class="seller-pics" ref="sellerPics">
          <ul class="seller-pic-list" ref="sellerPicsList">
            <li class="seller-pic" v-for="pic in seller.pics">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </li>
      <li class="seller-item" v-if="seller.infos">
        <h3 class="seller-title">商品信息</h3>
        <ul class="seller-infos">
          <li class="border-l" v-for="info in seller.infos">{{ info }}</li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {setLocal, getLocal} from 'common/js/storage';
  import star from 'components/star/star';
  import supportsIcon from 'components/supportIcon/supportIcon';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        collect: (() => {
          return getLocal(this.seller.id, 'collect', false);
        })()
      };
    },
    mounted(){
      this.$nextTick(() => { // 只监听seller数据变化是不够的，切换路由的时候 数据没有发生变化，这时候 watch不会触发
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleCollect(event){
        if (!event._constructed) {
          return;
        }
        this.collect = !this.collect;
        setLocal(this.seller.id, 'collect', this.collect);
      },
      _initScroll(){
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerBody, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics(){
        if (this.seller.pics) {
          let pic = 120;
          let marginR = 6;
          let len = this.seller.pics.length;
          let width = (pic + marginR) * len - marginR;
          this.$refs.sellerPicsList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.sellerPics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    watch: {
      'seller'() { // 页面刚打开时seller数据为空数组，当数据传入后，页面才渲染完成，这时候better-scroll才能正确获取dom
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    computed: {
      isCollect(){
        return this.collect ? '已收藏' : '收藏';
      }
    },
    components: {
      'v-star': star,
      'v-supports-icon': supportsIcon
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin.styl"

  $rgb_7_17_27 = rgb(7, 17, 27)
  $rgb_77_85_93 = rgb(77, 85, 93)
  $rgb_147_153_159 = rgb(147, 153, 159)
  $rgba_7_17_27_0 = rgba(7, 17, 27, .1)
  $px_10 = 10px
  $px_14 = 14px
  $px_16 = 16px
  $px_18 = 18px
  $px_24 = 24px

  .seller-body
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    background-color #f3f5f7
    .seller-list
      .seller-item
        padding 18px 18px 0
        background-color #fff
        border-top 1px solid $rgba_7_17_27_0
        border-bottom 1px solid $rgba_7_17_27_0
        margin-bottom $px_16
        &.seller-head
          padding $px_18 0 0
          .seller-head-top
            margin 0 $px_18
            border-b(1px, solid, $rgba_7_17_27_0)
        &.seller-pics-wrapper
          padding-right 0
          padding-bottom $px_18
        &:first-of-type
          border-top none
        &:last-of-type
          border-bottom none
          margin-bottom 0
        .seller-title
          font-size $px_14
          font-weight normal
          color $rgb_7_17_27
        .seller-ratings
          display table
          font-size 0
          padding 8px 0 18px
          li
            display table-cell
            vertical-align middle
            &.seller-ratingCount, &.seller-sellCount
              font-size $px_10
              color $rgb_77_85_93
              line-height 18px
            &.seller-ratingCount
              padding-left 2px
            &.seller-sellCount
              padding-left $px_10 + 2
        .seller-collect
          position absolute
          right -2px
          top 0
          width 40px
          text-align center
          i
            font-size 24px
            color rgb(240, 20, 20)
          p
            margin-top 4px
            font-size 10px
            color $rgb_77_85_93
          &.notCollect
            i
              color $rgb_147_153_159
        .seller-distribution
          display flex
          padding 18px 0
          li
            flex 1
            text-align center
            border-r(1px, solid, $rgba_7_17_27_0)
            font-size $px_10
            &:last-of-type
              border-r-none()
            & > span
              color $rgb_147_153_159
            & > p
              color $rgb_7_17_27
              line-height 24px
              strong
                font-size $px_14
        .seller-bulletin
          font-size $px_14 - 2
          font-weight normal
          margin 8px 12px 16px
          color rgb(240, 20, 20)
          line-height 2 * @font-size
        .seller-supports
          .supports-item
            display table
            width 100%
            padding $px_16 $px_16 - 4
            border-t(1px, solid, $rgba_7_17_27_0)
            span
              display table-cell
            p
              font-size $px_14 - 2
              color $rgb_7_17_27
              line-height $px_16
              padding-left 6px

        .seller-pics
          margin-top $px_14 - 2
          width 100%
          overflow hidden
          white-space: nowrap
          .seller-pic-list
            font-size 0
            .seller-pic
              display inline-block
              width 120px
              height 90px
              margin-right 6px
              &:last-child
                margin-right 0
        .seller-infos
          margin-top 12px
          li
            border-t(1px, solid, $rgba_7_17_27_0)
            padding $px_16 12px
            font-size 12px
            color $rgb_7_17_27
            line-height $px_16
</style>

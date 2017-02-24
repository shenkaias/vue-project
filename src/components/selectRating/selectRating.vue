<template>
  <div class="ratings-wrapper">
    <ul class="ratings-type">
      <li class="ratings-type-item" :class="{'active':ratingsType===2}" @click="selectType(2,$event)"><strong>{{
        ratingsDesc.all }}</strong>{{ Positive.length+Negative.length }}
      </li>
      <li class="ratings-type-item" :class="{'active':ratingsType===0}" @click="selectType(0,$event)"><strong>{{
        ratingsDesc.positive }}</strong>{{ Positive.length }}
      </li>
      <li class="ratings-type-item negative" :class="{'active':ratingsType===1}" @click="selectType(1,$event)"><strong>{{
        ratingsDesc.negative }}</strong>{{ Negative.length }}
      </li>
    </ul>
    <p class="have-ratings-cont" :class="{'on':hasContent}" @click="toggleContent">
      <i class="icon-check_circle"></i><span>只看有内容的评价</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const All = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default(){
          return [];
        }
      },
      ratingsType: {
        type: Number,
        default: All
      },
      hasContent: {
        type: Boolean,
        default: false
      },
      ratingsDesc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      Positive(){
        return this.ratings.filter((ratings) => {
          return ratings.rateType === POSITIVE;
        });
      },
      Negative(){
        return this.ratings.filter((ratings) => {
          return ratings.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      selectType(type, event){
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);// 子组件派发事件给父组件
      },
      toggleContent(event){
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');// 子组件派发事件给父组件
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin"

  .ratings-wrapper
    .ratings-type
      padding 18px 0
      font-size 0
      border-b(1px, solid, rgba(7, 17, 27, .1))
      .ratings-type-item
        display inline-block
        line-height 16px
        padding 8px 12px
        margin-right 8px
        border-radius 2px
        font-size 8px
        color rgb(77, 85, 93)
        background-color rgba(0, 160, 220, .2)
        > strong
          font-size 12px
          font-weight normal
          margin-right 3px
        &:last-of-type
          margin-right 0
        &.negative
          background-color rgba(77, 85, 93, .2)
          color rgb(77, 85, 93)
          &.active
            background-color rgb(77, 85, 93)
        &.active
          color #fff
          background-color rgb(0, 160, 220)

    .have-ratings-cont
      display table
      padding 12px 0
      line-height 24px
      font-size 0
      color rgb(147, 153, 159)
      i
        display table-cell
        vertical-align middle
        font-size 24px
        margin-right 4px
      span
        display table-cell
        font-size 12px
      &.on
        i
          color #00c850
        span
          color #9ca1a6
</style>

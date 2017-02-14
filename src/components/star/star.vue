<template>
  <div class="star-wrapper" :class="starType">
    <span v-for="item in items" :class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const STAR_LENGTH = 5;
  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType(){
        return 'star-' + this.size;
      },
      items(){
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let decimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(STAR_ON);
        }
        if (decimal) {
          result.push(STAR_HALF);
        }
        while (result.length < STAR_LENGTH) {
          result.push(STAR_OFF);
        }
        return result;
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin.styl"

  star-size($width, $marginRight)
    width $width
    height @width
    margin-right $marginRight
    background-size @width @height

  .star-wrapper
    font-size 0
    &>span
      display inline-block
      background-repeat no-repeat
      &:last-child
        margin-right 0

    &.star-48>span
      star-size(20 px, 22 px, 48)
      &.on
        backgroundPng("img/star48_on")
      &.half
        backgroundPng("img/star48_half")
      &.off
        backgroundPng("img/star48_off")

    &.star-36>span
      star-size(15px, 6px)
      &.on
        backgroundPng("img/star36_on")
      &.half
        backgroundPng("img/star36_half")
      &.off
        backgroundPng("img/star36_off")
    &.star-24>span
      star-size(10px, 3px)
      &.on
        backgroundPng("img/star24_on")
      &.half
        backgroundPng("img/star24_half")
      &.off
        backgroundPng("img/star24_off")

</style>

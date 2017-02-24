<template>
  <ul class="goods-control">
    <transition name="move">
      <li class="goods-reduce" v-show="food.num>0" @click.stop.prevent="reduce">
        <i class="icon-remove_circle_outline"></i>
      </li>
    </transition>
    <li class="goods-num" v-show="food.num>0">{{ food.num }}</li>
    <li class="goods-add icon-add_circle" @click.stop.prevent="add"></li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default{
    props: {
      food: {
        type: Object
      },
      goods: {
        type: Array
      }
    },
    methods: {
      add(event){
        if (!event._constructed) {
          return;
        }
        this.controlNum(1);
        this.$emit('addFood', event.target);
      },
      reduce(event){
        if (!event._constructed) {
          return;
        }
        this.controlNum(-1);
      },
      controlNum(n){
        this.goods.forEach((item) => {
          item.foods.forEach((food) => {
            if (food.name === this.food.name) { // 找出相同的name（应该为id但是源数据里没有）
              if (n > 0) { // 加还是减
                if (!food.num) {
                  Vue.set(food, 'num', 1);
                } else {
                  food.num++;
                }
                if (item.activity > 0) { // 不是活动类目下的对象
                  if (!item.num) {
                    Vue.set(item, 'num', 1);
                  } else {
                    item.num++;
                  }
                }
              } else {
                item.num--;
                food.num--;
              }
            }
          });
        });
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  .goods-control
    display table
    & li
      display table-cell
      vertical-align middle
      &.goods-reduce, &.goods-add
        color rgb(0, 160, 220)
        font-size 24px
        padding 5px
      &.goods-num
        width 4px
        color rgb(147, 153, 159)
        font-size 10px
      &.goods-reduce
        opacity 1
        transform translate3d(0, 0, 0)
        & > i
          display table-cell
          transform rotate(0)
        &.move-enter-active, &.move-leave-active
          transition all .3s linear
        &.move-enter, &.move-leave-active
          opacity 0
          transform translate3d(24px, 0, 0)
          & > i
            transform rotate(180deg)
</style>

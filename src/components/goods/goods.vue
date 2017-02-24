<template>
  <section class="goods-wrapper">
    <div class="goods-menu" ref="menuWrapper">
      <ul>
        <li v-for="(menu,index) in goods" :class="{'active':activeIndex===index}" @click="selectHeight(index,$event)">
          <h6 class="border-l">
            <v-support-icon :size="3" :type="goods[index].type"></v-support-icon>
            <b>{{ menu.name }}</b>
            <i v-if="menu.activity>0" v-show="menu.num" class="menu-num">{{menu.num}}</i>
          </h6>
        </li>
      </ul>
    </div>
    <div class="goods-foods" ref="foodWrapper">
      <div>
        <dl class="goods-item" v-for="item in goods" ref="goodsItem">
          <dt class="goods-title">{{ item.name }}</dt>
          <dd class="goods-food border-l" v-for="food in item.foods" @click="sellectFood(food,$event)">
            <div class="food-img">
              <img :src="food.icon">
            </div>
            <div class="food-detail">
              <h5 class="food-name">{{ food.name }}</h5>
              <p v-if="food.description" class="food-describe">{{ food.description }}</p>
              <p class="food-describe sale">
                <span>月售{{ food.sellCount }}份</span>
                <span>好评率{{ food.rating }}%</span>
              </p>
              <p class="food-prize">
                <span class="prize-present">¥<strong>{{ food.price }}</strong></span>
                <span v-if="food.oldPrice" class="prize-original">¥<strong>{{ food.oldPrice }}</strong></span>
              </p>
            </div>
            <div class="food-control">
              <v-goods-control :goods="goods" :food="food" @addFood="addFood"></v-goods-control>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <v-shop-cart ref="shopCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"
                 :selectGoods="selectGoods"></v-shop-cart>
    <v-goods-details ref="goodsDetails" :goods="sellectedFood" @addFood="addFood"></v-goods-details>
  </section>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import supportIcon from '../supportIcon/supportIcon';
  import shopCart from '../shopCart/shopCart';
  import goodsControl from '../goodsControl/goodsControl';
  import goodsDetails from '../goodsDetails/goodsDetails';

  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        heightList: [],
        menuY: 0,
        sellectedFood: {}
      };
    },
    computed: {
      activeIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i + 1];
          if (!height2 || (this.menuY >= height1 && this.menuY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectGoods(){
        let list = [];
        let obj = {};
        let select = [];
        this.goods.forEach((goods) => {
          goods.foods.forEach((foods) => {
            if (!obj[foods.name]) {
              list.push(foods);
              obj[foods.name] = true;
            }
          });
        });
        list.forEach((item) => {
          if (item.num) {
            select.push(item);
          }
        });
        return select;
      }
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initBScroll();
            this._calculatedHeight();
          });
        }
      });
    },
    methods: {
      sellectFood(food, event){
        if (!event._constructed) {
          return;
        }
        this.sellectedFood = food;
        this.$refs.goodsDetails.show();
      },
      addFood(target){
        this._drop(target);
      },
      _drop(target){
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target);
          // this.$refs可获取dom也可以获取子组件
        });
      },
      selectHeight(index, event){
        if (!event._constructed) {
          return;
        }
        let foods = this.$refs.goodsItem;
        let element = foods[index];
        this.foodScroll.scrollToElement(element, 300);
      },
      _initBScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          this.menuY = Math.abs(Math.round(pos.y));
        });
      },
      _calculatedHeight(){
        let foods = this.$refs.goodsItem;
        let _height = 0;
        this.heightList.push(_height);
        for (let i = 0; i < foods.length; i++) {
          let item = foods[i];
          _height += item.clientHeight;
          this.heightList.push(_height);
        }
      }
    },
    components: {
      'v-support-icon': supportIcon,
      'v-shop-cart': shopCart,
      'v-goods-control': goodsControl,
      'v-goods-details': goodsDetails
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/css/mixin"

  .goods-wrapper
    display flex
    position absolute
    top 174px
    left 0
    bottom 48px
    width 100%
    overflow hidden
    .goods-menu
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      & li
        display table
        padding 0 12px
        height 54px
        line-height $lineHeight + 2
        & > h6
          position relative
          display table-cell
          vertical-align middle
          font-weight normal
          width 56px
          border-b(1px, solid, rgba(7, 17, 27, .1))
          & > span
            display inline-block
            vertical-align -1px
          & > b
            font-weight normal
            font-size $fontSize
          & .menu-num
            position absolute
            top 3px
            right -10px
            width 16px
            height 12px
            line-height @height + 2
            text-align center
            border-radius 10px
            font-style normal
            font-size 9px
            font-weight 700
            color #fff
            background-color #f01414
            box-shadow 0 4px 8px rgba(0, 0, 0, 0.4)

        &.active
          position relative
          top -1px
          background-color #fff
          z-index 10
          & > h6
            font-weight 700
            border-b-none()
    .goods-foods
      flex 1
      .goods-item
        .goods-title
          text-indent 14px
          line-height 26px
          font-size $fontSize
          color rgb(147, 153, 159)
          background-color #f3f5f7
          border-left 2px solid #d9dde1
        .goods-food
          display flex
          align-items flex-start
          padding 18px
          border-b(1px, solid, rgba(7, 17, 27, .1))
          &:last-child
            border-b-none()
          .food-img
            width 57px
            height @width
            flex 0 0 @width
            margin-right 10px
          .food-detail
            flex 1
            .food-name
              font-size $fontSize + 2
              line-height $lineHeight + 2
              margin-top 2px
              color rgb(7, 17, 27)
            .food-describe
              margin-top 8px
              font-size $fontSize
              color rgb(147, 153, 159)
              &.sale
                font-size 0
                > span
                  margin-right 12px
                  font-size $fontSize
                  :last-child
                    margin-right 0

            .food-prize
              font-size 0
              & > span
                display inline-block
                font-size $fontSize
                line-height 24px
                &.prize-present
                  color rgb(240, 20, 20)
                  margin-right 8px
                &.prize-original
                  position relative
                  top -1px
                  color rgb(147, 153, 159)
                  text-decoration line-through
                  & > strong
                    font-size inherit
                & > strong
                  font-size $fontSize + 2
                  font-weight 700
                  margin-left 2px

          .food-control
            position absolute
            right 13px
            bottom 10px
</style>

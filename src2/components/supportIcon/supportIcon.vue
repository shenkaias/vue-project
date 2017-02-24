<template>
  <span v-if="type>-1" :class="'support-'+size+'_'+classMap[type]"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
 @import "../../common/css/mixin.styl"

  [class^="support-1_"], [class^="support-3_"]
    width 12px
    height @width
    background-size @width @height

  [class^="support-2_"], [class^="support-4_"]
    width 16px
    height @width
    background-size @width @height

  .support-1_decrease
    supportIcon(decrease_1)
  .support-1_discount
    supportIcon(discount_1)
  .support-1_special
    supportIcon(special_1)
  .support-1_invoice
    supportIcon(invoice_1)
  .support-1_guarantee
    supportIcon(guarantee_1)

  .support-2_decrease
    supportIcon(decrease_2)
  .support-2_discount
    supportIcon(discount_2)
  .support-2_special
    supportIcon(special_2)
  .support-2_invoice
    supportIcon(invoice_2)
  .support-2_guarantee
    supportIcon(guarantee_2)

  .support-3_decrease
    supportIcon(decrease_3)
  .support-3_discount
    supportIcon(discount_3)
  .support-3_special
    supportIcon(special_3)
  .support-3_invoice
    supportIcon(invoice_3)
  .support-3_guarantee
    supportIcon(guarantee_3)

  .support-4_decrease
    supportIcon(decrease_4)
  .support-4_discount
    supportIcon(discount_4)
  .support-4_special
    supportIcon(special_4)
  .support-4_invoice
    supportIcon(invoice_4)
  .support-4_guarantee
    supportIcon(guarantee_4)

</style>

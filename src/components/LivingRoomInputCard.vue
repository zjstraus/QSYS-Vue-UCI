<template>
  <div class="LivingRoomInputCard" >
    <JqxExpander :theme=theme :expanded="false">
      <div><BaseLED :namedControl=meterControl></BaseLED><b>{{cardlabel}}</b></div>
      <div>

      </div>
    </JqxExpander>
  </div>
</template>

<script>
import JqxExpander from "jqwidgets-scripts/jqwidgets-vue/vue_jqxexpander.vue";
import BaseLED from "@/components/BaseLED";

export default {
  components : {
    JqxExpander,
    BaseLED
  },
  props: {
    cardlabel: String,
    meterControl: String,
    theme: String
  }
}
</script>

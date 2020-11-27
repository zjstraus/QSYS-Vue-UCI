<template>
  <div class="ZoneCard" >
    <JqxExpander :theme="theme">
      <div>{{cardlabel}}</div>
      <div>
        <template v-for="slider in sliders">
          <div :key="`${slider.control}-container`" class="faderContainer">
            <b class="faderLabel" :key="`${slider.control}-label`">{{slider.label}}</b>
            <HorizontalSlider
                class="fader"
                :theme="theme"
                :key="`%{slider.control}-slider`"
                :namedControl=slider.control
                :min=-100
                :max=0>
            </HorizontalSlider>
          </div>
        </template>
      </div>
    </JqxExpander>
  </div>
</template>

<script>
import JqxExpander from "jqwidgets-scripts/jqwidgets-vue/vue_jqxexpander.vue";

import HorizontalSlider from "@/components/HorizontalSlider";

export default {
  components : {
    HorizontalSlider,
    JqxExpander,
  },
  props: {
    cardlabel: String,
    sliders: Array,
    theme: String
  }
}
</script>

<style>
.faderContainer {
  height: 35px;
  overflow: hidden;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.faderLabel {
  width: 10%;
}
</style>

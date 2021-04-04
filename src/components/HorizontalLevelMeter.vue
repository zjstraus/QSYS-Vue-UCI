<!--Copyright (C) 2020  Zach Strauss-->

<!--This program is free software: you can redistribute it and/or modify-->
<!--it under the terms of the GNU General Public License as published by-->
<!--the Free Software Foundation, version 3.-->

<!--This program is distributed in the hope that it will be useful,-->
<!--but WITHOUT ANY WARRANTY; without even the implied warranty of-->
<!--MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the-->
<!--GNU General Public License for more details.-->

<!--You should have received a copy of the GNU General Public License-->
<!--along with this program.  If not, see <https://www.gnu.org/licenses/>.-->

<template>
  <div class="vu-meter"
        :style="style">
    <canvas
        style="width: 100%;height: 100%"
      v-draw-meter="{ amp: level }">
    </canvas>
  </div>
<!--  <JqxLinearGauge-->
<!--      :theme=theme-->
<!--      :width="'100%'"-->
<!--      :ref=namedControl-->
<!--      :min=0-->
<!--      :max=1-->
<!--      :height="'20px'"-->
<!--      :value=Level-->
<!--      :ranges="ranges"-->
<!--      :showRanges="false"-->
<!--      :labels="labels"-->
<!--      :ticksMajor="ticksMajor"-->
<!--      :ticksMinor="ticksMinor"-->
<!--      :orientation="'horizontal'"-->
<!--      :ticksPosition="'far'"-->
<!--      :animation-duration="0">-->
<!--  </JqxLinearGauge>-->
</template>

<script>
export default {
  props: {
    namedControl: String,
    theme: String,
    width: String,
    height: String,
    refreshRate: {
      type: Number,
      default: 30
    }
  },
  directives: {
    drawMeter: function (canvas, binding) {
      let amp = binding.value.amp
      let w = canvas.width
      let h = canvas.height
      let ctx = canvas.getContext("2d")
      let gradient = ctx.createLinearGradient(0, 0, w, 0)
      gradient.addColorStop(0, "blue")
      gradient.addColorStop(.5, "lime")
      gradient.addColorStop(.75, "yellow")
      gradient.addColorStop(.9, "orange")
      gradient.addColorStop(1, "red")
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w * (1 - amp / -120), h)
    }
  },
  methods: {
  },
  computed: {
    style: function() {
      return `width: ${this.width}; height: ${this.height}`
    },
    level: function() {
      if (this.$store.state.controlData[this.namedControl]) {
        // let scaledVal = 1 - (this.$store.state.controlData[this.namedControl].Value / -120)
        // if (this.$refs[this.namedControl]) {
        //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //   this.$refs[this.namedControl].value = this.$store.state.controlData[this.namedControl].Value
        // }
        return this.$store.state.controlData[this.namedControl].Value
      }
      return -120
    }
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>

<style>
.vu-meter {
  position: relative;
}
canvas {
  background: black;
}
</style>
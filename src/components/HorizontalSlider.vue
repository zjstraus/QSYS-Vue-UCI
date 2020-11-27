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
  <JqxSlider
      :theme=theme
      :width="'90%'"
      :ref=namedControl
      :min=min
      :max=max
      :ticks-position="'top'"
      :tooltip="true"
      :tooltip-format-function="formatTooltip"
      :ticks-frequency="Math.abs(max - min) / 10"
      @change="sendChange()"
      :value=Value>
  </JqxSlider>
</template>

<script>
import JqxSlider from "jqwidgets-scripts/jqwidgets-vue/vue_jqxslider.vue"

export default {
  components: {
    JqxSlider
  },
  props: {
    namedControl: String,
    min: Number,
    max: Number,
    theme: String
  },
  methods: {
    sendChange: function() {
      this.$store.dispatch('sendValue', {
        name: this.namedControl,
        value: this.$refs[this.namedControl].value
      })
    },
    formatTooltip: function(value) {
      return value.toPrecision(2)
    }
  },
  computed: {
    Value: function() {
      if (this.$store.state.controlData[this.namedControl]) {
        if (this.$refs[this.namedControl]) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$refs[this.namedControl].value = this.$store.state.controlData[this.namedControl].Value
        }
        return this.$store.state.controlData[this.namedControl].Value
      }
      return this.min
    }
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>

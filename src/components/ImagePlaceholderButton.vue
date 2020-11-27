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
  <img alt="placeholder" class="ImagePlaceholderButton" v-bind:src="ImageData">
</template>

<script>

export default {
  props: {
    namedControl: String
  },
  computed: {
    ImageData: function() {
      if (this.$store.state.controlData[this.namedControl]) {
        let parsedLegend = JSON.parse(this.$store.state.controlData[this.namedControl].Legend)
        return "data:image;base64, " + parsedLegend.IconData
      }
      return 'data:image;base64,'
    }
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>

<style>
.ImagePlaceholderButton {
  max-width: 100%;
  max-height: 300px;
}
</style>

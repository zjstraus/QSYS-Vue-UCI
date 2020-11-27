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
  <div class="LED" v-bind:style="{ backgroundColor: Color }">
  </div>
</template>

<script>

export default {
  props: {
    namedControl: String
  },
  computed: {
    Color: function() {
      if (this.$store.state.controlData[this.namedControl]) {
        return this.$store.state.controlData[this.namedControl].Color
      }
      return '#FF00FF'
    }
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>

<style>
.LED {
  float: left;
  margin: 2px 10px 2px 2px;
  width: 15px;
  height: 15px;
}
</style>

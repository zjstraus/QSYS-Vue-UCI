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

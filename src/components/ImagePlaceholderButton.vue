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

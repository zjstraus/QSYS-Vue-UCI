<template>
  <span class="Text">{{ StringData }}</span>
</template>

<script>

export default {
  props: {
    namedControl: String
  },
  computed: {
    StringData: function() {
      if (this.$store.state.controlData[this.namedControl]) {
        return this.$store.state.controlData[this.namedControl].String
      }
      return 'No Data'
    }
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>
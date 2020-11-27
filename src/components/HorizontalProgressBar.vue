<template>
  <JqxProgressBar
      :theme=theme
      :width="'100%'"
      :ref=namedControl
      :min=0
      :max=1
      :height="'10px'"
      :value=Position
      :animation-duration="0">
  </JqxProgressBar>
</template>

<script>
import JqxProgressBar from "jqwidgets-scripts/jqwidgets-vue/vue_jqxprogressbar.vue"

export default {
  components: {
    JqxProgressBar
  },
  props: {
    namedControl: String,
    theme: String
  },
  methods: {
  },
  computed: {
    Position: function() {
      if (this.$store.state.controlData[this.namedControl]) {
        if (this.$refs[this.namedControl]) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$refs[this.namedControl].value = this.$store.state.controlData[this.namedControl].Position
        }
        return this.$store.state.controlData[this.namedControl].Position
      }
      return 0
    }
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>

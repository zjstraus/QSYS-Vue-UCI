<template>
  <JqxButton
      :theme=theme
      :width="'15%'"
      :ref=namedControl
      :height="30"
      v-on:click="click($event)">
    {{ label }}
  </JqxButton>
</template>

<script>
import JqxButton from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue';

export default {
  components: {
    JqxButton
  },
  props: {
    namedControl: String,
    label: String,
    theme: String
  },
  methods: {
    click: function(event) {
      console.log(event)
      this.$store.dispatch('sendTrigger', {
        name: this.namedControl
      })
    }
  },
  computed: {
  },
  mounted() {
    this.$store.dispatch('addNamedControl', this.namedControl)
  }
}
</script>

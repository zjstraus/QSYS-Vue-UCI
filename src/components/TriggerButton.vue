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

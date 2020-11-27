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
  <div class="LivingRoomInputCard" >
    <JqxExpander :theme=theme :expanded="false">
      <div><BaseLED :namedControl=meterControl></BaseLED><b>{{cardlabel}}</b></div>
      <div>

      </div>
    </JqxExpander>
  </div>
</template>

<script>
import JqxExpander from "jqwidgets-scripts/jqwidgets-vue/vue_jqxexpander.vue";
import BaseLED from "@/components/BaseLED";

export default {
  components : {
    JqxExpander,
    BaseLED
  },
  props: {
    cardlabel: String,
    meterControl: String,
    theme: String
  }
}
</script>

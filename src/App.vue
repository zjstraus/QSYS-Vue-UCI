<template>
  <div id="app">
    <div id="global" style="width: 100%; height: 50px" v-if="this.$store.state.engineStatus.Status.Code !== 0">
      <div style="background-color: red">
        {{this.$store.state.engineStatus.Status.String}}
      </div>
    </div>
    <JqxTabs :theme=Theme :animation-type="'fade'" :content-transition-duration="50">
      <ul>
        <li style="margin-left: 30px;">Sources</li>
        <li>Outs</li>
        <li>Marantz</li>
        <li>Other</li>
      </ul>

      <div id="sourcesTab" class="tabContainer">
        <div id="cards">
          <MarantzCard
              :theme=Theme
              cardlabel="TV / Marantz"
              meterControl="LivingRoomInputMetersTV"
              now-playing-image-control="HEOSAlbumArt"
              now-playing-progress-control="HEOSPlayProgression"
              now-playing-artist-control="HEOSNowPlayingArtist"
              now-playing-album-control="HEOSNowPlayingAlbum"
              now-playing-track-control="HEOSNowPlayingTrack"
              transport-previous-control="HEOSTransportLast"
              transport-play-control="HEOSTransportPlay"
              transport-pause-control="HEOSTransportPause"
              transport-stop-control="HEOSTransportStop"
              transport-next-control="HEOSTransportNext"/>
          <LivingRoomInputCard :theme=Theme cardlabel="XLR" meterControl="LivingRoomInputMetersXLR"/>
          <LivingRoomInputCard :theme=Theme cardlabel="TRS" meterControl="LivingRoomInputMetersTRS"/>
          <LivingRoomInputCard :theme=Theme cardlabel="BGM" meterControl="LivingRoomInputMetersBGM"/>
        </div>
        <div id="zones">
          <ZoneCard cardlabel="Main" :theme=Theme :sliders=MainZoneControls></ZoneCard>
          <ZoneCard cardlabel="Kitchen" :theme=Theme :sliders=KitchenZoneControls></ZoneCard>
          <ZoneCard cardlabel="Balcony" :theme=Theme :sliders=BalconyZoneControls></ZoneCard>
        </div>
      </div>

      <div id="outsTab" class="tabContainer">
        outs
      </div>

      <div id="marantzTab" class="tabContainer">
        marantz
      </div>

      <div id="otherTab" class="tabContainer">
        other
      </div>
    </JqxTabs>
    <div id="licenseCallout">
      Built using <a href="https://www.jqwidgets.com/">jQWidgets</a> components, not for commercial use
    </div>
  </div>
</template>

<script>
import LivingRoomInputCard from './components/LivingRoomInputCard.vue'
import ZoneCard from "@/components/ZoneCard";
import MarantzCard from "@/components/MarantzCard";
//import JqxDropDownList from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxdropdownlist.vue'
import JqxTabs from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxtabs.vue';

export default {
  name: 'App',
  components: {
    MarantzCard,
    ZoneCard,
    LivingRoomInputCard,
//    JqxDropDownList,
    JqxTabs
  },
  data() {
    return {
      ServerAddress: '192.168.201.10:8082',
      Theme: "material",
      Themes: [
          "material",
          "material-green",
          "material-purple",
          "dark",
          "metrodark"
      ],
      MainZoneControls: [
        {
          label: "TV",
          control: "LivingRoomMixTV"
        },
        {
          label: "XLR",
          control: "LivingRoomMixXLR"
        },
        {
          label: "TRS",
          control: "LivingRoomMixTRS"
        },
        {
          label: "M32",
          control: "LivingRoomMixM32"
        },
        {
          label: "BGM",
          control: "LivingRoomMixBGM"
        }
      ],
      KitchenZoneControls: [
        {
          label: "TV",
          control: "KitchenMixTV"
        },
        {
          label: "XLR",
          control: "KitchenMixXLR"
        },
        {
          label: "TRS",
          control: "KitchenMixTRS"
        },
        {
          label: "M32",
          control: "KitchenMixM32"
        },
        {
          label: "BGM",
          control: "KitchenMixBGM"
        }
      ],
      BalconyZoneControls: [
        {
          label: "TV",
          control: "BalconyMixTV"
        },
        {
          label: "XLR",
          control: "BalconyMixXLR"
        },
        {
          label: "TRS",
          control: "BalconyMixTRS"
        },
        {
          label: "M32",
          control: "BalconyMixM32"
        },
        {
          label: "BGM",
          control: "BalconyMixBGM"
        }
      ]
    }
  },
  methods: {
    checkWatchers () {
      console.log('setting up watchers')
      setInterval(() => {
        this.$store.dispatch('watchAllControls')
        }, 10000
      )
      setInterval(() => {
            this.$store.dispatch('pollChangeGroup')
          }, 75
      )
    }
  },
  computed: {
    engineStatus() {
      return this.$store.state.engineStatus.Status.String
    }
  },
  created() {
    this.checkWatchers()
  },
  mounted() {
    this.$store.commit('setProxyTarget', this.ServerAddress)
    this.$options.sockets.onopen = () => {
      console.log('sock open')
      setTimeout(() => {
        this.$store.dispatch('watchAllControls')
      }, 100)

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#licenseCallout {
  width: 100%;
  font-size: small;
  font-style: italic;
}

.tabContainer {
  display: flex;
  flex-direction: row;
}

#cards {
  flex: 66%;
}

#zones {
  flex: 33%;
}

@media (max-width: 900px) {
  .tabContainer {
    flex-direction: column;
  }

  #cards {
    flex: 100%;
  }

  #zones {
    flex: 100%;
  }

}
</style>

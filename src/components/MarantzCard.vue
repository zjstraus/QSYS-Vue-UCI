<template>
  <div class="MarantzInputCard" >
    <JqxExpander :theme=theme :expanded="false">
      <div><BaseLED :namedControl=meterControl></BaseLED><b>{{cardlabel}}</b></div>
      <div>
        <div style="width: 25%; float: left; margin: 10px">
          <ImagePlaceholderButton :named-control=nowPlayingImageControl />
          <HorizontalProgressBar :theme="theme" :named-control=nowPlayingProgressControl />
        </div>
        <div class="NowPlaying">
          <div class="NowPlayingInfo">
            <b>Artist</b><BaseText :named-control=nowPlayingArtistControl />
            <b>Album</b><BaseText :named-control=nowPlayingAlbumControl />
            <b>Track</b><BaseText :named-control=nowPlayingTrackControl />
          </div>
          <div class="TransportControls">
            <TriggerButton :theme="theme" :named-control=transportPreviousControl label="Prev" />
            <TriggerButton :theme="theme" :named-control=transportPlayControl label="Play" />
            <TriggerButton :theme="theme" :named-control=transportPauseControl label="Pause" />
            <TriggerButton :theme="theme" :named-control=transportStopControl label="Stop" />
            <TriggerButton :theme="theme" :named-control=transportNextControl label="Next" />
          </div>
        </div>
      </div>
    </JqxExpander>
  </div>
</template>

<script>
import JqxExpander from "jqwidgets-scripts/jqwidgets-vue/vue_jqxexpander.vue";
import BaseLED from "@/components/BaseLED";
import ImagePlaceholderButton from "@/components/ImagePlaceholderButton";
import BaseText from "@/components/BaseText";
import HorizontalProgressBar from "@/components/HorizontalProgressBar";
import TriggerButton from "@/components/TriggerButton";

export default {
  components : {
    TriggerButton,
    HorizontalProgressBar,
    BaseText,
    ImagePlaceholderButton,
    JqxExpander,
    BaseLED
  },
  props: {
    cardlabel: String,
    meterControl: String,
    nowPlayingImageControl: String,
    nowPlayingProgressControl: String,
    nowPlayingArtistControl: String,
    nowPlayingAlbumControl: String,
    nowPlayingTrackControl: String,
    transportPreviousControl: String,
    transportPlayControl: String,
    transportPauseControl: String,
    transportStopControl: String,
    transportNextControl: String,
    theme: String
  }
}
</script>

<style>
.NowPlaying {
  margin-top: 20px;
  float: right;
  width: 70%;
}
.NowPlayingInfo b {
  width: 10%;
  float: left;
}
.TransportControls .jqx-button {
  float: left;
  width: 15%;
  margin-left: 2%;
}
.Text {
  display: block;
  min-height: 2em;
  width: 90%;
}
</style>
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueNativeWebsocket from "vue-native-websocket";

Vue.config.productionTip = false
Vue.use(VueNativeWebsocket, 'wss://localhost/qrc', {
    connectManually: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 6000,
    store: store
})

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
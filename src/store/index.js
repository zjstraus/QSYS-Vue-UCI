/*
Copyright (C) 2020  Zach Strauss

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        engineStatus: {
            DesignCode: "",
            DesignName: "",
            IsEmulator: false,
            IsRedundant: false,
            Platform: "",
            State: "",
            Status: {
                Code: 0,
                String: ""
            }
        },
        controlData: {},
        jsonRPCCounter: 1,
        initNeeded: true,
        monitoredControls: {},
        controlMapping: [],
        websocketTarget: ''
    },
    actions: {
        /***
         * Get the design info and open a websocket to the core
         * @param context
         * @returns {Promise<void>}
         */
        async initConnection(context) {
            context.commit('clearInit')
            let designData = {}
            try {
                let resp = await fetch(`http://192.168.201.10:8082/designData.json`)
                designData = await resp.json()
            } catch (err) {
                context.commit('requireInit')
                return
            }
            context.commit('setWSTarget', designData.hostname)
            context.commit('setControlMapping', designData.design.ExternalControls)
            console.log('Connecting')

            await Vue.prototype.$connect(`ws://${designData.hostname}/qrc`)
            await context.dispatch('watchAllControls')
        },
        /***
         * Start monitoring a Named Control and add it to the store
         * @param context
         * @param {String} name - Named Control name
         * @returns {Promise<void>}
         */
        async addNamedControl(context, name) {
            if (context.state.initNeeded) {
                await context.dispatch('initConnection')
            }
            context.commit('addNamedControl', name)

            let controlData = context.state.controlMapping.filter(control => {
                control.Id === name
            })
            if (controlData.length > 0) {
                let message = {
                    jsonrpc: '2.0',
                    id: context.state.jsonRPCCounter,
                    method: 'ChangeGroup.AddControl',
                    params: {
                        Id: 'Vue UCI Bridge',
                        Controls: [
                            controlData[0].MappingName
                        ]
                    }
                }
                try {
                    Vue.prototype.$socket.send(JSON.stringify(message))
                    context.commit('incrementRPCCount')
                } catch (err) {
                    console.log('Socket error adding named control to group')
                }
            }
        },
        /***
         * Send a Control.SetTranslate and ChangeGroup.AddControl message with all the current Named Controls to ensure state
         * @param context
         * @returns {Promise<void>}
         */
        async watchAllControls(context) {
            if (context.state.initNeeded) {
                await context.dispatch('initConnection')
            }

            let message = {
                jsonrpc: '2.0',
                id: context.state.jsonRPCCounter,
                method: 'Control.SetTranslate',
                params: false
            }
            try {
                Vue.prototype.$socket.send(JSON.stringify(message))
                context.commit('incrementRPCCount')
            } catch (err) {
                console.log('Socket error setting translate flag')
            }

            let controls = []
            let controlKeys = Object.keys(context.state.monitoredControls)
            for (let i = 0; i < controlKeys.length; i++) {
                let controlData = context.state.controlMapping.filter(control => {
                    return control.Id === controlKeys[i]
                })
                if (controlData.length > 0) {
                    controls.push(controlData[0].MappingName)
                }
            }
            message = {
                jsonrpc: '2.0',
                id: context.state.jsonRPCCounter,
                method: 'ChangeGroup.AddControl',
                params: {
                    Id: 'Vue UCI Bridge',
                    Controls: controls
                }
            }
            try {
                Vue.prototype.$socket.send(JSON.stringify(message))
                context.commit('incrementRPCCount')
            } catch (err) {
                console.log('Socket error sending full control list')
            }
        },
        /***
         * Poll the Change Group on the Core for updates
         * @param context
         * @returns {Promise<void>}
         */
        async pollChangeGroup(context) {
            if (context.state.initNeeded) {
                await context.dispatch('initConnection')
            }

            let message = {
                jsonrpc: '2.0',
                id: context.state.jsonRPCCounter,
                method: 'ChangeGroup.Poll',
                params: {
                    Id: 'Vue UCI Bridge'
                }
            }
            if (Vue.prototype.$socket) {
                try {
                    Vue.prototype.$socket.send(JSON.stringify(message))
                    context.commit('incrementRPCCount')
                } catch (err) {
                    //Just throw these errors away
                }
            }
        },
        /***
         * Send a value update to the Core
         * @param context
         * @param {object} params
         * @param {string} params.name - Named Control name
         * @param {number} params.value - Value to set
         * @returns {Promise<void>}
         */
        async sendValue(context, params) {
            if (context.state.initNeeded) {
                await context.dispatch('initConnection')
            }

            if (context.state.controlData[params.name]) {
                context.commit('overrideNamedControlValue', params)
                let message = {
                    jsonrpc: '2.0',
                    id: context.state.jsonRPCCounter,
                    method: 'Control.Set',
                    params: {
                        Name: context.state.controlData[params.name].Name,
                        Value: params.value
                    }
                }
                Vue.prototype.$socket.send(JSON.stringify(message))
                await context.commit('incrementRPCCount')
            }
        },
        /***
         * Send a Trigger event to the Core
         * @param context
         * @param {object} params
         * @param {string} params.name - Named Control name
         * @returns {Promise<void>}
         */
        async sendTrigger(context, params) {
            if (context.state.initNeeded) {
                await context.dispatch('initConnection')
            }

            if (context.state.controlData[params.name]) {
                let message = {
                    jsonrpc: '2.0',
                    id: context.state.jsonRPCCounter,
                    method: 'Control.Set',
                    params: {
                        Name: context.state.controlData[params.name].Name,
                        Position: 1
                    }
                }
                Vue.prototype.$socket.send(JSON.stringify(message))
                await context.commit('incrementRPCCount')

                message = {
                    jsonrpc: '2.0',
                    id: context.state.jsonRPCCounter,
                    method: 'Control.Set',
                    params: {
                        Name: context.state.controlData[params.name].Name,
                        Position: 0
                    }
                }
                Vue.prototype.$socket.send(JSON.stringify(message))
                await context.commit('incrementRPCCount')
            }
        }
    },
    mutations: {
        /***
         * Callback for new messages from the Core
         * @param state
         * @param event
         * @constructor
         */
        SOCKET_ONMESSAGE (state, event) {
            let data = JSON.parse(event.data)

            if (data.method && data.method === "EngineStatus") {
                Vue.set(state, "engineStatus", data.params)
            }

            if (data.result) {
                // ChangeGroup.Poll responses
                if (data.result.Id === 'Vue UCI Bridge') {
                    for (let i = 0; i < data.result.Changes.length; i++) {
                        let controlData = state.controlMapping.filter(control => {
                            return data.result.Changes[i].Name === control.MappingName
                        })
                        if (controlData.length > 0) {
                            Vue.set(state.controlData, controlData[0].Id, data.result.Changes[i])
                        }
                    }
                }
            }
        },
        /***
         * Callback for websocket establishment
         * @param state
         * @param event
         * @constructor
         */
        SOCKET_ONOPEN (state, event) {
            Vue.prototype.$socket = event.currentTarget
        },
        /***
         * Callback for websocket cleanup
         * @param state
         * @param event
         * @constructor
         */
        SOCKET_ONCLOSE (state, event) {
            event.target.close()
            console.log('closed', event)
        },
        /***
         * Callback for websocket errors
         * @param state
         * @param event
         * @constructor
         */
        SOCKET_ONERROR (state, event) {
            console.log('WS Error', event)
        },
        /***
         * Callback for websocket connection
         * @constructor
         */
        SOCKET_ONCONNECT () {
            console.log('Websocket connected')
        },
        /***
         * Add a Named Control to the list of monitored controls
         * @param state
         * @param name
         */
        addNamedControl (state, name) {
            console.log(`Adding control ${name}` )
            if (state.monitoredControls[name] === undefined) {
                Vue.set(state.monitoredControls, name,  1)
            } else {
                state.monitoredControls[name]++
            }
        },
        /***
         * Mark init as done
         * @param state
         */
        clearInit (state) {
            state.initNeeded = false
        },
        /***
         * Bump the internal message counter
         * @param state
         */
        incrementRPCCount(state) {
            state.jsonRPCCounter++
        },
        /***
         * Locally override the value of a Named Control without sending an update to the Core
         * @param state
         * @param {object} params
         * @param {string} params.name - Named Control name
         * @param {number} params.value - New value
         */
        overrideNamedControlValue (state, params) {
            if (state.controlData[params.name]) {
                state.controlData[params.name].Value = params.value
            }
        },
        /***
         * Remove a Named Control from the list of monitored controls
         * @param state
         * @param name
         */
        removeNamedControl (state, name) {
            if (state.initNeeded) {
                return
            }
            let currentValue = state.monitoredControls[name]
            if (currentValue === undefined) {
                return
            }
            if (currentValue === 1) {
                Vue.delete(state.monitoredControls, name)
            } else {
                state.monitoredControls[name]--
            }
        },
        /***
         * Mark init as needed
         * @param state
         */
        requireInit (state) {
            state.initNeeded = true
        },
        /***
         * Set the controlMapping table
         * @param state
         * @param mapping
         */
        setControlMapping (state, mapping) {
            state.controlMapping = mapping
        },
        /***
         * Set the target address for the websocket
         * @param state
         * @param target
         */
        setWSTarget (state, target) {
            state.websocketTarget = target
        },
    }
})

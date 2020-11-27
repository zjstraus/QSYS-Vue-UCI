# Vuex store details
The Vuex store manages the websocket connection to the Core and handles the communication to update data. Usage follows
the general pattern:

 1. Dispatch the `initConnection` action to grab seed data and open the websocket
 2. Dispatch the `watchAllControls` action to set up the Change Group
 3. Add controls to the watch list with the `addNamedControl` action
 4. Periodically dispatch `pollChangeGroup` to get new data
 5. Reference data in controlData in your components

## Published Actions
### addNamedControl
**params**: String - Name to add

Add a Named Control and start monitoring it

### initConnection
**params**: None

Get the Core data from the Proxy and connect the websocket

### pollChangeGroup
**params**: none

Poll the Core for updated data

### sendValue
**params**: `{"name": "NamedControlName", "value": 12.34}`

Send the Core a new value for a control

### sendTrigger
**params**: `{"name": "NamedControlName"}`

Send the Core a trigger

### watchAllControls
**params**: none

Ensure the state of the Change Group on the Core

## Data Layout
After getting data with the above workflow the state will contain a `controlData` object with sub-objects for each
control. The contents of these objects basically mirrors what is received in Lua scripts on the Core:
```js
// Component setup
this.$store.dispatch('addNamedControl', 'BalconyMixBGM')
this.$store.dispatch('pollChangeGroup')

// Leads to the store containing:
controlData: {
    BalconyMixBGM: {
      String: '-81.3dB'
      Value: -81.3333435
      Position: 0.18666656
      Choices: []
      Color: ''
      Indeterminate: false
      Invisible: false
      Disabled: false
      Legend: ''
    }
}
```

### Internal Data
The state will also contain top-level keys holding configuration data and metadata for the websocket connection:
 * `controlMapping`: Data from the Core used to map Named Control names to QSYS internal references
 * `engineStatus`: Current Core status
 * `initNeeded`: Internal flag to attempt websocket startup
 * `jsonRPCCounter`: Rolling counter for message IDs
 * `monitoredControls`: List of active Named Controls
 * `websocketTarget`: Base address for the websocket URL
 
 ## Q-SYS Connection Details
 This relies on an undocumented QRC-over-websocket channel used by web UCIs. (As of Q-SYS 8.4)
 
 Watching the traffic from a web UCI shows that it makes an undocumented QRC call to the method `Control.SetTranslate` 
 at connection time and then sets up and polls a ChangeGroup containing some weird mangled control names to get the full 
 control data. Named controls normally only contain `String`, `Value`, and `Position`, but calling SetTranslate and 
 using this internal name also returns `Color`, `Legend`, etc allowing you to make full native UIs while still retaining 
 most of the functionality on the Core.
 
 Poking around the Core's web interface(s) shows that it publishes an XML document with mappings of Named Control names
 to all the internal names. This document is not served with CORS enabled, so it can't be loaded by a webapp, however
 by using the [sister server/proxy](https://github.com/zjstraus/QSYS-CORS-Bridge) to this project CORS can be worked 
 around and we can move XML parsing off the client.
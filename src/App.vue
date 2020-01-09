<template>
  <v-app>
    <v-content>
      <ros-dynamic-reconfigure-list v-if="connected" :ros="ros"/>
      <div v-else>Not connected. Start a rosbridge_websocket on localhost:9090</div>
    </v-content>
  </v-app>
</template>

<script>
import ROSLIB from 'roslib';
import { RosDynamicReconfigureList } from './entry';

export default {
  name:  'App', // vue library dev component
  components: {
    RosDynamicReconfigureList
  },
  data: () => ({
    ros: null,
    connected: false
  }),
  mounted() {
    this.ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    this.ros.on('connection', () => {
      this.connected = true;
    });
  },
  methods: {
  }
}
</script>

<style>
html { overflow-y: auto ! important }

body { margin: 0; }

</style>

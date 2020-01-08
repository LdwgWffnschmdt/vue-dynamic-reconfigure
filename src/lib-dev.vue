<template>
  <ros-dynamic-reconfigure v-if="connected"/>
  <div v-else>Not connected. Start a rosbridge_websocket on localhost:9090</div>
</template>

<script>
import ROSLIB from 'roslib';
import { RosDynamicReconfigure } from './entry';

export default {
  name:  'VueRosDynamicReconfigureLibDev', // vue library dev component
  components: {
    RosDynamicReconfigure
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

<template>
  <v-app>
    <v-content>
      <v-card
        v-if="connected"
        elevation="0"
        class="my-4 mx-auto"
        color="transparent"
        max-width="600"
      >
        <ros-dynamic-reconfigure-list :ros="ros"/>
      </v-card>
      <v-card
        v-else
        elevation="0"
        class="my-4 mx-auto"
        color="transparent"
        max-width="400"
      >
        <div>Please enter your robot's websocket address below. Since this page is served via HTTPS, only scure websockets over WSS are supported.</div>
        <v-text-field
          color="primary"
          v-model="address"
          :append-icon="connecting ? '' : 'send'"
          @click:append="connect"
          outline
          clearable
          label="Address"
          type="text"
          :loading="connecting"
          :error-messages="error"
        >
        </v-text-field>
      </v-card>
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
    address: "wss://localhost:9090",
    connected: false,
    connecting: false,
    error: ""
  }),
  mounted() {
    this.ros = new ROSLIB.Ros();

    this.ros.on('connection', () => {
      this.connecting = false;
      this.connected = true;
      this.error = "";
    });
    
    this.ros.on('error', () => {
      this.connecting = false;
      this.connected = false;
      this.error = "Can't connect. Make sure rosbridge_webserver is running.";
    });
    
    this.ros.on('close', () => {
      this.connecting = false;
      this.connected = false;
    });
  },
  methods: {
    connect() {
      this.connecting = true;
      this.ros.connect(this.address);
    }
  }
}
</script>
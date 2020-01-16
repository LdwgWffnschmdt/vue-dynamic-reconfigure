<template>
  <v-app :dark="dark">
    <v-toolbar class="elevation-0">
      <v-toolbar-title>vue-dynamic-reconfigure Demo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="connected" @click="ros.close()">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-btn icon @click="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/LdwgWffnschmdt/vue-dynamic-reconfigure">
        <v-icon>code</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-card
        v-if="connected"
        elevation="5"
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
        <div>Please enter your robot's websocket address below. Since this page is served via HTTPS, only secure websockets over WSS might be supported.</div>
        <br/>
        <v-form @submit.prevent="connect">
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
        </v-form>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import ROSLIB from 'roslib';
import { RosDynamicReconfigureList } from './plugin';

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
    error: "",
    dark: false
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
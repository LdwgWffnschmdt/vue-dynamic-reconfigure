<template>
  <ros-dynamic-reconfigure-topic v-for="(topic, index) in topics" :key="index" :topic="topic"></ros-dynamic-reconfigure-topic>
</template>

<script>
import * as ROSLIB from 'roslib'

import RosDynamicReconfigureTopic from './RosDynamicReconfigureTopic.vue'

import { setTimeout, clearTimeout } from 'timers';

export default {
  name: 'ros-dynamic-reconfigure-list',
  components: {
    RosDynamicReconfigureTopic
  },
  props: {
    ros: {
      type: Object,
      require: true,
    }
  },
  data: () => ({
    topics: []
  }),
  mounted() {
    this.getTopics();
  },
  methods: {
    getTopics() {
      this.ros.getTopicsForType("dynamic_reconfigure/ConfigDescription", (topics) => {
        this.topics = topics;
      });
    },
  }
};
</script>
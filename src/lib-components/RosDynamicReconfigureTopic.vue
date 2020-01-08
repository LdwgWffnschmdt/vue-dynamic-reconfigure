<template>
  <ros-dynamic-reconfigure v-for="(item, index) in topics" :key="index" :is="item.component" v-bind="item"></ros-dynamic-reconfigure>
</template>

<script>
import * as ROSLIB from 'roslib'

import { setTimeout, clearTimeout } from 'timers';

export default {
  name: 'ros-dynamic-reconfigure-topic',
  props: {
    ros: {
      type: Object,
      require: true
    },
    topic: {
      type: String,
      require: true
    }
  },
  watch: {
    topic(n) {
      this.$nextTick(this.reload);
    }
  },
  data: () => ({
    topics: []
  }),
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      this.unsubscribe();
      this.subscribe();
    },
    subscribe() {
      if (this.topic != "") {

      }
    },
    unsubscribe() {

    },
  },
  beforeDestroy() {
    this.unsubscribe();
  }
};
</script>
<template>
  <!-- <ros-dynamic-reconfigure v-for="(item, index) in topics" :key="index" :is="item.component" v-bind="item"></ros-dynamic-reconfigure> -->
  <div><v-card>{{ topic }}</v-card></div>
</template>

<script>
import * as ROSLIB from 'roslib'

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
    topic() {
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
        this.debugTopic = new ROSLIB.Topic({
          ros: this.ros,
          name: this.topic,
          messageType: "dynamic_reconfigure/ConfigDescription"
        });
      }
    },
    unsubscribe() {
      return;
    },
  },
  beforeDestroy() {
    this.unsubscribe();
  }
};
</script>
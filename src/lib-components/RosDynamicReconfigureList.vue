<template>
  <div><ros-dynamic-reconfigure-topic v-for="(topic, index) in topics" :key="index" :topic="topic"></ros-dynamic-reconfigure-topic></div>
</template>

<script>
import RosDynamicReconfigureTopic from './RosDynamicReconfigureTopic.vue'

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
<template>
  <v-expansion-panel popout>
    <v-expansion-panel-content
      v-for="(node, index) in nodes" :key="index"
    >
      <template v-slot:header>
        <div>{{node}}</div>
      </template>
      <v-card>
        <ros-dynamic-reconfigure-node :node="node" :ros="ros"></ros-dynamic-reconfigure-node>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import RosDynamicReconfigureNode from './RosDynamicReconfigureNode.vue'

export default {
  name: 'ros-dynamic-reconfigure-list',
  components: {
    RosDynamicReconfigureNode
  },
  props: {
    ros: {
      type: Object,
      require: true,
    }
  },
  data: () => ({
    nodes: []
  }),
  mounted() {
    this.getNodes();
  },
  methods: {
    getNodes() {
      this.ros.getTopicsForType("dynamic_reconfigure/ConfigDescription", (topics) => {
        this.nodes = topics.map((topic) => topic.replace("/parameter_descriptions", ""));
      });
    },
  }
};
</script>
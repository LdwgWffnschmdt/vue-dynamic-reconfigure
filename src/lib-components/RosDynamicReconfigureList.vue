<template>
  <div>
    <v-layout px-2 class="ros-dynamic-reconfigure-breadcrumbs">
      <v-flex shrink>
        <v-btn
          class="mx-0"
          flat
          color="primary"
          small
          :disabled="path.length == 0"
          @click="navigate('')">
          /
        </v-btn>
      </v-flex>
      <v-flex>
        <v-breadcrumbs :items="path" class="pa-0">
          <template v-slot:divider>
            /
          </template>
          <template v-slot:item="props">
            <v-slide-x-transition>
              <v-btn
                class="mx-0"
                flat
                color="primary"
                small
                @click="navigate(props.item.path)"
                :disabled="props.item.current">
                {{ props.item.name }}
              </v-btn>
            </v-slide-x-transition>
          </template>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-card elevation="0">
      <v-slide-y-transition
        leave-absolute
        group
        tag="v-list"
      >
        <template v-for="(subNode, subNodeName, i) in currentNode">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>
          <v-list-tile
            :key="`${i}-${subNodeName}`"
            @click="navigate(subNodeName)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subNodeName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-slide-y-transition>
      <v-slide-y-transition leave-absolute>
        <div v-if="nodes.includes(currentPath)">
          <v-divider class="mb-3" v-if="!isEmpty(currentNode)"></v-divider>
          <ros-dynamic-reconfigure-node :node="currentPath" :ros="ros"></ros-dynamic-reconfigure-node>
        </div>
      </v-slide-y-transition>
    </v-card>
  </div>
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
    nodesTree: {},
    nodes: [],
    path: [],
  }),
  computed: {
    currentNode() {
      var current = this.nodesTree;
      if (this.path.length == 0) return current;
      for (var n in this.path) {
        if (this.path[n].path == "") continue;
        current = current[this.path[n].name];
      }
      return current;
    },
    currentPath() {
      if (this.path.length == 0) {
        return "";
      }
      else {
        return this.path[this.path.length - 1].path;
      }
    }
  },
  mounted() {
    this.getNodes();
  },
  methods: {
    getNodes() {
      this.ros.getTopicsForType("dynamic_reconfigure/ConfigDescription", (topics) => {
        this.nodes = topics.map((topic) => topic.replace("/parameter_descriptions", ""));
        // this.nodes = [
        //   "/amcl/test1",
        //   "/amcl/test2",
        //   "/amcl/test3",
        //   "/amcl/test4",
        //   "/amcl/test5",
        //   "/rosbag/test1",
        //   "/rosbag/test2",
        //   "/rosbag/test3",
        //   "/rosbag/test4",
        //   "/seteet/test1",
        //   "/seteet/test2",
        //   "/seteet/test3",
        //   "/seteet/test1/hallo1",
        //   "/seteet/test1/hallo2",
        //   "/seteet/test1/hallo3",
        //   "/seteet/test1/hallo4"
        // ]
        var data = {};
        for (var i = 0 ; i< this.nodes.length; i++) {
          this.buildTree(this.nodes[i].substr(1).split("/"), data);    
        }

        this.nodesTree = data;
      });
    },
    buildTree(parts, treeNode) {
      if(parts.length === 0) {
        return; 
      }

      for(var n in treeNode) {
        if(parts[0] == n) {
          this.buildTree(parts.splice(1, parts.length), treeNode[n]);
          return;
        }
      }

      treeNode[parts[0]] = {};
      this.buildTree(parts.splice(1, parts.length), treeNode[parts[0]]);
    },
    navigate(node) {
      if (node == "") {
        this.path = [];
      }
      else if (node[0] == "/") {
        for (let i = this.path.length - 1; i >= 0; i--) {
          const element = this.path[i];
          if (element.path == node) {
            element.current = true;
            break;
          }
          this.path.pop(element);
        }
      }
      else {
        for (var n in this.path) {
          this.path[n].current = false;
        }

        this.path.push({
          name: node,
          path: this.currentPath + "/" + node,
          current: true
        });
      }
    },
    isEmpty(obj) {
      return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
  }
};
</script>

<style scoped>
.ros-dynamic-reconfigure-breadcrumbs .v-btn {
  min-width: 28px;
}
</style>
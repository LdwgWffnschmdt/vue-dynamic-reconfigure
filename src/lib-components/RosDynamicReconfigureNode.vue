<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular class="my-3"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="groups && groups.length > 0">
      <v-container v-if="defaultGroup && defaultGroup.parameters.length > 0" px-0 py-3>
        <v-layout row wrap v-for="(parameter, index) in defaultGroup.parameters" :key="index">
          <v-flex xs12 sm12 px-0 my-2 v-if="index !== 0" :key="`${index}-divider`">
            <v-divider/>
          </v-flex>
          <v-flex xs12 sm12 px-3>
            <ros-dynamic-reconfigure-enum v-if="parameter.edit_method != ''" v-model="defaultGroup.parameters[index]" v-on:change="change"></ros-dynamic-reconfigure-enum>
            <div v-else :is="'ros-dynamic-reconfigure-' + parameter.type" v-model="defaultGroup.parameters[index]" v-on:change="change"></div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-tabs
        v-if="tabs.length > 0"
      >
        <v-tabs-slider color="primary"></v-tabs-slider>
        
        <v-tab
          v-for="(group, index) in tabs"
          :key="index"
          :href="'#tab-' + index"
        >
          {{ group.name }}
        </v-tab>

        <v-tabs-items>
          <v-tab-item
            v-for="(group, index) in tabs"
            :key="index"
            :value="'tab-' + index"
          >
            <v-container px-0 py-3>
              <v-layout row wrap v-for="(parameter, index) in group.parameters" :key="index">
                <v-flex xs12 sm12 px-0 my-2 v-if="index !== 0" :key="`${index}-divider`">
                  <v-divider/>
                </v-flex>
                <v-flex xs12 sm12 px-3>
                  <ros-dynamic-reconfigure-enum v-if="parameter.edit_method != ''" v-model="group.parameters[index]" v-on:change="change"></ros-dynamic-reconfigure-enum>
                  <div v-else :is="'ros-dynamic-reconfigure-' + parameter.type" v-model="group.parameters[index]" v-on:change="change"></div>
                </v-flex>
              </v-layout>
            </v-container>
            <div v-if="groups.filter(g => g.parent == group.id).length > 0">
              <v-container px-0 py-3 v-for="(subGroup, index) in groups.filter(g => g.parent == group.id)" :key="index">
                <v-subheader>{{ subGroup.name }}</v-subheader>
                <v-layout row wrap v-for="(parameter, index) in subGroup.parameters" :key="index">
                  <v-flex xs12 sm12 px-0 my-2 v-if="index !== 0" :key="`${index}-divider`">
                    <v-divider/>
                  </v-flex>
                  <v-flex xs12 sm12 px-3>
                    <ros-dynamic-reconfigure-enum v-if="parameter.edit_method != ''" v-model="subGroup.parameters[index]" v-on:change="change"></ros-dynamic-reconfigure-enum>
                    <div v-else :is="'ros-dynamic-reconfigure-' + parameter.type" v-model="subGroup.parameters[index]" v-on:change="change"></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import * as ROSLIB from 'roslib'

import RosDynamicReconfigureEnum from './RosDynamicReconfigureEnum.vue'
import RosDynamicReconfigureStr from './RosDynamicReconfigureStr.vue'
import RosDynamicReconfigureInt from './RosDynamicReconfigureInt.vue'
import RosDynamicReconfigureBool from './RosDynamicReconfigureBool.vue'
import RosDynamicReconfigureDouble from './RosDynamicReconfigureDouble.vue'

export default {
  name: 'ros-dynamic-reconfigure-node',
  components: {
    RosDynamicReconfigureEnum,
    RosDynamicReconfigureStr,
    RosDynamicReconfigureInt,
    RosDynamicReconfigureBool,
    RosDynamicReconfigureDouble
  },
  props: {
    ros: {
      type: Object,
      require: true
    },
    node: {
      type: String,
      require: true
    }
  },
  watch: {
    node() {
      this.$nextTick(this.reload);
    }
  },
  data: () => ({
    groups: [],
    loading: false
  }),
  computed: {
    defaultGroup() {
      return this.groups.filter(g => g.parent == 0 && g.type == '' && g.name == "Default")[0] || null;
    },
    tabs() {
      return this.groups.filter(g => g.parent == 0 && g.type == 'tab');
    }
  },
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      if (this.parameterUpdatesTopic) {
        this.parameterUpdatesTopic.unsubscribe();
        this.parameterUpdatesTopic = undefined;
      }

      this.groups = [];
      this.loading = true;

      this.parameterUpdatesTopic = new ROSLIB.Topic({
        ros: this.ros,
        name: this.node + "/parameter_updates",
        messageType: "dynamic_reconfigure/Config",
      });

      this.reconfigureClient = new ROSLIB.Service({
        ros : this.ros,
        name : this.node + '/set_parameters',
        serviceType : 'dynamic_reconfigure/Reconfigure'
      });

      this.parameterUpdatesTopic.subscribe(this.parameterUpdateFeedback);
    },
    getParameterDescriptions(values) {
      if (this.node != "") {
        this.parameterDescriptionsTopic = new ROSLIB.Topic({
          ros: this.ros,
          name: this.node + "/parameter_descriptions",
          messageType: "dynamic_reconfigure/ConfigDescription"
        });

        this.parameterDescriptionsTopic.subscribe((parameterDescriptions) => {
          if (parameterDescriptions && parameterDescriptions.groups) {
            // Add min / max / default to groups description
            for (var g in parameterDescriptions.groups) {
              var group = parameterDescriptions.groups[g];
              for (var param in group.parameters) {
                var parameter = group.parameters[param];

                // Parse enum definition
                if (parameter.edit_method != "") {
                  parameter.edit_method = JSON.parse(parameter.edit_method.replace(/'/g, '"'));
                }

                // Max
                for (var ma in parameterDescriptions.max[parameter.type + "s"]) {
                  var max = parameterDescriptions.max[parameter.type + "s"][ma];
                  if (max.name == parameter.name) {
                    parameter.max = max.value;
                  }
                }
                
                // Min
                for (var mi in parameterDescriptions.min[parameter.type + "s"]) {
                  var min = parameterDescriptions.min[parameter.type + "s"][mi];
                  if (min.name == parameter.name) {
                    parameter.min = min.value;
                  }
                }
                
                // Default
                for (var df in parameterDescriptions.dflt[parameter.type + "s"]) {
                  var dflt = parameterDescriptions.dflt[parameter.type + "s"][df];
                  if (dflt.name == parameter.name) {
                    parameter.default = dflt.value;
                  }
                }

                // Finally add the value (if there is one)
                for (var e in values[parameter.type + "s"]) {
                  var entry = values[parameter.type + "s"][e];
                  if (entry.name == parameter.name) {
                    parameter.value = entry.value;
                  }
                }
              }
            }
            this.groups = parameterDescriptions.groups;
          }
          else {
            this.groups = {}
          }

          // Directly unsubscribe again, we don't need this anymore
          this.parameterDescriptionsTopic.unsubscribe();
          this.parameterDescriptionsTopic = undefined;
          this.loading = false;
        });
      }
    },
    parameterUpdateFeedback(parameters) {
      if (this.groups.length == 0) {
        this.getParameterDescriptions(parameters);
      }
      else {
        for (var g in this.groups) {
          var group = this.groups[g];
          for (var p in group.parameters) {
            var parameter = group.parameters[p];

            for (var e in parameters[parameter.type + "s"]) {
              var entry = parameters[parameter.type + "s"][e];
              if (parameter.name == entry.name) {
                parameter.value = entry.value;
              }
            }
          }
        }
      }
    },
    change(parameter) {
      var request = new ROSLIB.ServiceRequest({
        config: {
          bools: [],
          ints: [],
          strs: [],
          doubles: [],
          groups: [],
        }
      });

      request.config[parameter.type + "s"].push({
        name: parameter.name,
        value: parameter.value
      })

      this.reconfigureClient.callService(request, (result) => {
        this.parameterUpdateFeedback(result.config);
      });
    }
  },
  beforeDestroy() {
    if (this.parameterUpdatesTopic) {
      this.parameterUpdatesTopic.unsubscribe();
      this.parameterUpdatesTopic = undefined;
    }
  }
};
</script>
<template>
  <div class="ros-dynamic-reconfigure-slider">
    <span v-bind:class="['name', 'pa-0', valid ? '' : 'error--text']">{{value.name}}</span>
    <v-checkbox
      :label="value.name"
      :hint="value.description"
      :persistent-hint="true"
      v-on:change="change"
      v-model="value.value"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  name: 'ros-dynamic-reconfigure-bool',
  props: ['value'],
  methods: {
    change() {
      this.$emit("change", this.value);
    }
  }
};
</script>
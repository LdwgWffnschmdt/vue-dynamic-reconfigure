<template>
  <v-checkbox
    :label="value.name"
    :hint="value.description"
    :persistent-hint="true"
    v-on:change="change"
    v-model="value.value"
    class="ma-0"
  ></v-checkbox>
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
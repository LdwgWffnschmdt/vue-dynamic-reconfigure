<template>
  <v-text-field
    :label="value.name"
    :placeholder="value.default"
    :hint="value.description"
    :persistent-hint="true"
    v-on:change="change"
    v-model="value.value"
  ></v-text-field>
</template>

<script>
export default {
  name: 'ros-dynamic-reconfigure-str',
  props: ['value'],
  methods: {
    change() {
      this.$emit("change", this.value);
    }
  }
};
</script>
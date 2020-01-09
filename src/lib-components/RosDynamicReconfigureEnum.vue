<template>
  <v-select
    :label="value.name"
    :placeholder="value.default.toString()"
    :hint="value.description"
    :persistent-hint="true"
    :items="value.edit_method.enum"
    item-value="value"
    item-text="name"
    v-on:change="change"
    v-model="value.value"
  >
  </v-select>
</template>

<script>
export default {
  name: 'ros-dynamic-reconfigure-enum',
  props: ['value'],
  methods: {
    change() {
      this.$emit("change", this.value);
    }
  }
};
</script>
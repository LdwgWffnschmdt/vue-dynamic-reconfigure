<template>
  <div class="ros-dynamic-reconfigure-slider">
    <span v-bind:class="['name', 'pa-0', valid ? '' : 'error--text']">{{value.name}}</span>
    <v-layout style="position: relative;"
      row
      wrap
    >
      <v-flex xs10 class="pr-3">
        <v-slider
          v-model="value.value"
          step="1"
          :min="value.min"
          :max="value.max"
          :error="!valid"
          :persistent-hint="true"
          v-on:change="change"
        ></v-slider>
      </v-flex>

      <v-flex xs2>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            ref="input"
            type="number"
            class="mt-0"
            step="1"
            :min="value.min"
            :max="value.max"
            :placeholder="value.default.toString()"
            :hint="value.description"
            :persistent-hint="true"
            :rules="rules"
            v-on:change="change"
            v-model.number="value.value"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <span class="description">{{ value.description }}</span>
  </div>
</template>

<script>
export default {
  name: 'ros-dynamic-reconfigure-int',
  props: ['value'],
  data () {
    return {
      valid: false,
      rules: [
        value => value >= this.value.min || 'Minumum is ' + this.value.min,
        value => value <= this.value.max || 'Maximum is ' + this.value.max,
        value => value == "" || (!isNaN(value) && 
                                parseInt(Number(value)) == value && 
                                !isNaN(parseInt(value, 10))) || 'Only integers are allowed',
      ]
    }
  },
  methods: {
    change() {
      if (this.valid) this.$emit("change", this.value);
    }
  }
};
</script>

<style scoped>
.ros-dynamic-reconfigure-slider {
  margin-top: -12px;
  margin-bottom: -20px;
}

.ros-dynamic-reconfigure-slider >>> .v-text-field__details {
  position: absolute;
  left: 0;
  top: 75%;
}

.ros-dynamic-reconfigure-slider >>> .name {
  font-size: 12px;
  font-weight: 400;
  position: relative;
  top: 12px;
}

.ros-dynamic-reconfigure-slider >>> .description {
  font-size: 12px;
  top: -12px;
  opacity: 0;
}

.ros-dynamic-reconfigure-slider >>> .theme--light .name,
.ros-dynamic-reconfigure-slider >>> .theme--light .description {
  color: rgba(0,0,0,0.54);
}
.ros-dynamic-reconfigure-slider >>> .theme--dark .name,
.ros-dynamic-reconfigure-slider >>> .theme--dark .description {
    color: rgba(255,255,255,0.7);
}
</style>
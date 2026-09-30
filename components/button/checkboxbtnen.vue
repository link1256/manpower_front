<template>
  <div class="d-flex align-center dr-bottom">
    <div
      ref="checkbox"
      role="checkbox"
      tabindex="0"
      class="v-checkbox v-input--selection-controls__input"
      :class="{ 'v-input--is-disabled': disabled }"
      aria-live="polite"
      :aria-label="label"
      @keydown.space.prevent="toggle"
      @click="toggle"
    >
      <v-icon v-if="isChecked" aria-hidden="true">mdi-checkbox-marked</v-icon>
      <v-icon v-else aria-hidden="true">mdi-checkbox-blank-outline</v-icon>
    </div>
    <label
      class="dr-color ml-1 v-label"
      :class="{ 'theme--light': disabled }"
      @click="
        $refs.checkbox.focus()
        toggle()
      "
      >{{ label }}</label
    >
    <span class="sr-only" aria-live="assertive">
      {{ isChecked ? label + ' selected' : label + ' not selected' }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    items: {
      default: new Array(0),
      type: Array
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    isChecked: false
  }),
  mounted() {},
  methods: {
    toggle() {
      if (this.disabled) return
      this.isChecked = !this.isChecked
      this.$emit('changedcheck', this.isChecked)

      this.$nextTick(() => {
        const el = this.$refs.checkbox
        el.setAttribute('aria-checked', this.isChecked.toString())
        el.dispatchEvent(new Event('change', { bubbles: true }))
      })
    }
  }
}
</script>

<style>
.dr-color {
  color: #000000;
}
.dr-bottom {
  margin-bottom: 1rem;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.v-icon.mdi-checkbox-marked {
  color: #1976d2 !important;
  caret-color: #1976d2 !important;
}
</style>

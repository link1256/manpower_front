<template>
  <button class="AllCenter btn medianmodalBtn cancelbtn">
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      default: '重新選擇統計項',
      type: String
    }
  }
}
</script>

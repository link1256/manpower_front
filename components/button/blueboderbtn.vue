<template>
  <button class="AllCenter btn minimedianmodalBtn blueboderBtn">
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      default: '更新',
      type: String
    }
  }
}
</script>

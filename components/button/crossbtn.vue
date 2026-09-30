<template>
  <button class="AllCenter btn medianmodalBtn crossBtn">
    <img src="@/assets/images/Cross.svg" alt="" style="margin-right: 10px;" />
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      default: '重設條件',
      type: String
    }
  }
}
</script>

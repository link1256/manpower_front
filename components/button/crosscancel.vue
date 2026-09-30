<template>
  <button class="AllCenter btn minimedianmodalBtn crossBtn">
    <img src="@/assets/images/Cross.svg" alt="" style="margin-right: 10px;" />
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      default: '取消',
      type: String
    }
  }
}
</script>

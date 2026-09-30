<template>
  <button class="AllCenter btn medianmodalBtn editbtn">
    <img
      src="@/assets/images/magnifier.svg"
      alt=""
      style="margin-right: 10px;"
    />
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      default: '確定編輯',
      type: String
    }
  }
}
</script>

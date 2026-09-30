<template>
  <button class="AllCenter btn medianmodalBtn searchbtn">
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
      default: '査詢',
      type: String
    }
  }
}
</script>

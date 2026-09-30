<template>
  <button class="AllCenter btn medianmodalBtn commonbtn">
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      tipObject: {
        content:
          '指在資料標準周內年滿15歲從事有酬工作者，或從事15小時以上之無酬家屬工作者。',
        placement: 'bottom-center',
        classes: ['info'],
        targetClasses: ['it-has-a-tooltip'],
        offset: 100,
        delay: {
          show: 500,
          hide: 300
        }
      }
    }
  }
}
</script>

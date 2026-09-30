<template>
  <Breadcrumbs
    :headertitle="headertitle"
    :greentext="'首頁'"
    :breadcrumbstext="['帳號管理 > ', breadcrumbstext]"
  ></Breadcrumbs>
</template>

<script>
import Breadcrumbs from '@/components/layouts/Breadcrumbs.vue'
export default {
  components: {
    Breadcrumbs
  },
  props: {
    reviewstep: {
      default: 1,
      type: Number
    },
    headertitle: {
      default: '',
      type: String
    },
    breadcrumbstext: {
      default: '',
      type: String
    }
  },
  mounted() {
    const vm = this
    vm.PageStyle.SetLayoutStyle(vm.$store, null, vm.reviewstep)
    const vuexArray = vm.Format.CopyArr(
      vm.$store.state.Utils.Menu.Menu.MenuArray
    )
    for (let i = 0; i < vuexArray.length; i++) {
      if (vuexArray[i].IsParents) {
        vm.$set(vuexArray[i], 'Show', false)
      }
    }
    vm.$set(vuexArray[0], 'Show', true)
    vm.$store.commit('Utils/Menu/SET_MENUSTYLE', vuexArray)
  }
}
</script>

<style></style>

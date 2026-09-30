<template>
  <v-navigation-drawer
    v-model="Show"
    :disable-resize-watcher="true"
    :hide-overlay="true"
    :stateless="false"
    :right="true"
    width="300px"
    class="rightmenu"
    style="position: absolute; top: 0px; margin: 0px; overflow: initial; z-index: 10;"
  >
    <div class="leftdrawer">
      <div
        v-if="ComInq"
        :class="{
          activeBackground: $store.state.Utils.Menu.Menu.MenuArray[0].Show
        }"
      >
        <div
          class="leftmenuparent leftmenuitem lefthover"
          tabindex="0"
          @click="SlideMenu(0)"
          @keyup.enter="SlideMenu(0)"
        >
          <span>Frequently Asked Options</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[0].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in ComInqChild"
            :key="Index"
            :class="{
              leftActive:
                $store.state.Utils.Menu.Menu.MenuArray[item.FunctionCode].Click
            }"
            class="leftmenuitem lefthover"
            @click="InPage(item.FunctionCode)"
          >
            <span>{{ item.FunctionName }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="StatInq"
        :class="{
          activeBackground: $store.state.Utils.Menu.Menu.MenuArray[7].Show
        }"
      >
        <div
          class="leftmenuparent leftmenuitem lefthover"
          tabindex="0"
          @click="SlideMenu(7)"
          @keyup.enter="SlideMenu(7)"
        >
          <span>More Formatting Options</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[7].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in StatInqChild"
            :key="Index"
            :class="{
              leftActive:
                $store.state.Utils.Menu.Menu.MenuArray[item.FunctionCode].Click
            }"
            class="leftmenuitem lefthover"
            @click="InPage(item.FunctionCode)"
          >
            <span>{{ item.FunctionName }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="false"
        :class="{
          activeBackground: $store.state.Utils.Menu.Menu.MenuArray[8].Show
        }"
      >
        <div
          class="leftmenuparent leftmenuitem lefthover"
          tabindex="0"
          @click="SlideMenu(8)"
          @keyup.enter="SlideMenu(8)"
        >
          <span>Local Areas Options(Hsien, City)</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[8].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in StatInqChild"
            :key="Index"
            :class="{
              leftActive:
                $store.state.Utils.Menu.Menu.MenuArray[item.FunctionCode].Click
            }"
            class="leftmenuitem lefthover"
            @click="InPage(item.FunctionCode)"
          >
            <span>{{ item.FunctionName }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="NeedKnowInq"
        :class="{
          activeBackground: $store.state.Utils.Menu.Menu.MenuArray[3].Show
        }"
      >
        <div
          class="leftmenuparent leftmenuitem lefthover"
          tabindex="0"
          @click="SlideMenu(3)"
          @keyup.enter="SlideMenu(3)"
        >
          <span>Definition</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[3].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in LNeedKnowInqChild"
            :key="Index"
            :class="{
              leftActive:
                $store.state.Utils.Menu.Menu.MenuArray[item.FunctionCode].Click
            }"
            class="leftmenuitem lefthover"
            @click="InPage(item.FunctionCode)"
          >
            <span>{{ item.FunctionName }}</span>
          </div>
        </div>
      </div>
      <div
        :class="{
          activeBackground: $store.state.Utils.Menu.Menu.MenuArray[6].Show
        }"
      >
        <div
          class="leftmenuparent leftmenuitem lefthover"
          tabindex="0"
          @click="SlideMenu(5)"
          @keyup.enter="SlideMenu(5)"
        >
          <span>繁體中文</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[5].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in CNTChild"
            :key="Index"
            :class="{
              leftActive:
                $store.state.Utils.Menu.Menu.MenuArray[item.FunctionCode].Click
            }"
            class="leftmenuitem lefthover"
            @click="InPage(item.FunctionCode)"
          >
            <span>{{ item.FunctionName }}</span>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
import Highcharts from 'highcharts'
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    login: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Show: false,
      ComInq: true,
      ComInqChild: [],
      StatInq: true,
      StatInqChild: [],
      AnnRepInq: true,
      AnnRepInqChild: [],
      NeedKnowInq: true,
      NeedKnowInqChild: [],
      IntranetInq: true,
      IntranetInqChild: [
        {
          FunctionName: '臺灣地區',
          FunctionCode: this.$store.state.Utils.SystemCode.LeftFunctionCode
            .AllTaiwanSearch
        },
        {
          FunctionName: '縣市資料',
          FunctionCode: this.$store.state.Utils.SystemCode.LeftFunctionCode
            .CityInquireIntranet
        },
        {
          FunctionName: '縣市重要指標',
          FunctionCode: this.$store.state.Utils.SystemCode.LeftFunctionCode
            .MonthlyReport
        }
      ],
      CNTChild: [],
      ENGChild: []
    }
  },
  watch: {
    show() {
      const vm = this
      vm.Show = vm.show
    },
    login() {}
  },
  methods: {
    InPage(_PageID) {
      const vm = this
      vm.DefaultVuex()
      const SystemCodeObj = vm.$store.state.Utils.SystemCode.LeftFunctionCode
      const vuexArray = vm.CopyArr(vm.$store.state.Utils.Menu.Menu.MenuArray)
      vm.$set(vuexArray[_PageID], 'Click', true)
      vm.CommitVuex(vuexArray)
      switch (_PageID) {
        case SystemCodeObj.Common_Inquire:
          vm.$router.push({
            path: '/Common_Inquire/Index_eng'
          })
          document.title = 'Frequently Asked Options'
          break
        case SystemCodeObj.CityInquire:
          vm.$router.push({
            path: '/Statics_Inquire/CityInquire_eng'
          })
          break
        case SystemCodeObj.MoreInquire:
          vm.$router.push({
            path: '/Statics_Inquire/MoreInquire_eng'
          })
          document.title = 'More Formatting Options'
          break
        case SystemCodeObj.NeedKnow:
          vm.$emit('showdef')
          break
        case SystemCodeObj.CNT_Lang:
          vm.Lang('zh-CN')
          break
      }
    },
    Lang(type) {
      const loc = this.$route.path
      const q = this.$route.query

      Highcharts.setOptions({
        lang: {
          resetZoom: '重新設定範圍'
        }
      })

      const ls = loc.split('_eng')
      this.$router.push({
        path: ls[0],
        query: q
      })
    },
    CopyArr(arr) {
      return arr.map((e) => {
        if (typeof e === 'object') {
          return Object.assign({}, e)
        } else {
          return e
        }
      })
    },
    DefaultVuex() {
      const vm = this
      const vuexArray = vm.CopyArr(vm.$store.state.Utils.Menu.Menu.MenuArray)
      for (let i = 0; i < vuexArray.length; i++) {
        if (vuexArray[i].IsParents) {
          vm.$set(vuexArray[i], 'Show', false)
        }
        vm.$set(vuexArray[i], 'Click', false)
      }
      vm.CommitVuex(vuexArray)
    },
    CommitVuex(_Array) {
      const vm = this
      vm.$store.commit('Utils/Menu/SET_MENUSTYLE', _Array)
    },
    SlideMenu(_Index) {
      const vm = this
      const vuexArray = vm.CopyArr(vm.$store.state.Utils.Menu.Menu.MenuArray)
      const menuObj = vuexArray[_Index]
      if (menuObj.Show) {
        vm.$set(vuexArray[_Index], 'Show', false)
      } else {
        for (let i = 0; i < vuexArray.length; i++) {
          if (vuexArray[i].IsParents) {
            vm.$set(vuexArray[i], 'Show', false)
          }
        }
        vm.$set(vuexArray[_Index], 'Show', true)
      }
      vm.$store.commit('Utils/Menu/SET_MENUSTYLE', vuexArray)

      if (_Index === 0) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.Common_Inquire)
        }, 500)
      } else if (_Index === 2) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.AnnualReport_Inquire)
        }, 500)
      } else if (_Index === 3) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.NeedKnow)
        }, 500)
      } else if (_Index === 5) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.CNT_Lang)
        }, 500)
      } else if (_Index === 6) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.ENG_Lang)
        }, 500)
      } else if (_Index === 7) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.MoreInquire)
        }, 500)
      } else if (_Index === 8) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.CityInquire)
        }, 500)
      }
    }
  }
}
</script>

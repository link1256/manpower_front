<template>
  <v-navigation-drawer
    v-model="Show"
    :disable-resize-watcher="true"
    :hide-overlay="true"
    :stateless="false"
    :right="true"
    :class="Show == true ? 'rightmenu' : 'rightmenu notshow'"
    width="300px"
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
          @click="SlideMenu(13)"
          @keyup.enter="SlideMenu(13)"
        >
          <span>就失業統計互動</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[13].Show"
          tabindex="0"
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
          <span>常用資料查詢</span>
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
          <span>更多資料查詢</span>
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
        v-if="StatInq"
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
          <span>縣市資料查詢</span>
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
          <span>名詞解釋</span>
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
        v-if="false"
        :class="{
          activeBackground: $store.state.Utils.Menu.Menu.MenuArray[4].Show
        }"
      >
        <div
          class="leftmenuparent leftmenuitem lefthover"
          tabindex="0"
          @click="SlideMenu(4)"
          @keyup.enter="SlideMenu(4)"
        >
          <span>內網查詢</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[4].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in IntranetInqChild"
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
          @click="SlideMenu(6)"
          @keyup.enter="SlideMenu(6)"
        >
          <span>English</span>
        </div>
        <div
          v-if="$store.state.Utils.Menu.Menu.MenuArray[6].Show"
          class="leftmenuitemChild"
        >
          <div
            v-for="(item, Index) in ENGChild"
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
        },
        {
          FunctionName: '年報資料查詢',
          FunctionCode: this.$store.state.Utils.SystemCode.LeftFunctionCode
            .AnnualReport_Inquire
        }
      ],
      CNTChild: [],
      ENGChild: [],
      islogin: false
    }
  },
  watch: {
    show() {
      const vm = this
      vm.Show = vm.show
    }
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
            path: '/Common_Inquire/Index'
          })
          break
        case SystemCodeObj.CityInquire:
          vm.$router.push({
            path: '/Statics_Inquire/CityInquire'
          })
          break
        case SystemCodeObj.MoreInquire:
          vm.$router.push({
            path: '/Statics_Inquire/MoreInquire'
          })
          break
        case SystemCodeObj.AllTaiwanSearch:
          vm.$router.push({
            path: '/Intranet_Inquire/AllTaiwanSearch'
          })
          break
        case SystemCodeObj.CityInquireIntranet:
          vm.$router.push({
            path: '/Intranet_Inquire/CityInquire'
          })
          break
        case SystemCodeObj.MonthlyReport:
          vm.$router.push({
            path: '/Intranet_Inquire/MonthlyReport'
          })
          break
        case SystemCodeObj.AnnualReport_Inquire:
          vm.$router.push({
            path: '/YearReport/Index'
          })
          break
        case SystemCodeObj.NeedKnow:
          vm.$emit('showdef')
          break
        case SystemCodeObj.ENG_Lang:
          vm.Lang('en-US')
          break
        case SystemCodeObj.Interaction:
          vm.$router.push({
            path: '/Common_Inquire/Interaction'
          })
          break
      }
    },
    Lang(type) {
      const loc = this.$route.name
      const q = this.$route.query

      let s = ''
      const ls = loc.split('-')
      for (let i = 0; i < ls.length; i++) {
        s += '/'
        s += ls[i]
      }

      Highcharts.setOptions({
        lang: {
          resetZoom: 'ZoomOut'
        }
      })

      if (s.includes('Common_Inquire') || s.includes('Statics_Inquire')) {
        this.$router.push({
          path: s + '_eng',
          query: q
        })
      } else {
        this.$router.push({
          path: '/Common_Inquire/index_eng'
        })
      }
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
      } else if (_Index === 13) {
        setTimeout(function() {
          const SystemCodeObj =
            vm.$store.state.Utils.SystemCode.LeftFunctionCode
          vm.InPage(SystemCodeObj.Interaction)
        }, 500)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.notshow {
  display: none;
}
</style>

<template>
  <header>
    <div ref="header" class="header" :class="{ compact: compactNavigation }">
      <a
        id="gotocenter"
        href="javascript:void(0);"
        title="移到主要內容"
        class="sr-only sr-only-focusable"
        tabindex="0"
        @click="mainclick"
        @keyup.enter="mainclick"
        >跳到主要內容</a
      >
      <span
        class="topfocus"
        accesskey="U"
        tabindex="0"
        title="上方選單連結區，此區塊列有本網站的主要連結"
        role="button"
        aria-label="上方功能區塊"
        >:::</span
      >
      <div class="header3">
        <a
          href="https://www.dgbas.gov.tw/mp.html"
          tabindex="0"
          title="會另開新視窗"
        >
          <img
            class="headerlogo"
            src="@/assets/images/HeaderIcon.svg"
            alt="行政院主計總處"
          />
        </a>
      </div>
      <div class="header4">
        <a href="https://www.dgbas.gov.tw/mp.html" tabindex="0">
          <img
            class="headerlogo"
            src="@/assets/images/rwdicon.svg"
            alt="就業失業統計觀測站"
          />
        </a>
      </div>
      <h1
        class="headertitle"
        tabindex="0"
        @click="homeclick"
        @keyup.enter="homeclick"
      >
        就業失業統計觀測站
      </h1>
      <label ref="englishTitle" class="headertitle_sub" @click="homeclick"
        >Employment and Unemployment Statistics Exploration & Information
        System</label
      >
      <div
        class="topmenushow"
        tabindex="0"
        style="position: absolute; right: 70px; top: 5px; color: #fff;"
        @click="sitemapclick"
        @keyup.enter="sitemapclick"
      >
        <span style="cursor: pointer;">網站導覽</span>
      </div>
      <div
        class="topmenushow"
        tabindex="0"
        style="position: absolute; right: 10px; top: 5px; color: #fff;"
        role="button"
        aria-label="English"
        @click="Lang('en-US')"
        @keyup.enter="Lang('en-US')"
      >
        <span style="cursor: pointer;">English</span>
      </div>
      <nav
        ref="desktopMenu"
        class="desktop-navigation"
        aria-label="主要選單"
        :inert="compactNavigation ? '' : null"
      >
        <div
          v-for="(item, index) in functionMenu"
          :key="item.FunctionId"
          class="primary-menu-item"
        >
          <nuxt-link
            v-if="item.FunctionId === 9"
            to="/DynamicCharts"
            exact-path
            class="FunctionItem dynamic-chart-tab"
            ><span>{{ item.FunctionName }}</span></nuxt-link
          >
          <v-menu v-else offset-y>
            <template v-slot:activator="{ on }">
              <div
                :style="
                  !isDynamicCharts &&
                  item.FunctionId === $store.state.Utils.Menu.Menu.TopFunctionId
                    ? 'border-bottom: 6px solid #85B2B5'
                    : ''
                "
                :role="item.FunctionId === 7 ? 'button' : ''"
                :aria-label="
                  item.FunctionId === 7
                    ? item.FunctionName + '會開啟新視窗'
                    : ''
                "
                class="FunctionItem"
                tabindex="0"
                @click="TopFunctionClick(item.FunctionId)"
                @keyup.enter="TopFunctionClick(item.FunctionId)"
                v-on="on"
              >
                <span>{{ item.FunctionName }}</span>
              </div>
            </template>
            <v-list v-if="item.SubList.length > 0">
              <v-list-item
                v-for="(subitem, j) in item.SubList"
                :key="j"
                tabindex="0"
                @click="itemclick(index, j)"
                @keyup.enter="itemclick(index, j)"
              >
                <v-list-item-title>{{ subitem.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </nav>
      <button
        ref="menuToggle"
        class="topmenubtn compact-toggle"
        type="button"
        aria-label="選單按鈕"
        :aria-expanded="String(menuOpen)"
        @click="poback"
      >
        ☰
      </button>
    </div>
  </header>
</template>
<script>
import Highcharts from 'highcharts'
import qs from 'qs'
import axios from '../../plugins/axios'
import { _SAlert } from '../../utils/sweetAlert2'

const intranetMenu = {
  FunctionId: 5,
  FunctionName: '內網查詢',
  SubList: [
    { title: '臺灣地區', subvalue: 3 },
    { title: '縣市資料', subvalue: 4 },
    { title: '縣市重要指標', subvalue: 5 },
    { title: '年報資料查詢', subvalue: 6 }
  ]
}
export default {
  props: {
    menuOpen: { type: Boolean, default: false }
  },
  data() {
    return {
      TopFunctionMenu: [
        {
          FunctionId: 9,
          FunctionName: '動態統計圖',
          SubList: []
        },
        {
          FunctionId: 8,
          FunctionName: '就失業統計互動',
          SubList: []
        },
        {
          FunctionId: 1,
          FunctionName: '常用資料查詢',
          SubList: []
        },
        {
          FunctionId: 2,
          FunctionName: '更多資料查詢',
          SubList: []
        },
        {
          FunctionId: 6,
          FunctionName: '縣市資料查詢',
          SubList: []
        },
        {
          FunctionId: 4,
          FunctionName: '名詞定義',
          SubList: []
        },
        {
          FunctionId: 7,
          FunctionName: '答客問',
          SubList: []
        }
      ],
      compactNavigation: false,
      intranetEnabled: false
    }
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    isDynamicCharts() {
      return this.$route.name === 'DynamicCharts'
    },
    functionMenu() {
      if (this.isHome) {
        return this.TopFunctionMenu.filter(
          (item) => item.FunctionId === 4 || item.FunctionId === 7
        )
      }
      return this.intranetEnabled
        ? [...this.TopFunctionMenu, intranetMenu]
        : this.TopFunctionMenu
    }
  },
  watch: {
    isHome(atHome) {
      if (!atHome) this.loadIntranetMenu()
    },
    '$route.fullPath'() {
      this.$emit('showleftmenu', false)
      this.$nextTick(() => {
        this.checkNavigationFit()
        if (this.isDynamicCharts) this.$nextTick(this.focusDynamicCharts)
      })
    }
  },
  mounted() {
    const vm = this
    setTimeout(function() {
      document.documentElement.lang = 'zh-TW'
    }, 100)
    vm.checkbrowser()
    this.navigationObserver = new ResizeObserver(this.checkNavigationFit)
    this.navigationObserver.observe(this.$refs.header)
    this.navigationObserver.observe(this.$refs.desktopMenu)
    this.navigationObserver.observe(this.$refs.englishTitle)
    this.checkNavigationFit()
    if (this.isDynamicCharts) this.$nextTick(this.focusDynamicCharts)
    if (!this.isHome) this.loadIntranetMenu()
  },
  beforeDestroy() {
    if (this.navigationObserver) this.navigationObserver.disconnect()
  },
  methods: {
    async loadIntranetMenu() {
      const response = await axios
        .post(this.RequetURL.backurl, qs.stringify({ op: 'FrontIsLogin' }))
        .catch(() => null)
      if (!response || response.status !== 200) return

      const isLogin = response.data === 'Login'
      this.RequetURL.isLogin = isLogin
      this.intranetEnabled = isLogin
    },
    checkNavigationFit() {
      const { header, desktopMenu, englishTitle } = this.$refs
      const headerRight = header.getBoundingClientRect().right
      const englishRight = englishTitle.getBoundingClientRect().right
      const wasCompact = this.compactNavigation
      this.compactNavigation =
        header.clientWidth < 1110 ||
        headerRight - desktopMenu.offsetWidth < englishRight + 16
      const active = document.activeElement
      if (
        this.isDynamicCharts &&
        wasCompact !== this.compactNavigation &&
        (active === this.$refs.menuToggle || desktopMenu.contains(active))
      ) {
        this.$nextTick(this.focusDynamicCharts)
      }
      if (wasCompact && !this.compactNavigation && this.menuOpen) {
        this.$emit('showleftmenu', false)
      }
    },
    focusDynamicCharts() {
      const target = this.compactNavigation
        ? this.$refs.menuToggle
        : this.$refs.desktopMenu.querySelector('.dynamic-chart-tab')
      if (target) target.focus({ preventScroll: true })
    },
    homeclick() {
      this.$router.push({
        path: '/'
      })
    },
    sitemapclick() {
      this.$router.push({
        path: '/sitemap'
      })
    },
    poback() {
      this.$emit('showleftmenu', !this.menuOpen)
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

      if (
        s.includes('Common_Inquire/Index') ||
        s.includes('MoreInquire') ||
        s.includes('Statics_Inquire/ResultInquire') ||
        s.includes('Statics_Inquire/SeasonResult')
      ) {
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
    mainclick() {
      document.getElementById('centercontent').focus()
    },
    TopFunctionClick(TopFunctionId) {
      const vm = this
      switch (TopFunctionId) {
        case 1:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 1)
          vm.$router.push({
            path: '/Common_Inquire/Index'
          })
          break
        case 2:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 2)
          vm.$router.push({
            path: '/Statics_Inquire/MoreInquire'
          })
          break
        case 3:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 3)
          vm.$router.push({
            path: '/YearReport/Index'
          })
          break
        case 6:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 6)
          vm.$router.push({
            path: '/Statics_Inquire/CityInquire'
          })
          setTimeout(() => {
            document.title = '縣市資料查詢'
          }, 100)
          break
        case 4:
          vm.$emit('showdef')
          break
        case 7:
          window.location = 'https://www.stat.gov.tw/News.aspx?n=2710&sms=11024'
          break
        case 8:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 8)
          vm.$router.push({
            path: '/Common_Inquire/Interaction'
          })
          setTimeout(() => {
            document.title = '就失業統計互動'
          }, 100)
          break
      }
    },
    checkbrowser() {
      const userAgent = navigator.userAgent
      const isIE =
        userAgent.includes('compatible') && userAgent.includes('MSIE')
      const isEdge = userAgent.includes('Edge') && !isIE
      const isIE11 =
        userAgent.includes('Trident') && userAgent.includes('rv:11.0')
      if (isIE) {
        _SAlert.Error(
          '您好，您目前使用的是舊版的IE網路瀏覽器，建議更新至IE 11，或使用其他瀏覽器，以獲得更佳的網路瀏覽體驗。'
        )
      } else if (isEdge) {
      } else if (isIE11) {
      }
    },
    itemclick(mainidx, subidx) {
      const vm = this
      const SubClick = vm.functionMenu[mainidx].SubList[subidx].subvalue
      switch (SubClick) {
        case 3:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 5)
          vm.$router.push({
            path: '/Intranet_Inquire/AllTaiwanSearch'
          })
          break
        case 4:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 5)
          vm.$router.push({
            path: '/Intranet_Inquire/CityInquire'
          })
          break
        case 5:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 5)
          vm.$router.push({
            path: '/Intranet_Inquire/MonthlyReport'
          })
          break
        case 6:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 3)
          vm.$router.push({
            path: '/YearReport/Index'
          })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.headertitle,
.headertitle_sub {
  cursor: pointer;
}
.header {
  position: relative;
  z-index: 11;
}
.desktop-navigation {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  width: max-content;
  height: 55px;
}
.desktop-navigation .primary-menu-item {
  display: flex;
  flex: none;
  height: 100%;
}
.desktop-navigation .FunctionItem {
  flex: none;
}
.dynamic-chart-tab {
  text-decoration: none;
}
.dynamic-chart-tab[aria-current='page'] {
  border-bottom: 6px solid #85b2b5;
}
.header .compact-toggle {
  display: none !important;
}
.header.compact .desktop-navigation {
  visibility: hidden;
  pointer-events: none;
}
.header.compact .compact-toggle {
  display: block !important;
  position: absolute;
  right: 0;
  top: 50%;
  margin: 0 12px 0 0;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  color: #fff;
  font-size: 28px;
}
@media (min-width: 1110px) {
  .header.compact .compact-toggle {
    top: auto;
    bottom: 3px;
    transform: none;
  }
}
.topnon {
  display: none;
}
</style>

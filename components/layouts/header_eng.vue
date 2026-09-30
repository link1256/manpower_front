<template>
  <header>
    <div class="header_eng">
      <a
        id="gotocenter"
        href="javascript:void(0);"
        title="Skip to center"
        class="sr-only sr-only-focusable"
        tabindex="0"
        @click="mainclick"
        @keyup.enter="mainclick"
        >Skip to center</a
      >
      <span
        class="topfocus"
        accesskey="U"
        tabindex="0"
        title="Top functional area"
        role="button"
        aria-label="Top functional area"
        >:::</span
      >
      <div class="header3">
        <a href="https://www.dgbas.gov.tw/mp.html" tabindex="0">
          <img
            class="headerlogo"
            src="@/assets/images/HeaderIcon.svg"
            alt="Directorate-General of Budget, Accounting and Statistics"
          />
        </a>
      </div>
      <div class="header4">
        <a href="https://www.dgbas.gov.tw/mp.html" tabindex="0">
          <img
            class="headerlogo"
            src="@/assets/images/rwdicon.svg"
            alt="Directorate-General of Budget, Accounting and Statistics"
          />
        </a>
      </div>
      <h1
        class="headertitle"
        tabindex="0"
        @click="homeclick"
        @keyup.enter="homeclick"
      >
        Employment and Unemployment Statistics Exploration & Information System
      </h1>
      <div
        class="topmenushow"
        tabindex="0"
        style="position: absolute; right: 70px; top: 5px; color: #fff;"
        @click="sitemapclick"
        @keyup.enter="sitemapclick"
      >
        <span style="cursor: pointer;">SiteMap</span>
      </div>
      <div
        tabindex="0"
        class="topmenushow"
        style="position: absolute; right: 10px; top: 5px; color: #fff;"
        role="button"
        aria-label="繁體中文"
        @click="Lang('zh-CN')"
        @keyup.enter="Lang('zh-CN')"
      >
        <span style="cursor: pointer;">繁體中文</span>
      </div>
      <div
        v-if="showtop"
        class="topmenushow"
        style="margin-left: auto; height: 55px; display: flex;"
      >
        <v-menu v-for="(item, index) in TopFunctionMenu" :key="index" offset-y>
          <template v-slot:activator="{ on }">
            <div
              :style="
                item.FunctionId === $store.state.Utils.Menu.Menu.TopFunctionId
                  ? 'border-bottom: 6px solid #85B2B5'
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
      <span
        class="topmenubtn"
        tabindex="0"
        role="button"
        aria-label="menu button"
        :aria-expanded="leftmenu"
        @click.stop="poback"
        @keyup.enter="poback"
      >
        ☰
      </span>
      <!--<v-app-bar-nav-icon
        class="topmenubtn"
        @click.stop="poback"
      ></v-app-bar-nav-icon>-->
    </div>
  </header>
</template>
<script>
import Highcharts from 'highcharts'
import { _SAlert } from '../../utils/sweetAlert2'
export default {
  data() {
    return {
      TopFunctionMenu: [
        {
          FunctionId: 1,
          FunctionName: 'Frequently Asked Options',
          SubList: []
        },
        {
          FunctionId: 2,
          FunctionName: 'More Formatting Options',
          SubList: []
        },
        {
          FunctionId: 4,
          FunctionName: 'Definition',
          SubList: []
        }
      ],
      showtop: true,
      leftmenu: false
    }
  },
  mounted() {
    setTimeout(function() {
      document.documentElement.lang = 'en'
    }, 100)
    document.title =
      'Employment and Unemployment Statistics Exploration & Information System'
    this.checkbrowser()
    window.addEventListener('keyup', this.handleEscape)
    Highcharts.setOptions({
      lang: {
        resetZoom: 'ZoomOut'
      }
    })
  },
  methods: {
    handleEscape(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.leftmenu = false
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('Close menu'))
      }
    },
    homeclick() {
      this.$router.push({
        path: '/Common_Inquire/index_eng'
      })
    },
    sitemapclick() {
      this.$router.push({
        path: '/sitemap_eng'
      })
    },
    poback() {
      this.leftmenu = !this.leftmenu
      this.$emit('showleftmenu', this.leftmenu)
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
    mainclick() {
      document.getElementById('centercontent').focus()
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
          "Your IE browser isn't the latest version. Please update, or switch to another browser for better experience."
        )
      } else if (isEdge) {
      } else if (isIE11) {
      }
    },
    TopFunctionClick(TopFunctionId) {
      const vm = this
      switch (TopFunctionId) {
        case 1:
          vm.$router.push({
            path: '/Common_Inquire/Index_eng'
          })
          setTimeout(() => {
            document.title = 'Frequently Asked Options'
          }, 100)
          break
        case 2:
          vm.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 2)
          vm.$router.push({
            path: '/Statics_Inquire/MoreInquire_eng'
          })
          setTimeout(() => {
            document.title = 'More Formatting Options'
          }, 100)
          break
        case 4:
          vm.$emit('showdef')
          break
      }
    },
    itemclick(mainidx, subidx) {
      const vm = this
      const SubClick = vm.TopFunctionMenu[mainidx].SubList[subidx].subvalue
      switch (SubClick) {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.headertitle {
  cursor: pointer;
}
</style>

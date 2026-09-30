<template>
  <header>
    <div class="header">
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
      <label class="headertitle_sub" @click="homeclick"
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
              :role="item.FunctionId === 7 ? 'button' : ''"
              :aria-label="
                item.FunctionId === 7 ? item.FunctionName + '會開啟新視窗' : ''
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
        aria-label="選單按鈕"
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
import qs from 'qs'
import axios from '../../plugins/axios'
import { _SAlert } from '../../utils/sweetAlert2'
export default {
  data() {
    return {
      TopFunctionMenu: [
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
      showtop: true,
      leftmenu: false
    }
  },
  mounted() {
    const vm = this
    setTimeout(function() {
      document.documentElement.lang = 'zh-TW'
    }, 100)
    vm.checkbrowser()
    window.addEventListener('keyup', this.handleEscape)
    const loc = this.$route.path
    if (loc === '/') {
      vm.TopFunctionMenu = [
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
      ]
    } else {
      axios
        .post(vm.RequetURL.backurl, qs.stringify({ op: 'FrontIsLogin' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            if (data === 'Login') {
              vm.RequetURL.isLogin = true
              vm.TopFunctionMenu = [
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
                },
                {
                  FunctionId: 5,
                  FunctionName: '內網查詢',
                  SubList: [
                    {
                      title: '臺灣地區',
                      subvalue: 3
                    },
                    {
                      title: '縣市資料',
                      subvalue: 4
                    },
                    {
                      title: '縣市重要指標',
                      subvalue: 5
                    },
                    {
                      title: '年報資料查詢',
                      subvalue: 6
                    }
                  ]
                }
              ]
            }
          }
        })
    }
  },
  methods: {
    handleEscape(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.leftmenu = false
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('關閉選單'))
      }
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
      this.leftmenu = !this.leftmenu
      this.$emit('showleftmenu', this.leftmenu)
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
      const SubClick = vm.TopFunctionMenu[mainidx].SubList[subidx].subvalue
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
.topnon {
  display: none;
}
</style>

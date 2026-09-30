<template>
  <div class="htmlshow">
    <div v-if="fadeshow" class="tableitemfade">
      <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
    </div>
    <v-col v-if="false" style="padding-left: 0px;">
      <span
        style="font-size: 0.875em; color: #767676; font-weight: bold; cursor: pointer"
        @click="BackTop"
      >
        年報資料查詢 /
      </span>
      <span
        style="font-size: 0.875em; color: #767676; font-weight: bold; cursor: pointer"
        @click="BackToUp"
        >表{{ TID }} {{ TNAME }} /</span
      >
      <span style="font-size: 0.875em; color: #292B3B; font-weight: bold;"
        >表{{ TID }} {{ TNAME }} - 查詢結果</span
      >
    </v-col>
    <div id="htmltarget" v-html="rawHtml"></div>
    <v-col class="AllCenter">
      <v-col class="AllCenter">
        <bluecommonbtn
          :name="'回上一頁'"
          @click.native="BackToUp"
        ></bluecommonbtn>
      </v-col>
    </v-col>
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
// eslint-disable-next-line no-unused-vars
import floatThead from 'floatthead'
import axios from '../../plugins/axios'
import { _SAlert } from '../../utils/sweetAlert2'
import bluecommonbtn from '@/components/button/bluecommonbtn'
export default {
  components: {
    bluecommonbtn
  },
  layout: 'BackStage_YearResult',
  data() {
    return {
      TID: '',
      TNAME: '',
      htmltitle: '',
      fadeshow: true,
      rawHtml: ''
    }
  },
  mounted() {
    const vm = this
    this.checkLogin()
    const postdata = {}
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 3)
    postdata.op = 'SearchGetHtml'
    postdata.TID = this.$route.query.TID
    postdata.SNO = this.$route.query.SNO
    postdata.TIMELINE = this.$route.query.TIMELINE
    postdata.NEXT = this.$route.query.NEXT
    postdata.S_YEAR = this.$route.query.S_YEAR
    postdata.E_YEAR = this.$route.query.E_YEAR
    postdata.STAT = this.$route.query.STAT
    postdata.EDITION = this.$route.query.EDITION
    postdata.T_NAME = this.$route.query.T_NAME

    this.TID = this.$route.query.TID
    this.TNAME = this.$route.query.T_NAME

    this.htmltitle =
      '表' + this.$route.query.TID + ' ' + this.$route.query.T_NAME

    axios.post(vm.RequetURL.backurl, qs.stringify(postdata)).then(function(r) {
      if (typeof r === 'object' && r.status === 200) {
        const data = r.data
        vm.rawHtml = data
        vm.headerfloat()
        vm.fadeshow = false
      }
    })
  },
  methods: {
    checkLogin() {
      const vm = this
      axios
        .post(vm.RequetURL.backurl, qs.stringify({ op: 'FrontIsLogin' }))
        .then(function(r) {
          if (typeof r === 'object' && r.status === 200) {
            const data = r.data
            if (data !== 'Login') {
              _SAlert.Error('請先登入後臺才能使用內網功能.')
              setTimeout(function() {
                _SAlert.Close()
                vm.$router.push({
                  path: '/Common_Inquire/index'
                })
              }, 1000)
            }
          }
        })
    },
    headerfloat() {
      const $table = $('.pvtTable')
      $table.floatThead({
        scrollContainer($table) {
          return $table.closest('.wrapper')
        },
        zIndex: 2
      })

      const colt = $('.floatThead-table')
      const tart = $('.tablezone .pvtTable')

      for (let j = 0; j < tart.length; j++) {
        if (colt[j]) {
          $(colt[j]).css('table-layout', 'auto')
        }
      }
    },
    BackTop() {
      this.$router.push({
        path: '/YearReport/Index'
      })
    },
    BackToUp() {
      this.$router.push({
        path: '/YearReport/Search',
        query: { TID: this.$route.query.TID }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.htmlshow {
  width: 95%;
  height: 100%;
  margin-left: 2.5%;
  position: relative;
}
#htmltarget {
  width: 100%;
}
.htmlTitle {
  font-size: 1.5625em;
  font-weight: bolder;
  color: #485b68 !important;
  margin: 5px 0px;
}
.tableitemfade {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.fadespin {
  position: absolute;
  left: calc(50% - 60px);
  top: calc(50% - 60px);
  width: 120px;
  height: 120px;
}
</style>

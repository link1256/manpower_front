<template>
  <div class="PageDefault">
    <v-container>
      <v-row v-if="false">
        <v-col style="padding-top: 0px; padding-bottom: 0px;">
          <span
            style="font-size: 0.875em; color: #767676; font-weight: bold; cursor: pointer"
            @click="BackTop"
          >
            年報資料查詢 /
          </span>
          <span style="font-size: 0.875em; color: #292B3B; font-weight: bold;"
            >表{{ TID }} {{ TNAME }}</span
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span style="font-size: 1.125em; color: #292B3B; font-weight: bold;"
            >表{{ TID }} {{ TNAME }}</span
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="whitezone">
            <v-row v-if="versionShow === true">
              <v-col class="whitezonecol AllCenter"
                ><label for="dataselect1">修訂版次</label></v-col
              >
              <v-col>
                <v-select
                  id="dataselect1"
                  v-model="version"
                  :items="versionitems"
                  style="max-width: 500px;"
                  title="修訂版次"
                  background-color="white"
                  solo
                  hide-details
                  @change="versionChange"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="whitezonecol AllCenter"
                ><label for="dataselect2">年分</label></v-col
              >
              <v-col class="AllLeft">
                <v-select
                  id="dataselect2"
                  v-model="startdate"
                  :items="dateitems"
                  style="max-width: 150px;"
                  title="年分_起"
                  background-color="white"
                  solo
                  hide-details
                ></v-select>
                <label for="dataselect3" style="margin: 0px 10px;">至</label>
                <v-select
                  id="dataselect3"
                  v-model="enddate"
                  :items="dateitems"
                  style="max-width: 150px;"
                  title="年分_迄"
                  background-color="white"
                  solo
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="whitezonecol AllCenter">統計期</v-col>
              <v-col>
                <v-radio-group v-model="datetype" row>
                  <v-radio
                    v-if="onlystat === false && yshow === true"
                    :value="1"
                    label="年平均"
                  ></v-radio>
                  <v-radio
                    v-if="onlystat === false && mshow === true"
                    :value="2"
                    label="月"
                  ></v-radio>
                  <v-radio
                    v-if="onlystat === false && yamshow === true"
                    :value="3"
                    label="年平均與月"
                  ></v-radio>
                  <v-radio
                    v-if="onlystat === true"
                    :value="0"
                    label="年分"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="whitezonecol AllCenter">輸出</v-col>
              <v-col>
                <v-radio-group v-model="outtype" row>
                  <v-radio :value="1" label="網頁"></v-radio>
                  <v-radio :value="2" label="EXCEL"></v-radio>
                  <v-radio :value="3" label="ODS"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div id="summernote" v-html="COMMENT"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="AllCenter">
          <bluecommonbtn
            :name="'回上一頁'"
            style="margin-right: 10px;"
            @click.native="BackTop"
          ></bluecommonbtn>
          <bluecommonbtn
            :name="'開始執行'"
            @click.native="GoSearch"
          ></bluecommonbtn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import qs from 'qs'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import bluecommonbtn from '@/components/button/bluecommonbtn'
export default {
  components: {
    bluecommonbtn
  },
  layout: 'BackStage_YearReport',
  data() {
    return {
      data: {},
      TID: '',
      TNAME: '',
      SUBNAME: '',
      TIMELINE: 1,
      version: '',
      versionitems: [],
      dateitems: [],
      startdate: '',
      enddate: '',
      COMMENT: '',
      datetype: 1,
      outtype: 1,
      versionShow: false,
      onlystat: false,
      gosearch: false,
      yshow: false,
      mshow: false,
      yamshow: false,
      maxtimeline: null,
      maxnontimeline: null
    }
  },
  mounted() {
    const vm = this
    this.checkLogin()
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 3)
    const id = this.$route.query.TID
    if (!id) {
      vm.$router.push({
        path: '/YearReport/Index'
      })
    }
    vm.TID = id
    this.getdata(id)
  },
  methods: {
    checkLogin() {
      const vm = this
      axios
        .post(vm.RequetURL.backurl, qs.stringify({ op: 'FrontIsLogin' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
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
    getdata(tid) {
      const vm = this
      axios
        .post(
          vm.RequetURL.backurl,
          qs.stringify({
            op: 'getLayoutDataMaxYear'
          })
        )
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            if (data) {
              vm.maxtimeline = data.TimelineMaxYear
              vm.maxnontimeline = data.NoneTimelineMaxYear
              vm.getthedata(tid)
            }
          }
        })
    },
    getthedata(tid) {
      const vm = this
      axios
        .post(
          vm.RequetURL.backurl,
          qs.stringify({ op: 'getLayoutDataFromID', TID: vm.TID })
        )
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.data = data.data
            if (data.data.length > 0) {
              vm.TNAME = data.data[0].T_NAME
              vm.COMMENT = data.data[0].COMMENT
              vm.TIMELINE = data.data[0].TIMELINE

              vm.setDateRange(data.data[0].S_YEAR, data.data[0].E_YEAR)

              if (data.data[0].STAT_PERIOD === '0') {
                vm.onlystat = true
                vm.datetype = 0
              } else {
                vm.onlystat = false
                const ps = data.data[0].STAT_PERIOD.split(',')
                let t = 9999
                for (let i = 0; i < ps.length; i++) {
                  if (ps[i] === '1') {
                    vm.yshow = true
                    if (parseInt(ps[i]) < t) t = parseInt(ps[i])
                  } else if (ps[i] === '2') {
                    vm.mshow = true
                    if (parseInt(ps[i]) < t) t = parseInt(ps[i])
                  } else if (ps[i] === '3') {
                    vm.yamshow = true
                    if (parseInt(ps[i]) < t) t = parseInt(ps[i])
                  }
                }
                vm.datetype = t
              }
              if (data.data.length > 1) vm.versionShow = true
              for (let i = 0; i < data.data.length; i++) {
                const opt = {}
                opt.value = data.data[i].SNO
                opt.text = data.data[i].T_NAME + data.data[i].SUB_NAME
                opt.syear = data.data[i].S_YEAR
                opt.eyear = data.data[i].E_YEAR
                opt.edition = data.data[i].EDITION
                opt.comment = data.data[i].COMMENT
                opt.TIMELINE = data.data[i].TIMELINE
                vm.versionitems.push(opt)
              }
              vm.version = vm.versionitems[0].value
              vm.versionChange()
            }
          }
        })
    },
    datetypeChange(idx) {
      const data = this.data

      this.onlystat = true
      this.yshow = false
      this.mshow = false
      this.yamshow = false

      if (data[idx].STAT_PERIOD === '0') {
        this.onlystat = true
        this.datetype = 0
      } else {
        this.onlystat = false
        let t = 9999
        const ps = data[idx].STAT_PERIOD.split(',')
        for (let i = 0; i < ps.length; i++) {
          if (ps[i] === '1') {
            this.yshow = true
            if (parseInt(ps[i]) < t) t = parseInt(ps[i])
          } else if (ps[i] === '2') {
            this.mshow = true
            if (parseInt(ps[i]) < t) t = parseInt(ps[i])
          } else if (ps[i] === '3') {
            this.yamshow = true
            if (parseInt(ps[i]) < t) t = parseInt(ps[i])
          }
        }
        this.datetype = t
      }
    },
    setDateRange(s, e) {
      const istimeline = this.TIMELINE
      this.dateitems = []
      if (e === -1) {
        // eslint-disable-next-line no-console
        console.log(istimeline)
        // eslint-disable-next-line no-console
        console.log(this.maxtimeline)
        // eslint-disable-next-line no-console
        console.log(this.maxnontimeline)
        if (istimeline === 1 && this.maxtimeline) {
          e = parseInt(this.maxtimeline) - 1911
        } else if (istimeline === 0 && this.maxnontimeline) {
          e = parseInt(this.maxnontimeline) - 1911
        } else {
          const today = new Date()
          const yyyy = today.getFullYear()
          e = yyyy - 1911
        }
      }
      for (let i = s; i <= e; i++) {
        const opt = {}
        opt.value = i
        opt.text = i + '年'
        this.dateitems.push(opt)
      }
      this.startdate = this.dateitems[0].value
      this.enddate = this.dateitems[this.dateitems.length - 1].value
    },
    versionChange() {
      const s = this.version
      const d = this.versionitems

      for (let i = 0; i < d.length; i++) {
        if (s === d[i].value) {
          this.TIMELINE = d[i].TIMELINE
          this.setDateRange(d[i].syear, d[i].eyear)
          this.datetypeChange(i)
          this.COMMENT = d[i].comment

          break
        }
      }
    },
    BackTop() {
      this.$router.push({
        path: '/YearReport/Index'
      })
    },
    GetTitleName() {
      const tar = this.version
      const data = this.versionitems

      let subname = ''

      for (let i = 0; i < data.length; i++) {
        if (data[i].value === tar) {
          subname = data[i].text
          break
        }
      }

      return subname
    },
    GoSearch() {
      const vm = this
      const postdata = {}

      let edition = -1
      if (vm.versionitems.length !== 0) {
        const d = vm.versionitems
        for (let i = 0; i < d.length; i++) {
          if (vm.version === d[i].value) {
            edition = d[i].edition
            break
          }
        }
      } else if (vm.data.length !== 0) edition = vm.data[0].EDITION

      if (edition === -1) return

      if (vm.outtype === 1) {
        const TID = vm.TID

        let SNO = ''
        if (vm.versionShow) {
          SNO = vm.version
        } else {
          SNO = vm.data[0].SNO
        }
        const TIMELINE = vm.data[0].TIMELINE
        const NEXT = vm.data[0].NEXT
        const S_YEAR = vm.startdate
        const E_YEAR = vm.enddate
        const STAT = vm.datetype
        const EDITION = edition

        let T_NAME = ''
        if (vm.data.length === 1) T_NAME = vm.TNAME
        else {
          const s = vm.version
          const d = vm.versionitems

          for (let i = 0; i < d.length; i++) {
            if (s === d[i].value) {
              T_NAME = d[i].text
              break
            }
          }
        }
        vm.$router.push({
          path: '/YearReport/HtmlResult',
          query: {
            TID,
            SNO,
            TIMELINE,
            NEXT,
            S_YEAR,
            E_YEAR,
            STAT,
            EDITION,
            T_NAME
          }
        })
      } else if (vm.outtype === 2) {
        postdata.op = 'SearchGetExcel'
        postdata.TID = vm.TID

        let downloadname = ''
        if (vm.versionShow) {
          postdata.SNO = vm.version
          const tar = vm.versionitems.filter((f) => f.value === vm.version)
          downloadname = tar[0].text
        } else {
          postdata.SNO = vm.data[0].SNO
        }
        postdata.TIMELINE = vm.data[0].TIMELINE
        postdata.NEXT = vm.data[0].NEXT
        postdata.S_YEAR = vm.startdate
        postdata.E_YEAR = vm.enddate
        postdata.STAT = vm.datetype
        postdata.T_NAME = '表' + vm.TID + ' ' + vm.GetTitleName()
        postdata.EDITION = edition
        postdata.FILETYPE = 'EXCEL'

        axios
          .post(vm.RequetURL.backurl, qs.stringify(postdata), {
            responseType: 'arraybuffer'
          })
          .then(function(Response) {
            if (typeof Response === 'object' && Response.status === 200) {
              const byte = Response.data
              const downLink = document.createElement('a')
              if (!('download' in downLink)) return false
              if (downloadname !== '')
                downLink.download = downloadname + '.xlsx'
              else downLink.download = vm.TNAME + '.xlsx'
              downLink.style.display = 'none'
              const blobURL = new Blob([byte], {
                type: 'application/vnd.ms-excel;'
              })
              downLink.href = URL.createObjectURL(blobURL)
              downLink.click()
            }
          })
      } else if (vm.outtype === 3) {
        postdata.op = 'SearchGetExcel'
        postdata.TID = vm.TID

        let downloadname = ''
        if (vm.versionShow) {
          postdata.SNO = vm.version
          const tar = vm.versionitems.filter((f) => f.value === vm.version)
          downloadname = tar[0].text
        } else {
          postdata.SNO = vm.data[0].SNO
        }
        postdata.TIMELINE = vm.data[0].TIMELINE
        postdata.NEXT = vm.data[0].NEXT
        postdata.S_YEAR = vm.startdate
        postdata.E_YEAR = vm.enddate
        postdata.STAT = vm.datetype
        postdata.T_NAME = '表' + vm.TID + ' ' + vm.GetTitleName()
        postdata.EDITION = edition
        postdata.FILETYPE = 'ODS'

        axios
          .post(vm.RequetURL.backurl, qs.stringify(postdata), {
            responseType: 'arraybuffer'
          })
          .then(function(Response) {
            if (typeof Response === 'object' && Response.status === 200) {
              const byte = Response.data
              const downLink = document.createElement('a')
              if (!('download' in downLink)) return false
              if (downloadname !== '') downLink.download = downloadname + '.ods'
              else downLink.download = vm.TNAME + '.ods'
              downLink.style.display = 'none'
              const blobURL = new Blob([byte], {
                type: 'application/vnd.oasis.opendocument.spreadsheet'
              })
              downLink.href = URL.createObjectURL(blobURL)
              downLink.click()
            }
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.whitezone {
  width: 100%;
  background: #ffffff;
  border: 1px solid #b4b4b4;
}
.whitezonecol {
  font-size: 1.75em;
  color: #292b3b;
  font-weight: bold;
  max-width: 30%;
}
</style>

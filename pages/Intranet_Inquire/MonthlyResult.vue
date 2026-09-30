<template>
  <div style="width: 100%;">
    <v-container class="containerForTable">
      <div class="AllTopRight" style="margin-top: 20px;">
        <button class="showbtn" @click="research">
          <img
            src="@/assets/images/Btn_Image/search.svg"
            style="margin-bottom: 4px;"
            alt=""
          />
          重新查詢
        </button>
        <button class="showbtn" @click="tabletransport">
          <img
            src="@/assets/images/Btn_Image/transport.svg"
            style="margin-bottom: 4px;"
            alt=""
          />
          表格轉置
        </button>
        <button class="showbtn" @click="tableeditset">
          <img
            src="@/assets/images/Btn_Image/edit.svg"
            style="margin-bottom: 4px;"
            alt=""
          />
          表格編輯
        </button>
      </div>
      <v-row>
        <v-col>
          <span class="stitle">{{ titlespan }}</span>
        </v-col>
        <v-col class="AllRight">
          <downloadbtn4
            :filename="titlespan"
            @downloadclick2="downloadfile"
          ></downloadbtn4>
        </v-col>
      </v-row>
      <div class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col id="table">
              <div class="tablezone wrapper">
                <vue-pivottable
                  v-if="items.length > 0"
                  :data="items"
                  :rows="tablerows"
                  :cols="tablecols"
                  :vals="values"
                  :row-total="false"
                  :col-total="false"
                  :show-root-label="false"
                  :default-number-format="defaultFormat"
                  :except-format-list="formatList"
                  :for-float-thead="true"
                  :sorters="{
                    sex: sexsort,
                    classes: classessort,
                    county: citysort
                  }"
                  aggregator-name="Sum"
                  renderer-name="Table"
                >
                </vue-pivottable>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!--表格轉置 START-->
      <v-dialog v-model="tabletrans" max-width="800">
        <div class="modal-content">
          <div
            class="dialogclose"
            tabindex="0"
            role="button"
            aria-label="關閉"
            @click="tabletrans = false"
            @keyup.enter="tabletrans = false"
          >
            X
          </div>
          <div class="modal-header AllCenter">
            <label>表格轉置</label>
          </div>
          <div class="modal-body">
            <v-container>
              <v-row>
                <span>轉置設定</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>表側</span>
                          <button class="headbtn_top" @click="rowmovetop">
                            上移
                          </button>
                          <button class="headbtn_down" @click="rowmovedown">
                            下移
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="strow" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in trowitems"
                              :key="idx"
                              :value="item.value"
                              >{{ item.text }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="rowmovecol">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="colmoverow">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="colmoverow"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="rowmovecol">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>表頭</span>
                          <button class="headbtn_top" @click="colmovetop">
                            上移
                          </button>
                          <button class="headbtn_down" @click="colmovedown">
                            下移
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="stcol" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in tcolitems"
                              :key="idx"
                              :value="item.value"
                              >{{ item.text }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
              <v-row class="transpre">
                <span>預覽</span>
              </v-row>
              <v-row class="transpre">
                <v-col class="AllCenter">
                  <div class="pretable">
                    <div class="grayaxis"></div>
                    <div class="colblue">
                      <div
                        v-for="(item, idx) in tcolitems"
                        :key="idx"
                        :value="item.value"
                        class="colblueitem"
                      >
                        <span>{{ item.text }}</span>
                      </div>
                    </div>
                    <div class="rowblue">
                      <div
                        v-for="(item, idx) in trowitems"
                        :key="idx"
                        :value="item.value"
                        class="rowblueitem"
                      >
                        <span>{{ item.text }}</span>
                      </div>
                    </div>
                    <div class="valyallow"></div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="modal-footer AllCenter">
            <crosscancel @click.native="tabletrans = false"></crosscancel>
            <editbtn @click.native="transtabletrigger"></editbtn>
          </div>
        </div>
      </v-dialog>
      <!--表格轉置 END-->
      <!--表格編輯 START-->
      <v-dialog v-model="tableedit" max-width="800">
        <div class="modal-content">
          <div
            class="dialogclose"
            tabindex="0"
            role="button"
            aria-label="關閉"
            @click="tableedit = false"
            @keyup.enter="tableedit = false"
          >
            X
          </div>
          <div class="modal-header AllCenter">
            <label>表格編輯</label>
          </div>
          <div class="modal-body" style="height: 600px; overflow: auto;">
            <v-container>
              <v-row>
                <span>分類項目</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>選擇項目</span>
                          <button class="headbtn_top" @click="editclamovetop">
                            上移
                          </button>
                          <button class="headbtn_down" @click="editclamovedown">
                            下移
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="seclasses"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in tecls"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="classesremove">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="classesadd">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="classesadd"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="classesremove">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="rtranstable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>移除項目</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="srclasses"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in trcls"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
              <v-row>
                <span>性別</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>選擇項目</span>
                          <button class="headbtn_top" @click="editsexmovetop">
                            上移
                          </button>
                          <button class="headbtn_down" @click="editsexmovedown">
                            下移
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="sesex" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in tesex"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="sexesremove">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="sexesadd">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="sexesadd"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="sexesremove">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="rtranstable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>移除項目</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="srsex" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in trsex"
                              :key="idx"
                              :value="item"
                              >{{ item }}
                            </option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="modal-footer AllCenter">
            <crosscancel @click.native="tableedit = false"></crosscancel>
            <editbtn @click.native="edittabletrigger"></editbtn>
          </div>
        </div>
      </v-dialog>
      <!-- 表格編輯 END-->
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div v-if="loader" class="fade_cust"></div>
      <div v-if="loader" class="loader"></div>
    </v-container>
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
// eslint-disable-next-line no-unused-vars
import floatThead from 'floatthead'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import VuePivottable from '~/pivottable/Pivottable'
import downloadbtn4 from '~/components/button/downloadbtn4'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
export default {
  components: {
    VuePivottable,
    downloadbtn4,
    crosscancel,
    editbtn
  },
  layout: 'BackStage',
  data() {
    return {
      data: null,
      loader: false,
      titlespan: '臺灣地區人力資源調查-依縣市區分',
      items: [],
      tablerows: ['date', 'county'],
      tablecols: ['classes', 'sex'],
      values: ['value'],
      sex_sort: ['總計', '男', '女'],
      sexes: [],
      classes_sort: [
        { name: '15歲以上民間人口', value: 1 },
        { name: '勞動力', value: 2 },
        { name: '就業者', value: 3 },
        { name: '失業者', value: 4 },
        { name: '非勞動力', value: 5 },
        { name: '勞動力參與率', value: 6 },
        { name: '失業率', value: 7 }
      ],
      city_sort: [
        { name: '臺灣地區', value: 1 },
        { name: '北部區域', value: 2 },
        { name: '新北市', value: 3 },
        { name: '臺北市', value: 4 },
        { name: '桃園市', value: 5 },
        { name: '基隆市', value: 6 },
        { name: '新竹市', value: 7 },
        { name: '宜蘭縣', value: 8 },
        { name: '新竹縣', value: 9 },
        { name: '中部區域', value: 10 },
        { name: '臺中市', value: 11 },
        { name: '苗栗縣', value: 12 },
        { name: '彰化縣', value: 13 },
        { name: '南投縣', value: 14 },
        { name: '雲林縣', value: 15 },
        { name: '南部區域', value: 16 },
        { name: '臺南市', value: 17 },
        { name: '高雄市', value: 18 },
        { name: '嘉義市', value: 19 },
        { name: '嘉義縣', value: 20 },
        { name: '屏東縣', value: 21 },
        { name: '澎湖縣', value: 22 },
        { name: '東部區域', value: 23 },
        { name: '臺東縣', value: 24 },
        { name: '花蓮縣', value: 25 }
      ],
      defaultFormat: {
        digitsAfterDecimal: 0,
        defaultValue: '-',
        replaceToDefault: [-999999]
      },
      formatList: {
        失業率: {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        勞動力參與率: {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        }
      },
      digitsAfterDecimal: 2,
      statstring: '',
      classstring: '',
      sexstring: '',
      datastring: '',
      pkey: 0,
      editstat: [],
      tabletrans: false,
      trowitems: [],
      tcolitems: [],
      tableedit: false,
      seclasses: -1,
      tecls: [],
      srclasses: -1,
      trcls: [],
      sesex: -1,
      tesex: [],
      srsex: -1,
      trsex: [],
      sesattistics: -1,
      testa: [],
      srsattistics: -1,
      trsta: [],
      editclasses: [],
      editsex: [],
      removeclasses: [],
      removesex: [],
      removestat: [],
      strow: -1,
      stcol: -1,
      needref: false,
      overlay: false
    }
  },
  mounted() {
    const vm = this
    const _post = {}

    this.checkLogin()
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 5)

    _post.states = this.$route.query.states
    _post.months = this.$route.query.months
    _post.seasons = this.$route.query.seasons
    _post.startyear = this.$route.query.startyear
    _post.endyear = this.$route.query.endyear
    _post.sex = this.$route.query.sex
    _post.output1 = this.$route.query.output1
    _post.output2 = this.$route.query.output2
    _post.op = 'GetRequestTables'

    if (parseInt(this.$route.query.output2) === 2) {
      this.formatList.失業率.digitsAfterDecimal = 1
      this.formatList.勞動力參與率.digitsAfterDecimal = 1
    }

    this.sexes = this.$route.query.sex.split(',')
    this.sexstring = this.$route.query.sex
      .replace('T', '總計')
      .replace('M', '男')
      .replace('F', '女')

    this.editsex = this.sexstring.split(',')
    for (let i = 0; i < this.classes_sort.length; i++) {
      this.editclasses.push(this.classes_sort[i].name)
    }

    axios
      .post(vm.RequetURL.monthlyurl, qs.stringify(_post))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          if (data.length === 0) {
            _SAlert.Error('查無相關資料，將自動返回查詢功能.')
            setTimeout(function() {
              _SAlert.Close()
              vm.$router.push({
                path: '/Intranet_Inquire/MonthlyReport'
              })
            }, 1500)
          }
          vm.needref = true
          vm.items = data
          vm.data = data
        }
      })
  },
  updated() {
    if (this.needref) {
      this.headerfloat()
      this.needref = false
    }
    this.floatupdated()
    this.tablecolorset()
    this.setCountyPadding()
    this.setRowFrezze()
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
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
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
    floatupdated() {
      const colg = $('.floatThead-table colgroup col')
      const targ = $('.floatThead-col')

      for (let i = 0; i < targ.length; i++) {
        const width = $(targ[i]).width()
        if (colg[i]) {
          $(colg[i]).width(width)
        }
      }
    },
    disheaderfloat() {
      const $table = $('.pvtTable')
      $table.floatThead('destroy')
    },
    setRowFrezze() {
      const len = this.tablerows.length

      const tables = document.getElementsByClassName('pvtTable')
      if (tables.length === 0) return

      for (let c = 0; c < tables.length; c++) {
        const table = tables[c]
        if (table) {
          let body = table.getElementsByTagName('tbody')
          if (body.length > 0) body = body[0]
          else continue

          const trs = body.getElementsByTagName('tr')
          for (let k = 0; k < trs.length; k++) {
            const ths = trs[k].getElementsByTagName('th')
            if (ths.length !== len) {
              for (let n = 0; n < ths.length; n++) {
                ths[n].className += ' th_' + (len - ths.length + n + 1)
              }
            }
          }
        }
      }
    },
    downloadfile(opt) {
      const type = opt.type
      const vm = this
      const name = opt.filename
      vm.loader = true

      const form = new FormData()

      const tar = document.getElementById('table')
      const thead = tar.getElementsByTagName('thead')[0]
      const tbody = tar.getElementsByTagName('tbody')[0]

      const trs = thead.getElementsByTagName('tr')
      const result = []
      for (let i = 0; i < trs.length; i++) {
        const ths = trs[i].getElementsByTagName('th')
        const ppt = {}
        ppt.ths = []
        for (let j = 0; j < ths.length; j++) {
          const ts = ths[j]
          const opt = {}
          opt.rowspan = ts.getAttribute('rowspan')
          opt.colspan = ts.getAttribute('colspan')
          opt.className = ts.className
          opt.value = ts.innerHTML
          ppt.ths.push(opt)
        }
        result.push(ppt)
      }

      const trs2 = tbody.getElementsByTagName('tr')
      const result2 = []
      for (let i = 0; i < trs2.length; i++) {
        const ths = trs2[i].getElementsByTagName('th')
        const ppt = {}
        ppt.ths = []
        for (let j = 0; j < ths.length; j++) {
          const ts = ths[j]
          const opt = {}
          opt.rowspan = ts.getAttribute('rowspan')
          opt.colspan = ts.getAttribute('colspan')
          opt.isth = true
          opt.className = ts.className
          opt.value = ts.innerHTML
          ppt.ths.push(opt)
        }
        const tds = trs2[i].getElementsByTagName('td')
        for (let j = 0; j < tds.length; j++) {
          const ts = tds[j]
          const opt = {}
          opt.rowspan = 1
          opt.colspan = 1
          opt.isth = false
          opt.className = ts.className
          opt.value = ts.innerHTML
          ppt.ths.push(opt)
        }
        result2.push(ppt)
      }

      const otb = {}
      otb.thead = result
      otb.tbody = result2

      const row = this.tablerows
      let i
      for (i = 0; i < row.length; i++) {
        if (row[i] === 'county') break
      }

      const target = JSON.stringify(otb)
      form.set('html', target)
      form.set('title', name)
      form.set('type', type)
      form.set('countycol', i)

      axios({
        method: 'post',
        url: vm.RequetURL.exporturl2,
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((Response) => {
        vm.loader = false
        if (typeof Response === 'object' && Response.status === 200) {
          if (
            Response.data.includes('.xlsx') ||
            Response.data.includes('.ods')
          ) {
            const link = document.createElement('a')
            link.href =
              vm.RequetURL.tabledownload + encodeURIComponent(Response.data)
            link.click()
          } else {
            _SAlert.Error('下載檔案時發生錯誤.')
          }
        }
      })
    },
    sexsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.sex_sort.length; i++) {
        if (this.sex_sort[i] === a) ia = i
        if (this.sex_sort[i] === b) ib = i
      }
      return ia - ib
    },
    classessort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.classes_sort.length; i++) {
        if (this.classes_sort[i].name === a) ia = i
        if (this.classes_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    citysort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.city_sort.length; i++) {
        if (this.city_sort[i].name === a) ia = i
        if (this.city_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    arraymove(arr, oidx, nidx) {
      if (nidx >= arr.length) {
        let k = nidx - arr.length + 1
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(nidx, 0, arr.splice(oidx, 1)[0])
      return arr
    },
    rowmovecol() {
      const idx = this.getslistidx(this.trowitems, this.strow)
      if (idx === -1) return
      if (this.trowitems.length === 1) {
        _SAlert.Error('請至少保留一個表側.')
        return
      }
      const tar = this.trowitems[idx]

      this.tcolitems.push(tar)
      this.trowitems.splice(idx, 1)
    },
    colmoverow() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      if (idx === -1) return
      if (this.tcolitems.length === 1) {
        _SAlert.Error('請至少保留一個表頭.')
        return
      }
      const tar = this.tcolitems[idx]

      this.trowitems.push(tar)
      this.tcolitems.splice(idx, 1)
    },
    rowmovetop() {
      const idx = this.getslistidx(this.trowitems, this.strow)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.trowitems, idx, nidx)
    },
    rowmovedown() {
      const idx = this.getslistidx(this.trowitems, this.strow)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.trowitems.length - 1)
        this.arraymove(this.trowitems, idx, nidx)
    },
    colmovetop() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.tcolitems, idx, nidx)
    },
    colmovedown() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      const nidx = idx + 1

      if (nidx <= this.tcolitems.length - 1)
        this.arraymove(this.tcolitems, idx, nidx)
    },
    getslistidx(arry, str) {
      let j = -1
      for (let i = 0; i < arry.length; i++) {
        if (arry[i].value === str) {
          j = i
          break
        }
      }
      return j
    },
    tablecolorset() {
      const tables = document.getElementsByClassName('pvtTable')
      if (tables.length === 0) return

      const table = tables[0]
      const layout = this.classes_sort
      this.setstatisticscolor(table, layout)
    },
    setstatisticscolor(table, layouts) {
      const row = this.tablerows
      const col = this.tablecols
      let i, j

      for (i = 0; i < row.length; i++) {
        if (row[i] === 'classes') break
      }
      for (j = 0; j < col.length; j++) {
        if (col[j] === 'classes') break
      }

      if (table && i !== row.length) {
        let body = table.getElementsByTagName('tbody')
        if (body.length > 0) body = body[0]
        else return
        const trs = body.getElementsByTagName('tr')

        for (let k = 0; k < trs.length; k++) {
          const ths = trs[k].getElementsByTagName('th')
          let th
          if (ths.length < row.length) th = ths[i - 1]
          else th = ths[i]

          if (th) {
            if (layouts.length === 0) th.className = 'pvtRowLabel slevel3'
            else {
              const thinner = th.innerHTML
              const lvl = this.getlayoutlevel(thinner, layouts)
              th.className = 'pvtRowLabel slevel' + lvl
            }
          }
        }
      }
      if (table && j !== col.length) {
        let head = table.getElementsByTagName('thead')
        if (head.length > 0) head = head[0]
        let tr = head.getElementsByTagName('tr')
        if (tr.length && tr.length > 0) tr = tr[j]
        else return
        const ths = tr.getElementsByTagName('th')

        if (layouts.length === 0) {
          for (let k = 0; k < ths.length; k++) {
            if (ths[k].className === 'pvtAxisLabel' || ths[k].className === '')
              continue
            ths[k].className = 'pvtColLabel slevel3'
          }
        } else {
          for (let k = 0; k < ths.length; k++) {
            if (ths[k].className === 'pvtAxisLabel' || ths[k].className === '')
              continue
            const thinner = ths[k].innerHTML
            const lvl = this.getlayoutlevel(thinner, layouts)
            ths[k].className = 'pvtColLabel slevel' + lvl
          }
        }
      }
    },
    getlayoutlevel(str, layouts) {
      for (let i = 0; i < layouts.length; i++) {
        if (str === layouts[i].name) return layouts[i].level
      }
      return '-1'
    },
    research() {
      this.$router.push({
        path: '/Intranet_Inquire/MonthlyReport'
      })
    },
    getROCRowType(type) {
      switch (type) {
        case 'date':
          return '統計期'
        case 'classes':
          return '統計項'
        case 'sex':
          return '性別'
        case 'statistics':
          return '資料屬性'
        case 'county':
          return '縣市'
      }
    },
    tabletransport() {
      this.tabletrans = true
      const row = this.tablerows
      const col = this.tablecols
      const trow = []
      const tcol = []
      for (let i = 0; i < row.length; i++) {
        const opt = {}
        opt.text = this.getROCRowType(row[i])
        opt.value = row[i]
        trow.push(opt)
      }

      for (let j = 0; j < col.length; j++) {
        const opt = {}
        opt.text = this.getROCRowType(col[j])
        opt.value = col[j]
        tcol.push(opt)
      }

      this.trowitems = trow
      this.tcolitems = tcol
    },
    transtabletrigger() {
      const vm = this
      this.tabletrans = false
      this.overlay = true

      setTimeout(function() {
        vm.transporttables()
        vm.overlay = false
      }, 500)
    },
    transporttables() {
      const trows = this.trowitems
      const tcols = this.tcolitems

      const trs = []
      for (let i = 0; i < trows.length; i++) {
        trs.push(trows[i].value)
      }
      const tcs = []
      for (let i = 0; i < tcols.length; i++) {
        tcs.push(tcols[i].value)
      }

      this.disheaderfloat()
      this.tablerows = trs
      this.tablecols = tcs
      this.pkey = this.pkey + 1

      this.needref = true
    },
    tableeditset() {
      this.tableedit = true
      this.tecls = this.editclasses.slice()
      this.tesex = this.editsex.slice()
      this.testa = this.editstat.slice()
      this.trcls = this.removeclasses.slice()
      this.trsex = this.removesex.slice()
      this.trsta = this.removestat.slice()
    },
    editclamovetop() {
      const idx = this.tecls.indexOf(this.seclasses)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.tecls, idx, nidx)
    },
    editclamovedown() {
      const idx = this.tecls.indexOf(this.seclasses)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.tecls.length - 1) this.arraymove(this.tecls, idx, nidx)
    },
    editsexmovetop() {
      const idx = this.tesex.indexOf(this.sesex)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.tesex, idx, nidx)
    },
    editsexmovedown() {
      const idx = this.tesex.indexOf(this.sesex)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.tesex.length - 1) this.arraymove(this.tesex, idx, nidx)
    },
    classesremove() {
      const idx = this.tecls.indexOf(this.seclasses)
      if (this.tecls.length === 1) {
        _SAlert.Error('請至少保留一項分類項目.')
        return
      }
      if (idx === -1) return
      const tar = this.tecls[idx]

      this.trcls.push(tar)
      this.tecls.splice(idx, 1)
    },
    classesadd() {
      const idx = this.trcls.indexOf(this.srclasses)
      if (idx === -1) return
      const tar = this.trcls[idx]

      this.tecls.push(tar)
      this.trcls.splice(idx, 1)
    },
    sexesremove() {
      const idx = this.tesex.indexOf(this.sesex)
      if (this.tesex.length === 1) {
        _SAlert.Error('請至少保留一項性別.')
        return
      }
      if (idx === -1) return
      const tar = this.tesex[idx]

      this.trsex.push(tar)
      this.tesex.splice(idx, 1)
    },
    sexesadd() {
      const idx = this.trsex.indexOf(this.srsex)
      if (idx === -1) return
      const tar = this.trsex[idx]

      this.tesex.push(tar)
      this.trsex.splice(idx, 1)
    },
    setCountyPadding() {
      const row = this.tablerows
      let i
      for (i = 0; i < row.length; i++) {
        if (row[i] === 'county') break
      }

      const tables = document.getElementsByClassName('pvtTable')
      if (tables.length === 0) return

      for (let c = 0; c < tables.length; c++) {
        const table = tables[c]
        if (table && i !== row.length) {
          let body = table.getElementsByTagName('tbody')
          if (body.length > 0) body = body[0]
          else continue

          const trs = body.getElementsByTagName('tr')
          for (let k = 0; k < trs.length; k++) {
            const ths = trs[k].getElementsByTagName('th')

            for (let n = 0; n < ths.length; n++) {
              const th = ths[n]
              if (th) {
                const tspan = th.innerHTML
                if (tspan === '臺灣地區') {
                  th.className += ' clevel0'
                } else if (
                  tspan === '北部區域' ||
                  tspan === '中部區域' ||
                  tspan === '東部區域' ||
                  tspan === '南部區域'
                ) {
                  th.className += ' clevel1'
                } else {
                  const tar = this.city_sort.filter((f) => f.name === tspan)
                  if (tar.length > 0) th.className += ' clevel2'
                }
              }
            }
          }
        }
      }
    },
    edittabletrigger() {
      const vm = this
      this.tableedit = false
      this.overlay = true

      setTimeout(function() {
        vm.edittable()
        vm.overlay = false
      }, 500)
    },
    edittable() {
      const vm = this
      const data = vm.data
      let items = data

      this.editclasses = this.tecls
      this.editsex = this.tesex

      this.removeclasses = this.trcls
      this.removesex = this.trsex

      const classes = this.removeclasses
      const sexes = this.removesex

      for (let j = 0; j < classes.length; j++) {
        items = items.filter((n) => n.classes !== classes[j])
      }
      for (let j = 0; j < sexes.length; j++) {
        items = items.filter((n) => n.sex !== sexes[j])
      }

      this.sex_sort = this.editsex

      const e = this.editclasses
      const c = []
      for (let n = 0; n < e.length; n++) {
        const ost = {}
        ost.name = e[n]
        ost.value = n
        c.push(ost)
      }

      this.disheaderfloat()
      this.classes_sort = c
      this.items = items
      this.pkey = this.pkey + 1

      this.needref = true
    }
  }
}
</script>
<style lang="scss" scope>
.titlespan {
  font-weight: bold;
  font-size: 1.75em;
  line-height: 40px;
  color: #000000;
}
.tablezone {
  width: 100%;
  height: 550px;
  overflow: auto;
  position: relative;
}
table.pvtTable thead tr:nth-child(1) th:nth-child(n + 2) {
  background: #466a6d;
}
.showbtn {
  color: #344059;
  background: #ffffff;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.0625em;
  padding: 5px 15px;
  margin-right: 10px;
  height: 36px;
}
.breadzone {
  width: 50%;
  background: #ffffff;
  border-radius: 7px;
  height: 150px;
  padding: 10px;
  margin-top: 20px;
}
.showbtnzone {
  width: 50%;
  height: 150px;
  margin-top: 20px;
}
.stitle {
  font-weight: bold;
  font-size: 1.5em;
  line-height: 30px;
  color: #000000;
}

.transtable {
  width: 100%;
  border-collapse: collapse;
}
.transtable thead {
  background: #485965;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.125em;

  text-align: center;
}
.transtable thead tr th {
  border: 1px solid #485965;
  height: 50px;
  padding-left: 10px;
}
.transtable tbody {
  background: #dfedf1;
  font-size: 1em;
}
.transtable tbody tr td {
  border: 1px solid #dfedf1;
}
.translist {
  width: 100%;
  height: 150px;
  overflow: auto;
}
.translist option {
  padding: 4px 10px;
}
.tableitem {
  margin-top: 5px;
  position: relative;
}
.tableitemfade {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 700px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.headbtn_top {
  height: 49px;
  background: #40678a;
  position: absolute;
  right: 120px;
  padding: 0px 10px;
}
.headbtn_down {
  height: 50px;
  background: #40678a;
  position: absolute;
  right: 55px;
  padding: 0px 10px;
}
.rcbtn {
  width: 50px;
  height: 50px;
  border: 1px solid #777777;
  box-sizing: border-box;
  border-radius: 3px;
}
.rcbtnzone {
  max-width: 90px !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.pretable {
  width: 450px;
  height: 350px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.grayaxis {
  width: 180px;
  height: 150px;
  background: #d8d8d8;
}
.colblue {
  width: 250px;
  height: 150px;
  background: #dfedf1;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.rowblue {
  width: 180px;
  height: 180px;
  background: #dfedf1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.valyallow {
  width: 250px;
  height: 180px;
  background: #ffe394;
  margin-left: 10px;
}
.colblueitem {
  width: 150px;
  text-align: center;
}
.rowblueitem {
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.rtranstable {
  width: 100%;
  border-collapse: collapse;
}
.rtranstable thead {
  background: #df6573;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.125em;

  text-align: center;
}
.rtranstable thead tr th {
  border: 1px solid #df6573;
  padding: 10px;
}
.rtranstable tbody {
  background: #ffd2d7;
  font-size: 1em;
}
.rtranstable tbody tr td {
  border: 1px solid #ffd2d7;
}
.tableitemfade {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 700px;
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
.clevel0 {
  padding-left: 2px;
}
.clevel1 {
  padding-left: 18px;
}
.clevel2 {
  padding-left: 34px;
}
</style>

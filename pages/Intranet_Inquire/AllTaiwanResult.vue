<template>
  <div style="width: 100%;">
    <v-container class="containerForTable">
      <div class="headbread AllTopCenter">
        <div class="breadzone">
          <span class="breadtitle">性別:</span
          ><span class="breadinner">{{ sexstring }}</span> <br />
          <span class="breadtitle">期間:</span
          ><span class="breadinner">{{ datestring }}</span>
          <br />
          <span class="breadtitle">週期:</span
          ><span class="breadinner">{{ cyclestring }}</span>
          <br />
          <span class="breadtitle">輸出類別:</span
          ><span class="breadinner">{{ outputstring }}</span> <br />
        </div>
        <div class="showbtnzone AllTopRight">
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
      </div>
      <div class="AllRight">
        <downloadbtn4
          :filename="titlespan"
          @downloadclick2="downloadfile"
        ></downloadbtn4>
      </div>
      <div>
        <span class="stitle">{{ titlespan }}</span>
      </div>
      <div v-if="isedtion">
        <span style="font-size: 1em; color: #292B3B;"
          >*99年(含)以前僅統計大學及以上</span
        >
      </div>
      <div class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <v-row>
            <v-col id="table">
              <div v-if="items.length === 0" class="tableitemfade">
                <img
                  src="@/assets/images/Spin_GIF.gif"
                  class="fadespin"
                  alt=""
                />
              </div>
              <VuePivottable
                :items="items"
                :pkey="pkey"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :master-sort="master_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="classes_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="hasrou" style="padding-left: 10px;">
            <span style="font-size: 1.25em; color: #292B3B;"
              >註：112年1月起「女性結婚或生育」修改為「結婚或生育」。</span
            >
          </v-row>
          <v-row v-if="hasron" style="padding-left: 10px;">
            <span style="font-size: 1.25em; color: #292B3B;"
              >註：自114年起，非勞動力未參與勞動原因「想工作而未找工作且隨時可以開始工作」者，依實際狀況分別歸入「求學及準備升學」、「料理家務」、「高齡、身心障礙」及「其他」4類，不再單獨列示。</span
            >
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
                <span>性別 / 子分類項</span>
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
                <span>資料屬性</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>選擇項目</span>
                          <button class="headbtn_top" @click="editstatmovetop">
                            上移
                          </button>
                          <button
                            class="headbtn_down"
                            @click="editstatmovedown"
                          >
                            下移
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="sesattistics"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in testa"
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
                  <button class="rcbtn" @click="statremove">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="statadd">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="statadd"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="statremove">
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
                            v-model="srsattistics"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in trsta"
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
import VuePivottable from '~/components/table/Taiwan_Intranet'
import downloadbtn4 from '~/components/button/downloadbtn4'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
export default {
  components: {
    VuePivottable,
    downloadbtn4,
    editbtn,
    crosscancel
  },
  layout: 'BackStage',
  data() {
    return {
      data: [],
      loader: false,
      titlespan: '',
      titlestring: '',
      sexstring: '',
      datestring: '',
      cyclestring: '',
      outputstring: '',
      pkey: 0,
      items: [],
      tablerows: ['d'],
      tablecols: ['c', 's', 'st'],
      values: ['v'],
      sex_sort: ['總計', '男', '女'],
      statistics_sort: [
        { name: '統計值', value: 1 },
        { name: '統計值 (千人)', value: 2 },
        { name: '統計值 (人)', value: 3 },
        { name: '統計值-小數2位 (%)', value: 4 },
        { name: '統計值-小數1位 (%)', value: 5 },
        { name: '統計值-小數2位', value: 6 },
        { name: '統計值-小數1位', value: 7 },
        { name: '結構比 (%)', value: 8 }
      ],
      master_sort: [
        { name: '總計', value: 1 },
        { name: '教育程度', value: 2 },
        { name: '年齡', value: 3 },
        { name: '行業', value: 4 },
        { name: '職業', value: 5 },
        { name: '失業原因', value: 6 },
        { name: '從業身分', value: 7 },
        { name: '未參與勞動原因', value: 8 }
      ],
      defaultFormat: {
        digitsAfterDecimal: 0,
        defaultValue: '-',
        replaceToDefault: [-999999]
      },
      formatList: {
        '統計值-小數2位 (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '統計值-小數1位 (%)': {
          digitsAfterDecimal: 1,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '統計值-小數2位': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '統計值-小數1位': {
          digitsAfterDecimal: 1,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '結構比 (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        }
      },
      classes_sort: [],
      sub_classes: [],
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
      isedtion: false,
      needref: false,
      overlay: false,
      hasrou: false,
      hasron: false
    }
  },
  mounted() {
    const vm = this
    const _post = {}

    this.checkLogin()
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 5)

    _post.startyear = this.$route.query.startyear
    _post.endyear = this.$route.query.endyear
    _post.classes = this.$route.query.classes
    _post.sex = this.$route.query.sex
    _post.cycle = this.$route.query.cycle
    _post.output = this.$route.query.output
    _post.smonth = this.$route.query.smonth
    _post.subtype = this.$route.query.subtype
    _post.classes1 = this.$route.query.classes1
    _post.classes2 = this.$route.query.classes2
    _post.classes3 = this.$route.query.classes3
    _post.subtype2 = this.$route.query.subtype2
    _post.op = 'GetRequestTables'

    this.sexstring = this.$route.query.sex
      .replace('T', '總計')
      .replace('M', '男')
      .replace('F', '女')

    this.datestring = _post.startyear + '年' + '-' + _post.endyear + '年'

    this.cyclestring = this.$route.query.cycle
      .replace('1', '年')
      .replace('2', '半年')
      .replace('3', '季')
      .replace('4', '月')
      .replace('5', '同月')
      .replace('6', '累計')

    this.outputstring = this.$route.query.output
      .replace('T', '統計值 (千人)')
      .replace('P', '統計值 (人)')
      .replace('S', '結構比 (%)')
      .replace('D2', '統計值-小數2位')
      .replace('D1', '統計值-小數1位')

    this.editstat = vm.outputstring.split(',')
    this.editstat.sort(vm.statisticssort)

    const type = this.checkdatatype()
    if (type === 2 || type === 3) {
      this.tablecols = ['m', 'c', 's', 'st']
    }

    axios
      .post(vm.RequetURL.taiwanaxurl, qs.stringify(_post))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          if (data.subclasses) vm.sub_classes = data.subclasses
          if (data.sort) vm.classes_sort = data.sort
          vm.settitlespan()

          if (!data.subclasses) {
            vm.editsex = vm.sexstring.split(',')
          } else {
            vm.editsex = data.subclasses
            vm.sex_sort = data.subclasses
          }

          if (data.data.length === 0) {
            /* _SAlert.Error('查無相關資料，將自動返回查詢功能.')
            setTimeout(function() {
              _SAlert.Close()
              vm.$router.push({
                path: '/Intranet_Inquire/AllTaiwanSearch'
              })
            }, 1500) */
          }

          vm.data = data.data
          vm.items = data.data
          vm.needref = true
        }
      })
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.floatheaderfixed)
  },
  destroyed() {
    window.removeEventListener('resize', this.floatheaderfixed)
  },
  updated() {
    if (this.needref) {
      this.headerfloat()
      this.needref = false
    }
    this.setRowFrezze()
    this.floatheaderfixed()
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
    disheaderfloat() {
      const $table = $('.pvtTable')
      $table.floatThead('destroy')
    },
    floatheaderfixed() {
      setTimeout(function() {
        const colg = $('.floatThead-table colgroup col')
        const targ = $('.floatThead-col')

        for (let i = 0; i < targ.length; i++) {
          const width = $(targ[i]).width()
          if (targ[i]) {
            $(colg[i]).width(width)
          }
        }
      }, 500)
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
    checkdatatype() {
      const type = this.$route.query.classes
      const subtype = this.$route.query.subtype

      if (type === '1') return 1

      if (
        type === '2' ||
        type === '3' ||
        type === '5' ||
        type === '6' ||
        type === '7' ||
        (type === '9' && subtype === '5') ||
        (type === '10' && subtype === '1') ||
        type === '11'
      ) {
        return 2
      }

      if (type === '4') return 3

      if (type === '8' || type === '9' || type === '10') return 4

      return -1
    },
    settitlespan() {
      const classes = parseInt(this.$route.query.classes)
      const subtype = parseInt(this.$route.query.subtype)
      const classes1 = this.$route.query.classes1.split(',')
      const classes2 = parseInt(this.$route.query.classes2)
      const classes3 = parseInt(this.$route.query.classes3)

      let ts = ''
      ts += this.getrocclasses(classes)

      if (classes >= 2 && classes <= 6) {
        for (let i = 0; i < classes1.length; i++) {
          ts += '-' + this.getrocclasses1(parseInt(classes1[i]))
        }
      } else if (classes === 7) {
        for (let i = 0; i < classes1.length; i++) {
          ts += '-' + this.getrocclasses1(parseInt(classes1[i]))
        }
        if (subtype === 1)
          ts += '-' + '就業者(一)舊行業(6th)舊職業(5th)(67~90年)'
        else if (subtype === 2)
          ts += '-' + '就業者(一)舊行業(7th)舊職業(5th)(88~95年)'
        else if (subtype === 3)
          ts += '-' + '就業者(一)新行業(8th)舊職業(5th)(90~99年)'
        else if (subtype === 4)
          ts += '-' + '就業者(一)新行業(8th-11th)(96年以後)'
      } else if (classes === 8) {
        if (subtype === 1)
          ts += '-' + '就業者(二)舊行業(6th)舊職業(5th)(67~90年)'
        else if (subtype === 2)
          ts += '-' + '就業者(二)舊行業(7th)舊職業(5th)(88~95年)'
        else if (subtype === 3)
          ts += '-' + '就業者(二)新行業(8th)舊職業(5th)(96~99年)'
        else if (subtype === 4)
          ts += '-' + '就業者(二)新行業(8th-11th)新職業(6th)(100年以後)'

        ts += '-' + this.getrocclasses2(classes2)
        ts += this.getsubtype2()
        ts += '-' + this.getrocclasses3(classes3)
      } else if (classes === 9) {
        if (subtype === 5) {
          ts += '-' + '失業者(一)'
          for (let i = 0; i < classes1.length; i++) {
            ts += '-' + this.getrocclasses1(parseInt(classes1[i]))
          }
        } else {
          if (subtype === 1)
            ts += '-' + '失業者(二)舊行業(6th)舊職業(5th)(67~90年)'
          else if (subtype === 2)
            ts += '-' + '失業者(二)舊行業(7th)舊職業(5th)(88~95年)'
          else if (subtype === 3)
            ts += '-' + '失業者(二)新行業(8th)舊職業(5th)(96~99年)'
          else if (subtype === 4)
            ts += '-' + '失業者(二)新行業(8th-11th)新職業(6th)(100年以後)'

          ts += '-' + this.getrocclasses2(classes2)
          ts += this.getsubtype2()
          ts += '-' + this.getrocclasses3(classes3)

          const s = this.getsubtype2()
          if (s.includes('結婚或生育')) this.hasrou = true
          if (s.includes('未參與勞動原因')) this.hasron = true
        }
      } else if (classes === 10) {
        if (subtype === 1) {
          ts += '-' + '非勞動力(一)'
          for (let i = 0; i < classes1.length; i++) {
            ts += '-' + this.getrocclasses1(parseInt(classes1[i]))
          }
        } else if (subtype === 2) {
          ts += '-' + '非勞動力(二)'
          ts += '-' + this.getrocclasses2(classes2)
          ts += this.getsubtype2()
          ts += '-' + this.getrocclasses3(classes3)
        }
      } else if (classes === 11) {
        if (subtype === 1) {
          ts += '-' + '4週失業者'
        } else if (subtype === 2) {
          ts += '-' + '工時不足就業者'
        } else if (subtype === 3) {
          ts += '-' + '潛在勞動力'
        } else if (subtype === 4) {
          ts += '-' + 'LU1'
        } else if (subtype === 5) {
          ts += '-' + 'LU2'
        } else if (subtype === 6) {
          ts += '-' + 'LU3'
        } else if (subtype === 7) {
          ts += '-' + 'LU4'
        }
        for (let i = 0; i < classes1.length; i++) {
          ts += '-' + this.getrocclasses1(parseInt(classes1[i]))
        }
      }

      this.titlespan = ts

      if (this.getrocclasses1(parseInt(classes1)) === '教育程度')
        this.isedtion = true
      if (ts.includes('失業原因')) this.hasrou = true
      if (ts.includes('未參與勞動原因')) this.hasron = true
    },
    downloadtilespan() {
      const classes = parseInt(this.$route.query.classes)
      const subtype = parseInt(this.$route.query.subtype)
      const classes1 = parseInt(this.$route.query.classes1)
      const classes2 = parseInt(this.$route.query.classes2)
      const classes3 = parseInt(this.$route.query.classes3)

      let ts = ''
      ts += this.getrocclasses(classes)

      if (classes >= 2 && classes <= 6) {
        ts += '-' + this.getrocclasses1(classes1)
      } else if (classes === 7) {
        ts += '-' + this.getrocclasses1(classes1)
        if (subtype === 1)
          ts += '-' + '就業者(一)舊行業(6th)舊職業(5th)(67~90年)'
        else if (subtype === 2)
          ts += '-' + '就業者(一)舊行業(7th)舊職業(5th)(88~95年)'
        else if (subtype === 3)
          ts += '-' + '就業者(一)新行業(8th)舊職業(5th)(90~99年)'
        else if (subtype === 4)
          ts += '-' + '就業者(一)新行業(8th-11th)(96年以後)'
      } else if (classes === 8) {
        if (subtype === 1)
          ts += '-' + '就業者(二)舊行業(6th)舊職業(5th)(67~90年)'
        else if (subtype === 2)
          ts += '-' + '就業者(二)舊行業(7th)舊職業(5th)(88~95年)'
        else if (subtype === 3)
          ts += '-' + '就業者(二)新行業(8th)舊職業(5th)(96~99年)'
        else if (subtype === 4)
          ts += '-' + '就業者(二)新行業(8th-11th)新職業(6th)(100年以後)'

        ts += '-' + this.getrocclasses2(classes2)
        // ts += this.getsubtype2()
        ts += '-' + this.getrocclasses3(classes3)
      } else if (classes === 9) {
        if (subtype === 5) {
          ts += '-' + '失業者(一)' + '-' + this.getrocclasses1(classes1)
        } else {
          if (subtype === 1)
            ts += '-' + '失業者(二)舊行業(6th)舊職業(5th)(67~90年)'
          else if (subtype === 2)
            ts += '-' + '失業者(二)舊行業(7th)舊職業(5th)(88~95年)'
          else if (subtype === 3)
            ts += '-' + '失業者(二)新行業(8th)舊職業(5th)(96~99年)'
          else if (subtype === 4)
            ts += '-' + '失業者(二)新行業(8th-11th)新職業(6th)(100年以後)'

          ts += '-' + this.getrocclasses2(classes2)
          // ts += this.getsubtype2()
          ts += '-' + this.getrocclasses3(classes3)
        }
      } else if (classes === 10) {
        if (subtype === 1) {
          ts += '-' + '非勞動力(一)' + '-' + this.getrocclasses1(classes1)
        } else if (subtype === 2) {
          ts += '-' + '非勞動力(二)'
          ts += '-' + this.getrocclasses2(classes2)
          // ts += this.getsubtype2()
          ts += '-' + this.getrocclasses3(classes3)
        }
      } else if (classes === 11) {
        if (subtype === 1) {
          ts += '-' + '4週失業者'
        } else if (subtype === 2) {
          ts += '-' + '工時不足就業者'
        } else if (subtype === 3) {
          ts += '-' + '潛在勞動力'
        } else if (subtype === 4) {
          ts += '-' + 'LU1'
        } else if (subtype === 5) {
          ts += '-' + 'LU2'
        } else if (subtype === 6) {
          ts += '-' + 'LU3'
        } else if (subtype === 7) {
          ts += '-' + 'LU4'
        }
        for (let i = 0; i < classes1.length; i++) {
          ts += '-' + this.getrocclasses1(parseInt(classes1[i]))
        }
      }

      return ts
    },
    getrocclasses(type) {
      switch (type) {
        case 1:
          return '總人口'
        case 2:
          return '勞動力'
        case 3:
          return '15歲以上民間人口'
        case 4:
          return '失業週數'
        case 5:
          return '失業率'
        case 6:
          return '勞動力參與率'
        case 7:
          return '就業者(一)'
        case 8:
          return '就業者(二)'
        case 9:
          return '失業者'
        case 10:
          return '非勞動力'
        case 11:
          return '勞動力低度運用指標'
      }
    },
    getrocclasses1(type) {
      switch (type) {
        case 1:
          return '總計'
        case 2:
          return '教育程度'
        case 3:
          return '年齡'
        case 4:
          return '行業'
        case 5:
          return '職業'
        case 6:
          return '失業原因'
        case 7:
          return '從業身分'
        case 8:
          return '未參與勞動原因'
      }
    },
    getrocclasses2(type) {
      switch (type) {
        case 1:
          return '行業'
        case 2:
          return '職業'
        case 3:
          return '從業身分'
        case 4:
          return '失業原因'
        case 5:
          return '非初次尋職者原因'
        case 6:
          return '失業前從業身分'
        case 7:
          return '未參與勞動原因'
      }
    },
    getrocclasses3(type) {
      switch (type) {
        case 1:
          return '總計'
        case 2:
          return '教育程度'
        case 3:
          return '年齡'
        case 4:
          return '失業前行業'
        case 5:
          return '失業前職業'
        case 6:
          return '失業前從業身分'
      }
    },
    getsubtype2() {
      const v = this.sub_classes

      let st = ''
      if (v.length === 0) return st
      else {
        for (let i = 0; i < v.length; i++) {
          if (i !== 0) st += ','
          st += v[i]
        }
        return '-' + st
      }
    },
    research() {
      this.$router.push({
        path: '/Intranet_Inquire/AllTaiwanSearch'
      })
    },
    getROCRowType(type) {
      switch (type) {
        case 'm':
          return '分類項目'
        case 'd':
          return '統計期'
        case 'c':
          return '分類依據'
        case 's':
          return '性別 / 子分類項'
        case 'st':
          return '資料屬性'
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

      this.floatheaderfixed()
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
      this.pkey = this.pkey + 1
      this.tablerows = trs
      this.tablecols = tcs

      this.needref = true
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
    tableeditset() {
      this.tableedit = true
      this.tesex = this.editsex.slice()
      this.testa = this.editstat.slice()
      this.trsex = this.removesex.slice()
      this.trsta = this.removestat.slice()
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
    editstatmovetop() {
      const idx = this.testa.indexOf(this.sesattistics)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.testa, idx, nidx)
    },
    editstatmovedown() {
      const idx = this.testa.indexOf(this.sesattistics)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.testa.length - 1) this.arraymove(this.testa, idx, nidx)
    },
    sexesremove() {
      const idx = this.tesex.indexOf(this.sesex)
      if (this.tesex.length === 1) {
        _SAlert.Error('請至少保留一項性別 / 子分類項.')
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
    statremove() {
      const idx = this.testa.indexOf(this.sesattistics)
      if (this.testa.length === 1) {
        _SAlert.Error('請至少保留一項資料屬性.')
        return
      }
      if (idx === -1) return
      const tar = this.testa[idx]

      this.trsta.push(tar)
      this.testa.splice(idx, 1)
    },
    statadd() {
      const idx = this.trsta.indexOf(this.srsattistics)
      if (idx === -1) return
      const tar = this.trsta[idx]

      this.testa.push(tar)
      this.trsta.splice(idx, 1)
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

      this.editsex = this.tesex
      this.editstat = this.testa

      this.removesex = this.trsex
      this.removestat = this.trsta

      const sexes = this.removesex
      const stats = this.removestat

      for (let j = 0; j < sexes.length; j++) {
        items = items.filter((n) => n.s !== sexes[j])
      }
      for (let j = 0; j < stats.length; j++) {
        items = items.filter((n) => n.st.includes(stats[j]) === false)
      }

      this.sex_sort = this.editsex
      const e = this.editstat
      const c = []
      for (let n = 0; n < e.length; n++) {
        const ost = {}
        ost.name = e[n]
        ost.value = n
        c.push(ost)
      }

      this.disheaderfloat()
      this.statistics_sort = c
      this.items = items
      this.pkey = this.pkey + 1

      this.needref = true
    },
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
    },
    downloadfile(opt) {
      const type = opt.type
      const vm = this
      let name = opt.filename
      const form = new FormData()
      const classes = parseInt(this.$route.query.classes)
      const subtype2 = this.$route.query.subtype2
      vm.loader = true
      if (classes === 8 || classes === 9 || classes === 10) {
        if (subtype2 !== '') {
          const aryname = name.split('-')
          const subary = aryname[3].split(',')

          if (subary.length > 1) {
            aryname[3] = '複選'
          }

          const subary2 = aryname[4].split(',')
          if (subary2.length > 1) {
            aryname[4] = '複選'
          }

          let tmpname = ''

          for (let i = 0; i < aryname.length; i++) {
            if (i !== 0) tmpname += '-'
            tmpname += aryname[i]
          }
          name = tmpname
        }
      }

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

      const target = JSON.stringify(otb)
      form.set('html', target)
      form.set('title', name)
      form.set('type', type)

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
  max-height: 550px;
  overflow: auto;
  position: relative;
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
.breadtitle {
  font-weight: bold;
  font-size: 1em;
  line-height: 30px;
  color: #000000;
}
.breadinner {
  font-size: 1em;
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
.stitle {
  font-weight: bold;
  font-size: 1.5em;
  line-height: 30px;
  color: #000000;
}
.tableitemfade {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 600px;
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

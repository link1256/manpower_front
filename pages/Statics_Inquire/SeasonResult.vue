<template>
  <div style="width: 100%;">
    <v-container class="containerForTable">
      <span
        id="centercontent"
        class="topfocus"
        accesskey="C"
        tabindex="0"
        title="中間區塊，主要顯示內容"
        role="button"
        aria-label="中間區塊，主要顯示內容"
        >:::</span
      >
      <div class="headbread AllTopCenter">
        <div class="breadzone">
          <span class="breadtitle">統計項目:</span
          ><span class="breadinner">{{ statstring }}</span> <br />
          <span class="breadtitle">分類:</span
          ><span class="breadinner">{{ classstring }}</span>
          <br />
          <span class="breadtitle">性別:</span
          ><span class="breadinner">{{ sexstring }}</span>
          <br />
          <span class="breadtitle">資料屬性:</span
          ><span class="breadinner">{{ datastring }}</span> <br />
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
      <div class="tableitem">
        <v-container>
          <v-row>
            <v-col>
              <span class="titlespan">{{ base_title }}</span>
            </v-col>
          </v-row>
          <v-row v-if="false">
            <v-col>
              *失業率(季節調整)僅呈現性別總計之月統計值資料
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="base_table ? 'ui button active' : 'ui button'"
                  @click="base_table = true"
                >
                  統計表
                </button>
                <div class="or"></div>
                <button
                  :class="base_table ? 'ui button' : 'ui button active'"
                  @click="base_drawset = true"
                >
                  統計圖
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="base_table == false"
                class="showbtn"
                @click="base_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                內容設定
              </button>
              <downloadbtn2
                v-if="base_table == true"
                :items="[{ title: '下載XLSX' }, { title: '下載ODS' }]"
                @downloadclick2="downloadfile1"
              ></downloadbtn2>
              <downloadbtn
                v-if="base_table == false"
                @downloadclick="downloadImage1"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="base_table === true">
            <v-col :id="'table1'">
              <div class="tablezone wrapper">
                <div v-if="base_items.length === 0" class="tableitemfade">
                  <img
                    src="@/assets/images/Spin_GIF.gif"
                    class="fadespin"
                    alt=""
                  />
                </div>
                <vue-pivottable
                  v-if="base_items.length > 0"
                  :key="base_idx"
                  :data="base_items"
                  :rows="tablerows"
                  :cols="tablecols"
                  :vals="values"
                  :row-total="false"
                  :col-total="false"
                  :show-root-label="false"
                  :default-number-format="defaultFormat"
                  :except-format-list="formatList"
                  :for-float-thead="true"
                  :sorters="{ s: sexsort }"
                  aggregator-name="Sum"
                  renderer-name="Table"
                >
                </vue-pivottable>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="base_table === false">
            <v-col>
              <highcharts
                ref="chart1"
                :options="baseChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="base_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span>* 點擊圖例中項目可暫時關閉該項目</span>
                <br />
                <span>* 可用滑鼠拖曳產生區域放大搭配水平卷軸檢視</span>
              </div>
            </v-col>
          </v-row>
          <!-- Base設定畫圖Start -->
          <v-dialog v-model="base_drawset" max-width="500">
            <div class="modal-content">
              <div
                class="dialogclose"
                tabindex="0"
                role="button"
                aria-label="關閉"
                @click="base_drawset = false"
                @keyup.enter="base_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>統計圖-內容設定</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="base_idx"
                  :show="base_drawset"
                  :classtype="1"
                  :statitems="editstat"
                  @closeConditions="base_drawset = false"
                  @drawthis="drawbase"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- Base設定畫圖End -->
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
              <v-row class="transcol">
                <v-col>
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
      <!--表格編輯 END-->
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
import downloadbtn2 from '~/components/button/downloadbtn2'
import downloadbtn from '~/components/button/downloadbtn'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
import drawset from '~/components/MoreInquire/DrawSet'
export default {
  components: {
    VuePivottable,
    downloadbtn,
    downloadbtn2,
    crosscancel,
    editbtn,
    drawset
  },
  data() {
    return {
      loader: false,
      base_title: '失業率(季節調整)',
      statstring: '失業率(季節調整)',
      classstring: '總計',
      sexstring: '總計',
      datastring: '統計值',
      tablerows: ['d'],
      tablecols: ['c', 's', 'st'],
      values: ['v'],
      sex_sort: ['T'],
      defaultFormat: {
        digitsAfterDecimal: 0,
        defaultValue: '-',
        replaceToDefault: [-999999]
      },
      formatList: {
        '統計值 (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        }
      },
      base_idx: 0,
      base_table: true,
      base_drawset: false,
      base_items: [],
      tabletrans: false,
      tableedit: false,
      strow: -1,
      stcol: -1,
      trowitems: [],
      tcolitems: [],
      seclasses: -1,
      sesex: -1,
      sesattistics: -1,
      srclasses: -1,
      srsex: -1,
      srsattistics: -1,
      editclasses: [],
      editsex: [],
      editstat: [],
      removeclasses: [],
      removesex: [],
      removestat: [],
      tecls: [],
      tesex: [],
      testa: [],
      trcls: [],
      trsex: [],
      trsta: [],
      xAxisarray: [],
      base_data: [],
      baseChartOption: {},
      needred: false,
      overlay: false
    }
  },
  layout: 'BackStage',
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 2)
    this.editclasses = this.classstring.split(',')
    this.editsex = this.sexstring.split(',')
    this.editstat = this.datastring.split(',')
    this.sex_sort = this.sexstring.split(',')
    this.statistics_sort = this.datastring.split(',')

    this.getdatearry()
    this.getdata()
    this.setbcount()
  },
  updated() {
    if (this.needref) {
      this.headerfloat()
      this.needref = false
    }
  },
  methods: {
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
    async getdata() {
      const vm = this
      const _post = {}
      _post.startyear = this.$route.query.startyear
      _post.endyear = this.$route.query.endyear
      _post.infotype = this.$route.query.infotype
      _post.cycle = this.$route.query.cycle
      _post.op = 'GetSeasonData'

      await axios
        .post(vm.RequetURL.majaxurl, qs.stringify(_post))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.base_items = data
            vm.base_data = data
            vm.needref = true
          }
        })
    },
    research() {
      this.$router.push({
        path: '/Statics_Inquire/MoreInquire'
      })
    },
    setbcount() {
      const vm = this

      axios.post(
        vm.RequetURL.majaxurl,
        qs.stringify({ op: 'SetBrowserCount', type: 'SEA' })
      )
    },
    getdatearry() {
      const startyear = parseInt(this.$route.query.startyear)
      const endyear = parseInt(this.$route.query.endyear)
      const infotype = parseInt(this.$route.query.infotype)
      const cycle = parseInt(this.$route.query.cycle)

      const arry = []
      if (infotype === 1 && cycle !== 0) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i + '年' + cycle + '月')
        }
      } else {
        for (let i = startyear; i <= endyear; i++) {
          for (let j = 1; j <= 12; j++) arry.push(i + '年' + j + '月')
        }
      }
      this.xAxisarray = arry
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
      const tar = this.trowitems[idx]

      this.tcolitems.push(tar)
      this.trowitems.splice(idx, 1)
    },
    colmoverow() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      if (idx === -1) return
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
    getROCRowType(type) {
      switch (type) {
        case 'd':
          return '統計期'
        case 'c':
          return '分類依據'
        case 's':
          return '性別'
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
      this.base_idx = this.base_idx + 1

      this.tablerows = trs
      this.tablecols = tcs
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
      this.editclasses = this.tecls
      this.editsex = this.tesex
      this.editstat = this.testa

      this.removeclasses = this.trcls
      this.removesex = this.trsex
      this.removestat = this.trsta

      const classes = this.editclasses
      const sexes = this.removesex
      const stats = this.removestat

      for (let i = 0; i < classes.length; i++) {
        switch (classes[i]) {
          case '總計':
          case '失業率':
          case '勞動力參與率':
            this.base_show = true
            break
          case '年齡':
            this.age_show = true
            break
          case '教育程度':
            this.edtion_show = true
            break
          case '非勞動原因':
            this.ron_show = true
            break
          case '行業標準分類第6次修訂':
            this.ind6_show = true
            break
          case '行業標準分類第7次修訂':
            this.ind7_show = true
            break
          case '行業標準分類第8-11次修訂':
            this.ind8_show = true
            break
          case '職業標準分類第5次修訂':
            this.occ5_show = true
            break
          case '職業標準分類第6次修訂':
            this.occ6_show = true
            break
          case '從業身分':
            this.cow_show = true
            break
          case '失業原因':
            this.rou_show = true
            break
        }
      }
      let basedata = this.base_data

      for (let i = 0; i < sexes.length; i++) {
        basedata = basedata.filter((n) => n.s !== sexes[i])
      }
      for (let i = 0; i < stats.length; i++) {
        basedata = basedata.filter((n) => !n.st.includes(stats[i]))
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
      this.base_items = basedata
      this.base_idx = this.base_idx + 1

      this.needref = true
      this.redraw()
    },
    redraw() {
      if (this.base_obj) this.drawbase(this.base_obj, true)
    },
    drawbase(opt, redraw) {
      this.disheaderfloat()
      const vm = this
      this.base_obj = opt
      opt.unit = '%'
      const attrs = vm.editstat
      const sexs = vm.editsex
      if (
        opt.chart === 'column' ||
        opt.chart === 'line' ||
        opt.chart === 'percentbar'
      ) {
        const obj = {
          chart: {
            type: opt.chart,
            zoomType: 'xy',
            marginTop: 40
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: vm.xAxisarray
          },
          yAxis: {
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            }
          },
          series: []
        }
        if (opt.chart === 'percentbar') {
          const plotOptions = {}
          plotOptions.column = {
            stacking: 'normal',
            dataLabels: {
              enabled: false
            }
          }
          obj.plotOptions = plotOptions
          obj.chart.type = 'column'
        }
        if (opt.unit === '千人') {
          obj.yAxis.labels = {}
          obj.yAxis.labels.format = '{value}'
        }

        if (opt.ismult) {
          for (let i = 0; i < opt.attrs.length; i++) {
            if (!attrs.includes(opt.attrs[i])) continue
            for (let k = 0; k < sexs.length; k++) {
              if (opt.chart === 'percentbar' && sexs[k] === '總計') continue
              const ser = {}
              ser.name = sexs[k] + '-' + opt.attrs[i]
              ser.data = []
              const tardata = vm.base_data.filter(
                (n) => n.st.includes(opt.attrs[i]) && n.s === sexs[k]
              )
              for (let j = 0; j < tardata.length; j++) {
                if (tardata[j].v === -999999) ser.data.push(0)
                else ser.data.push(tardata[j].v)
              }
              obj.series.push(ser)
            }
          }
        } else {
          for (let k = 0; k < sexs.length; k++) {
            if (opt.chart === 'percentbar' && sexs[k] === '總計') continue
            const ser = {}
            ser.name = sexs[k] + '-' + opt.attrs
            ser.data = []
            const tardata = vm.base_data.filter(
              (n) => n.st.includes(opt.attrs) && n.s === sexs[k]
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) ser.data.push(0)
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        this.baseChartOption = obj
      } else if (opt.chart === 'percentzone') {
        const obj = {
          chart: {
            type: 'area',
            zoomType: 'xy',
            marginTop: 40
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: vm.xAxisarray
          },
          yAxis: {
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            }
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#666666'
              }
            }
          },
          series: []
        }
        const sexs = vm.editsex
        if (opt.ismult) {
          for (let i = 0; i < opt.attrs.length; i++) {
            if (!attrs.includes(opt.attrs[i])) continue
            for (let k = 0; k < sexs.length; k++) {
              if (sexs[k] === '總計') continue
              const ser = {}
              ser.name = sexs[k] + '-' + opt.attrs[i]
              ser.data = []
              const tardata = vm.base_data.filter(
                (n) =>
                  n.st.includes(opt.attrs[i]) && n.s === sexs[k] && n.l === '1'
              )
              for (let j = 0; j < tardata.length; j++) {
                if (tardata[j].v === -999999) ser.data.push(0)
                else ser.data.push(tardata[j].v)
              }
              obj.series.push(ser)
            }
          }
        } else {
          for (let k = 0; k < sexs.length; k++) {
            const ser = {}
            ser.name = sexs[k] + '-' + opt.attrs
            ser.data = []
            const tardata = vm.base_data.filter(
              (n) => n.st.includes(opt.attrs) && n.s === sexs[k] && n.l === '1'
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) ser.data.push(0)
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        this.baseChartOption = obj
      } else if (
        opt.chart === 'mixbar' ||
        opt.chart === 'mixline' ||
        opt.chart === 'mixchart'
      ) {
        const obj = {
          chart: {
            zoomType: 'xy',
            marginTop: 40
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: [
            {
              categories: vm.xAxisarray
            }
          ],
          yAxis: [
            {
              gridLineWidth: 0,
              labels: {
                format: '{value}'
              },
              title: {
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
                text: '千人'
              }
            },
            {
              gridLineWidth: 0,
              labels: {
                format: '{value} %'
              },
              title: {
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
                text: '%'
              },
              opposite: true
            }
          ],
          series: []
        }
        for (let i = 0; i < opt.attrs.length; i++) {
          let unit = -1
          let ctype = ''
          if (!attrs.includes(opt.attrs[i])) continue
          if (
            opt.attrs[i] === '統計值' ||
            opt.attrs[i] === '較上期增減值(百分點)' ||
            opt.attrs[i] === '較上年同期增減值(百分點)'
          ) {
            unit = 0
            if (opt.chart === 'mixbar' || opt.chart === 'mixchart')
              ctype = 'column'
            else ctype = 'line'
          } else {
            unit = 1
            if (opt.chart === 'mixline' || opt.chart === 'mixchart')
              ctype = 'line'
            else ctype = 'column'
          }
          for (let k = 0; k < sexs.length; k++) {
            const ser = {}
            ser.name = sexs[k] + '-' + opt.attrs[i]
            ser.data = []
            ser.yAxis = unit
            ser.type = ctype
            const tardata = vm.base_data.filter(
              (n) => n.st.includes(opt.attrs[i]) && n.s === sexs[k]
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) ser.data.push(0)
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        this.baseChartOption = obj
      }
      if (!redraw) {
        this.base_drawset = false
        this.base_table = false
      }
    },
    setImageCount() {
      const vm = this
      axios.post(
        vm.RequetURL.majaxurl,
        qs.stringify({ op: 'SetChartCount', type: 'SEA' })
      )
    },
    setTableCount() {
      const vm = this
      axios.post(
        vm.RequetURL.majaxurl,
        qs.stringify({ op: 'SetTableCount', type: 'SEA' })
      )
    },
    downloadfile1(type) {
      this.setTableCount()
      this.downloadtable(type, 'table1', this.base_title)
    },
    downloadImage1(type) {
      this.setImageCount()
      this.$refs.chart1.chart.exportChart({ type })
    },
    downloadtable(type, tartable, name) {
      const vm = this
      vm.loader = true

      const form = new FormData()
      const tar = document.getElementById(tartable)
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
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
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
table.pvtTable thead tr:first-child th.pvtColLabel {
  background: #fcd76e;
  color: #000000;
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
</style>

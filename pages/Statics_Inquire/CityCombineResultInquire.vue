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
          <span class="breadtitle">地區:</span
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
      <div v-if="items.length === 0" class="tableitemfade">
        <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
      </div>
      <div v-for="(item, index) in items" :key="index" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="item.tshow ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="item.tshow"
                  @click="item.tshow = true"
                >
                  統計表
                </button>
                <div class="or"></div>
                <button
                  :class="item.tshow ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="!item.tshow"
                  @click="drawclick(item)"
                >
                  統計圖
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="item.tshow == false"
                class="showbtn"
                @click="item.drawSet = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                內容設定
              </button>
              <downloadbtn4
                v-if="item.tshow == true"
                :itemidx="index"
                @downloadclick2="downloadfile"
              ></downloadbtn4>
              <downloadbtn3
                v-if="item.tshow == false"
                :itemidx="index"
                @downloadclick="downloadImage"
              ></downloadbtn3>
            </v-col>
          </v-row>
          <v-row v-if="item.tshow === true">
            <v-col :id="'table' + index">
              <VuePivottable
                :items="item.data"
                :pkey="pkey"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="classes_sort"
                :city-sort="city_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="item.tshow === false">
            <v-col>
              <highcharts
                :ref="'chart' + index"
                :key="hkey"
                :options="item.chartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="item.tshow === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span>* 點擊圖例中項目可暫時關閉該項目</span>
                <br />
                <span>* 可用滑鼠拖曳產生區域放大搭配水平卷軸檢視</span>
              </div>
            </v-col>
          </v-row>
          <v-dialog
            v-model="item.drawSet"
            persistent
            scrollable
            retain-focus
            max-width="500"
          >
            <div
              ref="dialogContent"
              class="modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
            >
              <div
                class="dialogclose"
                tabindex="0"
                role="button"
                aria-label="關閉"
                @click="item.drawSet = false"
                @keyup.enter="item.drawSet = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>統計圖-內容設定</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="pkey"
                  :show="item.drawSet"
                  :classtype="1"
                  :statitems="editstat"
                  :vindex="index"
                  :hasstat="true"
                  :hascity="true"
                  @closeConditions="item.drawSet = false"
                  @drawthis="drawthis"
                ></drawset>
              </div>
            </div>
          </v-dialog>
        </v-container>
      </div>
      <!--表格轉置 START-->
      <v-dialog
        v-model="tabletrans"
        persistent
        scrollable
        retain-focus
        max-width="800"
      >
        <div
          ref="dialogContent"
          class="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
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
      <v-dialog
        v-model="tableedit"
        persistent
        scrollable
        retain-focus
        max-width="800"
      >
        <div
          ref="dialogContent"
          class="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
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
import VuePivottable from '~/components/table/City_Intranet'
import downloadbtn3 from '~/components/button/downloadbtn3'
import downloadbtn4 from '~/components/button/downloadbtn4'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
import drawset from '~/components/MoreInquire/DrawSet'
export default {
  components: {
    VuePivottable,
    downloadbtn3,
    downloadbtn4,
    drawset,
    crosscancel,
    editbtn
  },
  layout: 'BackStage',
  data() {
    return {
      loader: false,
      items: [],
      tablerows: ['d', 'ct'],
      tablecols: ['c', 's', 'st'],
      values: ['v'],
      sex_sort: ['總計', '男', '女'],
      statistics_sort: [
        { name: '統計值 (千人)', value: 1 },
        { name: '統計值 (%)', value: 2 },
        { name: '性別結構比 (%)', value: 3 },
        { name: '較上期增減值 (千人)', value: 4 },
        { name: '較上期增減值 (%)', value: 5 },
        { name: '較上期增減率 (%)', value: 6 },
        { name: '較上期增減值(百分點)', value: 7 },
        { name: '較上年同期增減值 (千人)', value: 8 },
        { name: '較上年同期增減值(百分點)', value: 9 },
        { name: '較上年同期增減率 (%)', value: 10 }
      ],
      classes_sort: [
        { name: '15歲以上民間人口', value: 1 },
        { name: '就業者', value: 2 },
        { name: '失業者', value: 3 },
        { name: '勞動力', value: 4 },
        { name: '非勞動力', value: 5 },
        { name: '失業率', value: 6 },
        { name: '勞動力參與率', value: 7 }
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
      datastat_sort: [
        { name: '統計值', value: 1 },
        { name: '結構比', value: 2 },
        { name: '較上期增減值', value: 3 },
        { name: '較上期增減率', value: 4 },
        { name: '較上年同期增減值', value: 5 },
        { name: '較上年同期增減率', value: 6 }
      ],
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
        },
        '性別結構比 (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '較上期增減率 (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '較上年同期增減率 (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        較上期增減百分點: {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        較上年同期增減百分點: {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        失業率: {
          digitsAfterDecimal: 1,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        勞動力參與率: {
          digitsAfterDecimal: 1,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        }
      },
      TableExplanOpen: false,
      statstring: '',
      classstring: '',
      sexstring: '',
      datastring: '',
      pkey: 0,
      hkey: 0,
      editstat: [],
      xAxisarray: [],
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
  watch: {
    tabletrans(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    tableedit(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    items: {
      handler(val) {
        if (val && val.length > 0 && val[0].drawSet) {
          this.$nextTick(() => {
            this.trapFocus()
          })
        }
      },
      deep: true
    }
  },
  mounted() {
    const vm = this
    const _post = {}

    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 6)

    _post.startyear = this.$route.query.startyear
    _post.endyear = this.$route.query.endyear
    _post.infotype = this.$route.query.infotype
    _post.classes = this.$route.query.classes
    _post.zone = this.$route.query.zone
    _post.sex = this.$route.query.sex
    _post.statistics = this.$route.query.statistics
    _post.op = 'GetRequestCombineTables'

    axios
      .post(vm.RequetURL.cityaxurl, qs.stringify(_post))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          vm.items = data

          const classstring = vm.getROCClases(vm.$route.query.classes)
          vm.statstring = classstring
          const zonestring = vm.getROCZone()
          vm.classstring = zonestring

          vm.sexstring = vm.$route.query.sex
            .replace('T', '總計')
            .replace('M', '男')
            .replace('F', '女')

          vm.datastring = vm.$route.query.statistics
            .replace('1', '統計值')
            .replace('2', '性別結構比')
            .replace('3', '較上期增減值')
            .replace('4', '較上年同期增減值')
            .replace('5', '較上期增減率')
            .replace('6', '較上年同期增減率')

          let dstr = vm.datastring.split(',')
          dstr = dstr.sort(vm.datastatsort)
          let edstr = ''
          for (let i = 0; i < dstr.length; i++) {
            if (i !== 0) edstr += ','
            edstr += dstr[i]
          }
          vm.datastring = edstr

          vm.editclasses = classstring.split(',')
          vm.editsex = vm.sexstring.split(',')
          vm.editstat = vm.datastring.split(',')

          vm.getdatearry()
          vm.needref = true
        }
      })
  },
  updated() {
    this.floatheaderfixed()
  },
  methods: {
    trapFocus() {
      let dialog = this.$refs.dialogContent
      if (!dialog) return
      if (dialog.length) dialog = dialog[0]

      const focusable = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      first.focus()

      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault()
              last.focus()
            }
          } else if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      })
    },
    research() {
      this.$router.push({
        path: '/Statics_Inquire/CityInquire'
      })
    },
    disheaderfloat() {
      const $table = $('.pvtTable')
      $table.floatThead('destroy')
    },
    floatheaderfixed() {
      setTimeout(function() {
        const targ = $('.floatThead-col')

        for (let i = 0; i < targ.length; i++) {
          $(targ[i]).attr('scope', 'col')
        }
      }, 100)
    },
    drawclick(item) {
      this.disheaderfloat()
      item.drawSet = true
      this.needref = true
    },
    getdatearry() {
      const startyear = parseInt(this.$route.query.startyear)
      const endyear = parseInt(this.$route.query.endyear)
      const infotype = parseInt(this.$route.query.infotype)

      const arry = []
      if (infotype === 1) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i + '年')
        }
      } else if (infotype === 2) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i + '年-上半年')
          arry.push(i + '年-下半年')
        }
      }
      this.xAxisarray = arry
    },
    getROCClases(str) {
      const s = str.split(',')
      let sc = ''
      for (let i = 0; i < s.length; i++) {
        if (i !== 0) sc += ','

        switch (s[i]) {
          case 'PEP':
            sc += '就業者'
            break
          case 'PUP':
            sc += '失業者'
            break
          case 'NLF':
            sc += '非勞動力'
            break
          case 'LAF':
            sc += '勞動力'
            break
          case 'FPS':
            sc += '15歲以上民間人口'
            break
          case 'LFP':
            sc += '勞動力參與率'
            break
          case 'UPR':
            sc += '失業率'
            break
        }
      }
      return sc
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
    getROCZone() {
      const data = this.items
      let sc = ''
      for (let i = 0; i < data.length; i++) {
        if (i !== 0) sc += ','
        sc += data[i].name
      }
      return sc
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
    citysort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.city_sort.length; i++) {
        if (this.city_sort[i].name === a) ia = i
        if (this.city_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    getROCRowType(type) {
      switch (type) {
        case 'd':
          return '統計期'
        case 'c':
          return '統計項'
        case 's':
          return '性別'
        case 'st':
          return '資料屬性'
        case 'ct':
          return '地區'
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
      const vm = this
      const items = vm.items

      this.disheaderfloat()

      this.editclasses = this.tecls
      this.editsex = this.tesex
      this.editstat = this.testa

      this.removeclasses = this.trcls
      this.removesex = this.trsex
      this.removestat = this.trsta

      const classes = this.removeclasses
      const sexes = this.removesex
      const stats = this.removestat

      for (let i = 0; i < items.length; i++) {
        if (!items[i].odata) items[i].odata = items[i].data
        else items[i].data = items[i].odata

        for (let j = 0; j < classes.length; j++) {
          items[i].data = items[i].data.filter((n) => n.c !== classes[j])
        }
        for (let j = 0; j < sexes.length; j++) {
          items[i].data = items[i].data.filter((n) => n.s !== sexes[j])
        }
        for (let j = 0; j < stats.length; j++) {
          items[i].data = items[i].data.filter(
            (n) => n.st.includes(stats[j]) === false
          )
        }
      }

      this.sex_sort = this.editsex

      const e = this.editstat
      const c = []
      let q = 1
      for (let n = 0; n < e.length; n++) {
        if (e[n] === '統計值') {
          const opt = {}
          opt.name = '統計值 (千人)'
          opt.value = q++
          c.push(opt)
          const opt2 = {}
          opt2.name = '統計值 (%) '
          opt2.value = q++
          c.push(opt2)
        } else if (e[n] === '性別結構比') {
          const opt = {}
          opt.name = '性別結構比 (%)'
          opt.value = q++
          c.push(opt)
        } else if (e[n] === '較上期增減值') {
          const opt = {}
          opt.name = '較上期增減值 (千人)'
          opt.value = q++
          c.push(opt)
          const opt2 = {}
          opt2.name = '較上期增減值 (%)'
          opt2.value = q++
          c.push(opt2)
        } else if (e[n] === '較上期增減率') {
          const opt = {}
          opt.name = '較上期增減率 (%)'
          opt.value = q++
          c.push(opt)
        } else if (e[n] === '較上年同期增減值') {
          const opt = {}
          opt.name = '較上年同期增減值 (千人)'
          opt.value = q++
          c.push(opt)
          const opt2 = {}
          opt2.name = '較上年同期增減值 (%)'
          opt2.value = q++
          c.push(opt2)
        } else if (e[n] === '較上年同期增減率') {
          const opt = {}
          opt.name = '較上年同期增減率 (%)'
          opt.value = q++
          c.push(opt)
        }
      }
      this.statistics_sort = c

      this.pkey = this.pkey + 1
      this.needref = true
      this.redraw()
    },
    statisticssort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.statistics_sort.length; i++) {
        if (a && a.includes(this.statistics_sort[i].name)) ia = i
        if (b && b.includes(this.statistics_sort[i].name)) ib = i
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
    datastatsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.datastat_sort.length; i++) {
        if (this.datastat_sort[i].name === a) ia = i
        if (this.datastat_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    getRocCity(zone) {
      switch (zone) {
        case '1':
          return '臺灣地區'
        case '2':
          return '北部區域'
        case '3':
          return '新北市'
        case '4':
          return '臺北市'
        case '6':
          return '基隆市'
        case '5':
          return '桃園市'
        case '7':
          return '新竹市'
        case '8':
          return '宜蘭縣'
        case '9':
          return '新竹縣'
        case '10':
          return '中部區域'
        case '11':
          return '臺中市'
        case '12':
          return '苗栗縣'
        case '13':
          return '彰化縣'
        case '14':
          return '南投縣'
        case '15':
          return '雲林縣'
        case '16':
          return '東部區域'
        case '17':
          return '臺東縣'
        case '18':
          return '花蓮縣'
        case '19':
          return '南部區域'
        case '20':
          return '臺南市'
        case '21':
          return '高雄市'
        case '22':
          return '嘉義市'
        case '23':
          return '嘉義縣'
        case '24':
          return '屏東縣'
        case '25':
          return '澎湖縣'
        default:
          return ''
      }
    },
    getcitysArray() {
      const a = []
      const zones = this.$route.query.zone.split(',')

      for (let i = 0; i < zones.length; i++) {
        a.push(this.getRocCity(zones[i].toString()))
      }

      return a
    },
    drawthis(opt, redraw) {
      if (!opt) return

      this.disheaderfloat()
      this.needref = true

      const vm = this
      const index = opt.index
      const target = this.items[index]
      this.items[index].obj = opt
      const sexs = this.editsex
      const citys = this.getcitysArray()

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
          exporting: {
            enabled: true
          },
          title: {
            text: ''
          },
          xAxis: {
            showEmpty: false,
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
          obj.yAxis.max = 100
        }
        if (opt.unit === '千人') {
          obj.yAxis.labels = {}
          obj.yAxis.labels.format = '{value}'
        }

        const clas = vm.editclasses
        for (let i = 0; i < clas.length; i++) {
          if (opt.chart === 'percentbar' && clas[i] !== opt.stat) continue
          for (let v = 0; v < citys.length; v++) {
            if (opt.chart === 'percentbar' && citys[v] !== opt.city) continue
            for (let k = 0; k < sexs.length; k++) {
              if (opt.chart === 'percentbar' && sexs[k] === '總計') continue
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].v === -999999) continue
                  else ser.data.push(tardata[j].v)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
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
          exporting: {
            enabled: true
          },
          title: {
            text: ''
          },
          xAxis: {
            showEmpty: false,
            categories: vm.xAxisarray
          },
          yAxis: {
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            },
            max: 100
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
        const clas = vm.editclasses
        for (let i = 0; i < clas.length; i++) {
          if (clas[i] !== opt.stat) continue
          for (let v = 0; v < citys.length; v++) {
            if (citys[v] !== opt.city) continue
            for (let k = 0; k < sexs.length; k++) {
              if (sexs[k] === '總計') continue
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].v === -999999) continue
                  else ser.data.push(tardata[j].v)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
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
          exporting: {
            enabled: true
          },
          title: {
            text: ''
          },
          xAxis: [
            {
              showEmpty: false,
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
        const sexs = vm.editsex
        const clas = vm.editclasses

        for (let i = 0; i < clas.length; i++) {
          for (let v = 0; v < citys.length; v++) {
            for (let k = 0; k < sexs.length; k++) {
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                let unit = -1
                let ctype = ''

                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].v === -999999) continue
                  else ser.data.push(tardata[j].v)
                }

                if (tardata.length > 0) {
                  const d = tardata[0]
                  if (d.st.includes('%') || d.st.includes('百分點')) {
                    unit = 1
                    if (opt.chart === 'mixline' || opt.chart === 'mixchart')
                      ctype = 'line'
                    else ctype = 'column'
                  } else {
                    unit = 0
                    if (opt.chart === 'mixbar' || opt.chart === 'mixchart')
                      ctype = 'column'
                    else ctype = 'line'
                  }
                }
                ser.yAxis = unit
                ser.type = ctype
                obj.series.push(ser)
              }
            }
          }
        }

        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
      } else if (
        opt.chart === 'sp_mixbar' ||
        opt.chart === 'sp_mixline' ||
        opt.chart === 'sp_mixchart'
      ) {
        const obj = {
          chart: {
            zoomType: 'xy',
            marginTop: 40
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: true
          },
          title: {
            text: ''
          },
          xAxis: [
            {
              showEmpty: false,
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
        const sexs = vm.editsex
        const clas = vm.editclasses

        for (let i = 0; i < clas.length; i++) {
          for (let v = 0; v < citys.length; v++) {
            for (let k = 0; k < sexs.length; k++) {
              for (let f = 0; f < opt.attrs.length; f++) {
                let unit = -1
                let ctype = ''
                if (
                  clas[i] === '15歲以上民間人口' ||
                  clas[i] === '就業者' ||
                  clas[i] === '失業者' ||
                  clas[i] === '勞動力' ||
                  clas[i] === '非勞動力'
                ) {
                  unit = 0
                  if (opt.chart === 'sp_mixbar' || opt.chart === 'sp_mixchart')
                    ctype = 'column'
                  else ctype = 'line'
                } else if (clas[i] === '失業率' || clas[i] === '勞動力參與率') {
                  unit = 1
                  if (opt.chart === 'sp_mixline' || opt.chart === 'sp_mixchart')
                    ctype = 'line'
                  else ctype = 'column'
                }
                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []
                ser.yAxis = unit
                ser.type = ctype

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].v === -999999) continue
                  else ser.data.push(tardata[j].v)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
      }
    },
    redraw() {
      const items = this.items
      for (let i = 0; i < items.length; i++) {
        this.drawthis(items[i].obj, true)
      }
    },
    getdrawdata(item, sex, attrs, classes, county) {
      let data = item.data
      let atstr = attrs
      if (attrs === '較上期增減值(百分點)') atstr = '較上期增減'
      else if (attrs === '較上年同期增減值(百分點)') atstr = '較上年同期增減'

      data = data.filter(
        (n) =>
          n.st.includes(atstr) &&
          n.s === sex &&
          n.c === classes &&
          n.ct === county
      )

      return data
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
    setCountyPadding() {
      const row = this.tablerows
      let i
      for (i = 0; i < row.length; i++) {
        if (row[i] === 'ct') break
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
            let th
            if (ths.length < row.length) th = ths[i - 1]
            else th = ths[i]

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
                th.className += ' clevel2'
              }
            }
          }
        }
      }
    },
    setTableCount() {
      const vm = this
      const searchtype = this.$route.query.classes
      axios.post(
        vm.RequetURL.cityaxurl,
        qs.stringify({ op: 'SetTableCount', classes: searchtype })
      )
    },
    setImageCount() {
      const vm = this
      const searchtype = this.$route.query.classes
      axios.post(
        vm.RequetURL.cityaxurl,
        qs.stringify({ op: 'SetChartCount', classes: searchtype })
      )
    },
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
    },
    downloadfile(opt) {
      const type = opt.type
      const idx = opt.idx
      const vm = this
      vm.loader = true
      const form = new FormData()

      const tar = document.getElementById('table' + idx)
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
        if (row[i] === 'ct') break
      }

      const target = JSON.stringify(otb)
      form.set('html', target)
      form.set('title', '合併縣市')
      form.set('type', type)
      form.set('countycol', vm.classstring)

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
    downloadImage(opt) {
      const type = opt.type
      const idx = opt.idx

      this.setImageCount()
      this.$refs['chart' + idx][0].chart.exportChart({ type })
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
.clevel0 {
  padding-left: 2px;
}
.clevel1 {
  padding-left: 18px;
}
.clevel2 {
  padding-left: 34px;
}
.tableitemfade {
  position: absolute;
  left: 0px;
  top: 280px;
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
.ui.large.buttons .button:focus {
  border: 1px solid #000000;
}
</style>
